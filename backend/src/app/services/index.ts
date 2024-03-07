import { AccountService } from "./accounts.service";
import { AppService } from "./app.service";
import { ProductsService } from "./products.service";
import { PublicService } from "./public.service";

export const accountService = new AccountService();
export const appService = new AppService()
export const productService = new ProductsService()
export const publicService = new PublicService()