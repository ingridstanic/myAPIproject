import { model, Schema } from "mongoose";

const productSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
});

export const ProductModel = model("product", productSchema);
