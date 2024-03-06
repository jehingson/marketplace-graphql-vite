import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "../slices/products";

const rootReducer = combineReducers({
  product_state: productsReducer,
});

export default rootReducer

