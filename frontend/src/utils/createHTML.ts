import type { Product } from "../models/Product";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";

let currentID = 0;
const form = document.getElementById("updateProduct");

export const createHtml = (products: Product[]) => {
  const productContainer = document.getElementById("productContainer");

  if (productContainer) {
    productContainer.innerHTML = "";
  }

  products.forEach((product) => {
    const container = document.createElement("div");
    const title = document.createElement("h1");
    const description = document.createElement("p");
    const price = document.createElement("strong");
    const id = document.createElement("p");
    const removeBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    container.className = "container";
    container.id = `id${product.id}`;
    title.innerHTML = product.title;
    description.innerHTML = product.description;
    price.innerHTML = product.price.toString() + " SEK";
    id.className = "idContainer";
    id.innerHTML = "id: " + product.id.toString();
    removeBtn.className = "removeBtn";
    removeBtn.innerHTML = "DELETE";
    editBtn.className = "editBtn";
    editBtn.innerHTML = "EDIT";

    removeBtn.addEventListener("click", async () => {
      const removed = await deleteProduct(product.id);

      if (removed) {
        const products = await getProducts();
        createHtml(products);
      } else {
        console.error("Could not delete product");
      }
    });

    editBtn.addEventListener("click", () => {
      currentID = product.id;

      window.scrollTo({ top: 0, behavior: "smooth" });

      (document.getElementById("title") as HTMLInputElement).value =
        product.title;
      (document.getElementById("description") as HTMLInputElement).value =
        product.description;
      (document.getElementById("price") as HTMLInputElement).value =
        product.price.toString();

      if (form) {
        form.style.visibility = "visible";
        container.style.visibility = "hidden";
        document.querySelectorAll(".editBtn").forEach((btn) => {
          (btn as HTMLButtonElement).disabled = true;
          btn.className = "edit-disabled";
        });
      }
    });

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(price);
    container.appendChild(id);
    container.appendChild(removeBtn);
    container.appendChild(editBtn);

    productContainer?.appendChild(container);
  });
};

document
  .getElementById("updateProduct")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;
    const price = (document.getElementById("price") as HTMLInputElement).value;

    const updatedProduct: Product = {
      id: currentID,
      title: title,
      description: description,
      price: +price,
    };

    await updateProduct(currentID, updatedProduct);
    const data = await getProducts();
    createHtml(data);

    currentID = 0;

    if (form) {
      form.style.visibility = "hidden";
    }
  });
