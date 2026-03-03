import express from "express";
import {
  addOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} from "../controllers/OrderController.mjs";
import type { Order } from "../models/Order.mjs";

export const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
  try {
    const { search, sort } = req.query;
    const products = await getOrders(search, sort);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error", error });
  }
});

orderRouter.post("/", async (req, res) => {
  try {
    const { order } = req.body;

    if (!order) {
      return res.status(400).json({ message: "order fault something" });
    }

    const newOrder = await addOrder(order);
    res.status(200).json({
      message:
        "Your order has been successfully placed and is now being processed.",
      newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error", error });
  }
});

orderRouter.patch("/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { order } = req.body;

    if (+orderNumber !== order.orderNumber) {
      return res.status(400).json({
        message: "Ordernumber in body does not match ordernumber in parameter",
      });
    }

    const success = await updateOrder(order);

    if (success) {
      res.status(200).json({ message: "Order updated", success });
    } else {
      res.status(404).json({ message: "Could not update order" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error", error });
  }
});

orderRouter.delete("/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const success = await deleteOrder(+orderNumber);

    if (success) {
      res.status(200).send("Order successfully deleted");
    } else {
      res.status(400).json({
        message: "Could not delete order with ordernumber: ",
        orderNumber,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error", error });
  }
});
