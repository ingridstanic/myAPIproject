import type { ProductDTO } from "./ProductDTO.mjs";

export type Order = {
  name: string;
  orderNumber: number;
  date: Date;
  productsOrdered: { product: ProductDTO; quantity: number }[];
};
