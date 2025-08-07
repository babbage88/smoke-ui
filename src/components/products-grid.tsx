// src/components/product-grid.tsx
import { useEffect, useState } from "react";
import { fetchCategories, fetchItems, fetchItemTypes } from "@/lib/api_client";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Item = {
  name: string;
  display_name: string;
  sku: string;
  image_url: string;
  description: string;
  item_type: string;
  is_active: boolean;
};

type Category = {
  name: string;
  display_name: string;
};

type ItemType = {
  unit_price: string;
  category: string;
};

export function ProductGrid() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [itemTypes, setItemTypes] = useState<Record<string, ItemType>>({});

  useEffect(() => {
    fetchItems().then((data) => {
      const active = data.filter((item: Item) => item.is_active);
      setItems(active);
    });

    fetchCategories().then(setCategories);

    fetchItemTypes().then((types) => {
      const byUrl: Record<string, ItemType> = {};
      types.forEach((t: ItemType) => {
        byUrl[t.category] = t;
      });
      setItemTypes(byUrl);
    });
  }, []);

  if (!items || !categories) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories.map((cat) => {
        const catItems = items.filter((item) =>
          itemTypes[item.item_type]?.category.endsWith(`/categories/${cat.name}/`) ||
          itemTypes[item.item_type]?.category.includes(cat.name)
        );

        if (catItems.length === 0) return null;

        return (
          <div key={cat.name}>
            <h2 className="text-2xl font-bold mb-4">{cat.display_name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {catItems.map((item) => {
                const price = itemTypes[item.item_type]?.unit_price;
                return (
                  <Link key={item.name} to={`/item/${item.name}`}>
                    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-sm">{item.display_name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col gap-2">
                        <img
                          src={item.image_url}
                          alt={item.display_name}
                          className="w-full h-40 object-cover rounded"
                        />
                        <div className="text-sm font-semibold">${price || "?"}</div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
