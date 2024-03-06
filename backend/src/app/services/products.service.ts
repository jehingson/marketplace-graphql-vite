import { Service } from "typedi";
import { AppDataSource } from "../../boot/data-source";
import { Products } from "../models/products.model";
import { GraphQLError } from "graphql";

@Service()
export class ProductsService {
  inventories = async ({ inputValue, limit, offset }, accout) => {
    try {
      const resposity = AppDataSource.getRepository(Products);
      const result = await resposity
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.account", "account")
        .where(`(products.name LIKE :name OR products.sku LIKE :sku)`, {
          name: `%${inputValue}%`,
          sku: `%${inputValue}%`,
        })
        .skip(offset * limit)
        .take(limit)
        .orderBy("products.createdAt", "ASC")
        .getManyAndCount();

      return {
        result: result[0],
        amount: result[1],
      };
    } catch (error) {
      console.log('errors', error)
      throw new GraphQLError("Error de conexión, vuelva a intentarlo.");
    }
  };

  createProduct = async (
    { name, description, prices, image, sku, quantity, tax },
    account
  ) => {
    try {
      const productRepository = AppDataSource.getRepository(Products);
      const newProducts = new Products();
      newProducts.name = name;
      newProducts.description = description;
      newProducts.sku = sku;
      newProducts.quantity = quantity;
      newProducts.prices = prices;
      newProducts.image = image;
      newProducts.tax = tax;
      newProducts.account = account.id;
      await productRepository.save(newProducts);
      return { success: true, message: "" };
    } catch (error) {
      console.log("error", error);
      throw new GraphQLError("Error de conexión, vuelva a intentarlo.");
    }
  };
}
