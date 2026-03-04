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
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const { title, price, description } = req.body;

    if (!title || !price) {
      res.status(400).json({ error: "Title and price are required" });
      return;
    }

    const newProduct = await createProduct(title, price, description || "");
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

productRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description } = req.body;

    const product = await getProductById(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const updatedProduct = await updateProduct({
      id: +id,
      title: title || product.title,
      price: price || product.price,
      description: description || product.description,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedProduct = await deleteProduct(id);
    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    
    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});
