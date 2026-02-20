import type QueryString from "qs";
import type { ProductDTO } from "../models/ProductDTO.mjs";
import { ProductModel } from "../models/ProductSchema.mjs";
import type { Product } from "../models/Product.mjs";

export const getProductsWithQuery = async (
  search:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
  sort:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
) => {
  const productsFromDB = await ProductModel.find();
  let copiedList: ProductDTO[] = productsFromDB.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    } satisfies ProductDTO;
  });

  if (search) {
    copiedList = copiedList.filter((product) =>
      product.name.toLowerCase().startsWith(search as string),
    );
  }

  if (sort && (sort as string) === "asc") {
    copiedList.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
  } else if (sort && (sort as string) === "desc") {
    copiedList.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      return 0;
    });
  }

  return copiedList;
};

export const createProduct = async (
  name: string,
  price: number,
  description: string,
) => {
  const newProduct = {
    id: Date.now(),
    name,
    price,
    description,
  };

  const createdProduct = await ProductModel.create(newProduct);

  return createdProduct;
};

export const updateProduct = async (product: Product) => {
  await ProductModel.findOneAndUpdate(
    {
      id: product.id,
    },
    product,
  );

  return product;
};

export const deleteProduct = async (id: string) => {
  return await ProductModel.findOneAndDelete({ id: +id });
};
