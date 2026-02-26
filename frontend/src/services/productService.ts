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

export const getProductsBySearch = async (searchText: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/products/?search=${searchText}`,
    );
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch data", error);
    return [];
  }
};

export const getProductsSorted = async () => {
  try {
    const response = await fetch("http://localhost:3000/products/?sort=asc");
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
