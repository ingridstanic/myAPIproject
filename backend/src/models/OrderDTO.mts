import type { ProductDTO } from "./ProductDTO.mjs";

export type OrderDTO = {
  name: string;
  date: Date;
  productsOrdered: { product: ProductDTO; quantity: number }[];
};
