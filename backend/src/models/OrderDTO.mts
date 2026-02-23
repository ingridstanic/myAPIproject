import type { ProductDTO } from "./ProductDTO.mjs";

export type OrderDTO = {
  fullName: string;
  orderNumber: number;
  date: number;
  productsOrdered: ProductDTO[];
};
