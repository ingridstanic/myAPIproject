import type { Product } from "../models/Product";

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
    const removeBtn = document.createElement("button");

    container.className = "container";
    title.innerHTML = product.title;
    description.innerHTML = product.description;
    price.innerHTML = product.price.toString() + " SEK";
    removeBtn.className = "RemoveBtn";
    removeBtn.innerHTML = "DELETE";

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(price);
    container.appendChild(removeBtn);

    productContainer?.appendChild(container);
  });
};
