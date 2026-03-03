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
      name: order.name,
      date: order.date,
      productsOrdered: order.productsOrdered.map((items) => {
        return {
          product: {
            id: items.product.id,
            title: items.product.title,
            description: items.product.description || "No Content",
            price: items.product.price,
          } satisfies ProductDTO,
          quantity: items.quantity,
        };
      }),
    } satisfies OrderDTO;
  });

  if (search) {
    copiedList = copiedList.filter((product) =>
      product.name.toLowerCase().includes(search as string),
    );
  }

  if (sort && sort === "asc") {
    copiedList.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
  } else if (sort && sort === "desc") {
    copiedList.sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
  }

  return copiedList;
};

export const addOrder = async (order: Order) => {
  const newOrder = {
    name: order.name,
    date: Date.now(),
    productsOrdered: order.productsOrdered,
  };

  return await OrderModel.create(newOrder);
};

export const updateOrder = async (order: Order) => {
  try {
    // Use findByIdAndUpdate to find the order by ID and update it
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      {
        name: order.name,
        date: order.date,
        productsOrdered: order.productsOrdered,
      },
      order,
    );

    // Return the updated order, or null if order was not found
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
};

export const deleteOrder = async (orderNumber: string) => {
  try {
    // Use findByIdAndDelete to find and remove the order by ID
    const deletedOrder = await OrderModel.findByIdAndDelete(orderNumber);

    // Return true if order was found and deleted, false otherwise
    return deletedOrder !== null;
  } catch (error) {
    console.error("Error deleting order:", error);
    return false;
  }
};
