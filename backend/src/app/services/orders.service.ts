import { GraphQLError } from "graphql";
import { Service } from "typedi";
import { Products } from "../models/products.model";
import { AppDataSource } from "../../boot/data-source";
import { In } from "typeorm";
import { Orders } from "../models/orders.modal";
import { Sales } from "../models/sales.modal";

@Service()
export class OrderService {

  calculateTax = (prices: number, tax: boolean, quantity: number) => {
    const priceTax = prices * quantity
    if (!tax) return priceTax 
    return (priceTax + (priceTax * 0.12))
  }

  calculateTotalOrder = (products, value) => {
    let totalPrice = 0
    products.map((product) => {
      const order = value.find((itm) => itm.productId === product.id)
      totalPrice += this.calculateTax(product.prices, product.tax, order?.quantity ?? 1)
      return product
    })
    return totalPrice
  }

  createOrder = async ({ order }, account) => {
    try {
      console.log("order", order)
      const value = JSON.parse(order)
      console.log(value)
      const productRepository = AppDataSource.getRepository(Products)
      const orderRepository = AppDataSource.getRepository(Orders)
      const saleRepository = AppDataSource.getRepository(Sales)

      const products = await productRepository.find({
        where: {
          id: In(value.map((ord: any) => ord.productId))
        }
      })

      if (!products && products.length ===0) {
        throw new GraphQLError(
          "Algo salió mal, valué a intentarlo."
        );
      }

      const total = this.calculateTotalOrder(products, value)

      const newOders = new Orders()
      newOders.total = total
      newOders.account = account

      const insertedOrder = await orderRepository.save(newOders)

      const newSales = []
      products.map((product) => {
        const order = value.find((itm) => itm.productId === product.id)
        const sale = new Sales()
        sale.quantity = order.quantity
        sale.prices = this.calculateTax(product.prices, product.tax, order.quantity)
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