import { model, Schema } from "mongoose";
import { productSchema } from "./ProductSchema.mjs";

const OrderSchema = new Schema({
  orderNumber: { type: Number, required: true },
  date: { type: Number, required: true },
  productsOrdered: [productSchema],
});

export const OrderModel = model("order", OrderSchema);
