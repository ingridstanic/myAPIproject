import type { ProductDTO } from "./ProductDTO.mjs";

export type Order = {
  name: string;
  date: number;
  productsOrdered: { product: ProductDTO; quantity: number }[];
};
