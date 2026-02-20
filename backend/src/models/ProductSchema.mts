import { Schema } from "mongoose";

export const productSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
});
