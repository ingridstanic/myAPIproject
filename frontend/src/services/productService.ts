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

export const getproductById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch data", error);
  }
};

export const addProduct = async (product: Product) => {
  try {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      body: JSON.stringify({ product }),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not create product", error);
    return false;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateProduct = async (id: number, product: Product) => {
  const response = await fetch(`http://localhost:3000/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ product }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response) {
    return response.ok;
  } else {
    return false;
  }
};
