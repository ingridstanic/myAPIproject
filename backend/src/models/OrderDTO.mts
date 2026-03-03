import type { ProductDTO } from "./ProductDTO.mjs";

export type OrderDTO = {
  name: string;
  orderNumber: number;
  date: Date;
  productsOrdered: { product: ProductDTO; quantity: number }[];
};
