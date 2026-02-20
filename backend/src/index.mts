import { config } from "dotenv";
import express, { json } from "express";
import mongoose, { Error } from "mongoose";
import cors from "cors";
import { productRouter } from "./routes/productRouter.mjs";

const app = express();

config();

const mongoURI = process.env.MONGO_URI || "";
const port = process.env.PORT || 3000;

if (mongoURI === "") {
  throw new Error("mongo URI not valid or missing in .env file.");
}

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(json());

app.use("/products", productRouter);

app.listen(port, async (error) => {
  try {
    if (error) {
      console.error(error);
    }

    await mongoose.connect(mongoURI);
    console.log(
      `API is up and running on port: ${port}, connected to the database.`,
    );
  } catch (error) {
    console.error(error);
  }
});
