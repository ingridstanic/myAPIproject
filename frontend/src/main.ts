import { getProducts } from "./services/prodoctService";
import "./style.css";
import { createHtml } from "./utils/createHTML";

const data = await getProducts();

console.log(data);

createHtml(data);
