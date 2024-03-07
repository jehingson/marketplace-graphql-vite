import { User } from "./user";

export interface Product {
  id: number,
  name: string;
  description: string;
  prices: number;
  image: string;
  quantity: number;
  sku: string;
  tax: boolean;
  createdAt: string
  account: User
}