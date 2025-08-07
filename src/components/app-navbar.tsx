// components/app-navbar.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { fetchCategories } from "@/lib/api_client";

export function AppNavbar() {
  const [categories, setCategories] = useState<
    { name: string; display_name: string }[] | null
  >(null);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="text-xl font-bold">
        <Link to="/" className="text-xl font-bold">
          Smoke & Vape Shop
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">Products</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories
              ? categories.map((category) => (
                  <DropdownMenuItem key={category.name}>
                    {category.display_name}
                  </DropdownMenuItem>
                ))
              : [...Array(3)].map((_, i) => (
                  <DropdownMenuItem key={i}>
                    <Skeleton className="w-32 h-4" />
                  </DropdownMenuItem>
                ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-2 mt-4">
              <h2 className="text-lg font-semibold">Products</h2>
              {categories
                ? categories.map((category) => (
                    <Button
                      key={category.name}
                      variant="ghost"
                      className="justify-start"
                    >
                      {category.display_name}
                    </Button>
                  ))
                : [...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-36 rounded" />
                  ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
