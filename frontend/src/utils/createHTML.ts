import type { Product } from "../models/Product";
import { deleteProduct, getProducts } from "../services/productService";

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

    container.className = "container";
    title.innerHTML = product.title;
    description.innerHTML = product.description;
    price.innerHTML = product.price.toString() + " SEK";
    id.className = "idContainer";
    id.innerHTML = "id: " + product.id.toString();
    removeBtn.className = "removeBtn";
    removeBtn.innerHTML = "DELETE";

    removeBtn.addEventListener("click", async () => {
      const removed = await deleteProduct(product.id);

      if (removed) {
        const products = await getProducts();
        createHtml(products);
      } else {
        console.error("Could not delete product");
      }
    });

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(price);
    container.appendChild(id);
    container.appendChild(removeBtn);

    productContainer?.appendChild(container);
  });
};
