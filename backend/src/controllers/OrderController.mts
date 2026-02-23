import type { Order } from "../models/Order.mjs";
import type { OrderDTO } from "../models/OrderDTO.mjs";
import { OrderModel } from "../models/OrderSchema.mjs";
import type { ProductDTO } from "../models/ProductDTO.mjs";
import type QueryString from "qs";

export const getOrders = async (
  search:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
  sort:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
) => {
  const ordersFromDB = await OrderModel.find();
  let copiedList: OrderDTO[] = ordersFromDB.map((order) => {
    return {
      fullName: order.fullName,
      orderNumber: order.orderNumber,
      date: order.date,
      productsOrdered: order.productsOrdered.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        } satisfies ProductDTO;
      }),
    } satisfies OrderDTO;
  });

  if (search) {
    copiedList = copiedList.filter((product) => {
      product.orderNumber.toString().startsWith(search as string);
    });
  }

  if (sort && sort === "asc") {
    copiedList.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
  }

  return copiedList;
};

export const addOrder = async (order: Order) => {};

export const updateOrder = async (order: Order) => {};

export const deleteOrder = async (orderNumber: string) => {};
