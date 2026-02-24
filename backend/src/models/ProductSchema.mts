import { model, Schema } from "mongoose";

export const productSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
});

export const ProductModel = model("product", productSchema);
