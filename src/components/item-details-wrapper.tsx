// src/components/item-details-wrapper.tsx
import { useParams } from "react-router-dom";
import { ItemDetails } from "@/components/item-details";

export function ItemDetailsWrapper() {
  const { itemId } = useParams();
  return itemId ? <ItemDetails itemId={itemId} /> : null;
}
