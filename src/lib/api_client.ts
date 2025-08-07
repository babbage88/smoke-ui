// src/lib/api.ts
export async function fetchItems() {
  const res = await fetch("http://localhost:8000/api/items/?format=json");
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch("http://localhost:8000/api/categories/?format=json");
  return res.json();
}

export async function fetchItemTypes() {
  const res = await fetch("http://localhost:8000/api/item-types/?format=json");
  return res.json();
}
