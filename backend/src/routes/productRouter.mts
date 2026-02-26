import express from "express";
import type { ProductDTO } from "../models/ProductDTO.mjs";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductsWithQuery,
  updateProduct,
} from "../controllers/productController.mjs";

export const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const { search, sort } = req.query;

    const products = await getProductsWithQuery(search, sort);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error", error });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal erro", error });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const { title, price, description } = req.body;

    if (title === "" || price === "") {
      return res
        .status(400)
        .json({ message: "Name, price or both in body is empty" });
    }
    const descriptionToSave = description || "No description";

    const newProduct = await createProduct(title, price, descriptionToSave);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error", error });
  }
});

productRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = req.body;

    if (+id !== product.id) {
      return res
        .status(400)
        .json({ message: "id in body does not match id in parameter" });
    }
    const success = await updateProduct(product);

    if (success) {
      res.status(200).json({ message: "Product updated", success });
    } else {
      res.status(404).json({ message: "Could not update product" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error", error });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const success = await deleteProduct(id);

    if (success) {
      res.status(200).send("Product succesfully deleted");
    } else {
      res
        .status(400)
        .json({ message: "Could not delete product with id: ", id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error", error });
  }
});
