import { GraphQLError } from "graphql";
import { Service } from "typedi";
import { Products } from "../models/products.model";
import { AppDataSource } from "../../boot/data-source";
import { In } from "typeorm";
import { Orders } from "../models/orders.modal";
import { Sales } from "../models/sales.modal";

@Service()
export class OrderService {

  calculateTax = (prices: number, tax: boolean) => {
    if (!tax) return prices
    return (prices + (prices * 0.12))
  }

  calculateTotalOrder = (products) => {
    let totalPrice = 0
    products.map((product) => {
      totalPrice += this.calculateTax(product.prices, product.tax)
      return product
    })
    return totalPrice
  }

  createOrder = async ({ productsId }, account) => {
    try {
      const productRepository = AppDataSource.getRepository(Products)
      const orderRepository = AppDataSource.getRepository(Orders)
      const saleRepository = AppDataSource.getRepository(Sales)

      const products = await productRepository.find({
        where: {
          id: In(productsId)
        }
      })

      if (!products && products.length ===0) {
        throw new GraphQLError(
          "Algo salió mal, valué a intentarlo."
        );
      }

      const total = this.calculateTotalOrder(products)

      const newOders = new Orders()
      newOders.total = total
      newOders.account = account

      const insertedOrder = await orderRepository.save(newOders)

      const newSales = []
      products.map((product) => {
        const sale = new Sales()
        sale.prices = this.calculateTax(product.prices, product.tax)
        sale.order = insertedOrder
        sale.product = product
        newSales.push(sale)
        return product
      })
      await saleRepository.save(newSales)
      return { success: true, message: '' }
    } catch (error) {
      throw new GraphQLError(
        "Error de conexión, vuelva a intentarlo."
      );
    }
  }
}