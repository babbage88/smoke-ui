// components/item-details.tsx
import { useEffect, useState } from "react";
import { fetchItems, fetchItemTypes } from "@/lib/api_client";
import { Skeleton } from "@/components/ui/skeleton";

type Item = {
  name: string;
  display_name: string;
  sku: string;
  image_url: string;
  description: string;
  quantity_in_stock: number;
  item_type: string;
};

export function ItemDetails({ itemId }: { itemId: string }) {
  const [item, setItem] = useState<Item | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    fetchItems().then((data) => {
      const found = data.find((i: Item) => i.name === itemId || i.sku === itemId);
      setItem(found);
      if (found?.item_type) {
        fetch(found.item_type)
          .then((res) => res.json())
          .then((typeData) => {
            setPrice(typeData.unit_price);
          });
      }
    });
  }, [itemId]);

  if (!item) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-64" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img src={item.image_url} alt={item.display_name} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-2xl font-bold mt-4">{item.display_name}</h1>
      <p className="text-muted-foreground text-sm">SKU: {item.sku}</p>
      {price && <p className="text-lg font-semibold mt-2">${price}</p>}
      <p className="mt-4">{item.description}</p>
      <p className="text-sm text-muted-foreground mt-2">In Stock: {item.quantity_in_stock}</p>
    </div>
  );
}
