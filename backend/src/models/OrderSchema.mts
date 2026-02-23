import { model, Schema } from "mongoose";
import { productSchema } from "./ProductSchema.mjs";

const OrderSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  orderNumber: { type: Number, required: true },
  date: { type: Number, required: true },
  productsOrdered: [productSchema],
});

export const OrderModel = model("order", OrderSchema);
