import { Service } from 'typedi';
import { GraphQLError } from 'graphql';
import { AppDataSource } from "../../boot/data-source";
import { Products } from '../models/products.model';

@Service()
export class PublicService {
  products = async ({ limit, offset, inputValue, range }) => {
    console.log("prices", range)
    try {
      const resposity = AppDataSource.getRepository(Products);
        const result = await resposity
          .createQueryBuilder("products")
          .leftJoinAndSelect("products.account", "account")
          .where(
            `(products.name LIKE :name OR products.sku LIKE :sku) AND products.prices BETWEEN :minPrice AND :maxPrice`,
            {
              name: `%${inputValue}%`,
              sku: `%${inputValue}%`,
              minPrice: `${range[0]}`,
              maxPrice: `${range[1]}`
            }
          )
          .skip(offset * limit)
          .take(limit)
          .orderBy("products.createdAt", "ASC")
          .getManyAndCount();
      

      return {
        result: result[0],
        amount: result[1],
      };
    } catch (error) {
      console.log("errors", error);
      throw new GraphQLError("Error de conexión, vuelva a intentarlo.");
    }
  }
}