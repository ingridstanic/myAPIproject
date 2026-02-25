import type { Product } from "../models/Product";

export const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch data from API", error);
    return [];
  }
};
