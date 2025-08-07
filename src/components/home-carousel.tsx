// components/home-carousel.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchItems } from "@/lib/api_client";

export function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchItems().then((data) => {
      const filtered = data.filter((item: any) => item.image_url && item.is_active);
      setItems(filtered.slice(0, 5));
    });
  }, []);

  if (items.length === 0) return null;

  const prev = () => setIndex((index - 1 + items.length) % items.length);
  const next = () => setIndex((index + 1) % items.length);

  const current = items[index];

  return (
    <div className="relative max-w-3xl mx-auto overflow-hidden rounded-xl shadow-lg">
      <img src={current.image_url} alt={current.display_name} className="w-full h-64 object-cover" />
      <div className="absolute bottom-0 left-0 bg-black/60 text-white p-2 w-full text-center">
        {current.display_name}
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
        <Button variant="ghost" size="icon" onClick={prev}>
          <ChevronLeft />
        </Button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
        <Button variant="ghost" size="icon" onClick={next}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
