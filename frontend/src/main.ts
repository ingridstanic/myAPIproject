import type { Product } from "./models/Product";
import {
  addProduct,
  getProducts,
  getProductsBySearch,
  getProductsSorted,
} from "./services/productService";
import "./style.css";
import { createHtml } from "./utils/createHTML";

const data = await getProducts();
createHtml(data);

document
  .getElementById("productForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputValue = (
      document.getElementById("inputText") as HTMLInputElement
    ).value;

    const data = await getProductsBySearch(inputValue);
    createHtml(data);
  });

document.getElementById("sortBtn")?.addEventListener("click", async () => {
  const data = await getProductsSorted();
  createHtml(data);
});

document.getElementById("addProduct")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = (document.getElementById("addTitle") as HTMLInputElement).value;
  const description = (
    document.getElementById("addDescription") as HTMLInputElement
  ).value;
  const price = (document.getElementById("addPrice") as HTMLInputElement).value;

  const newProduct: Product = {
    id: Date.now(),
    title,
    description,
    price: +price,
  };

  await addProduct(newProduct);
  const data = await getProducts();
  createHtml(data);

  (e.target as HTMLFormElement).reset();

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
});
