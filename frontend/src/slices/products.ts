import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface ProductsState {
  value: string;
}

const initialState: ProductsState = {
  value: "",
};

const { reducer, actions } = createSlice({
  name: "products_store",
  initialState,
  reducers: {
    resetStore: () => {
      return initialState;
    },
    setValue: (state: ProductsState, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export default reducer;

export const { setValue } = actions;
