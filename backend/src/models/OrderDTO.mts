import type { ProductDTO } from "./ProductDTO.mjs";

export type OrderDTO = {
  orderNumber: number;
  date: number;
  productsOrdered: [ProductDTO];
};
