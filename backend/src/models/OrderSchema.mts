import { model, Schema } from "mongoose";
import { productSchema } from "./ProductSchema.mjs";

const OrderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  orderNumber: { type: Number, required: true, unique: true },
  date: { type: Date, required: true },
  productsOrdered: [
    {
      product: { type: productSchema, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export const OrderModel = model("order", OrderSchema);
