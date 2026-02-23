import type { ProductDTO } from "./ProductDTO.mjs";

export class Order {
  fullName: string;
  orderNumber: number;
  date: number;
  productsOrdered: ProductDTO[];

  constructor(
    fullName: string,
    orderNumber: number,
    date: number,
    productsOrdered: ProductDTO[],
  ) {
    this.fullName = fullName;
    this.orderNumber = orderNumber;
    this.date = date;
    this.productsOrdered = productsOrdered;
  }
}
