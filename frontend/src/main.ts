import {
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
