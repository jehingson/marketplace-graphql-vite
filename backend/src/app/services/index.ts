import { AccountService } from "./accounts.service";
import { AppService } from "./app.service";
import { ProductsService } from "./products.service";

export const accountService = new AccountService();
export const appService = new AppService()
export const productService = new ProductsService()