import { model, Schema } from "mongoose";
import { productSchema } from "./ProductSchema.mjs";

const OrderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  date: { type: Date, required: true },
  productsOrdered: [
    {
      product: [productSchema],
      quantity: { type: Number, required: true },
    },
  ],
});

export const OrderModel = model("order", OrderSchema);
