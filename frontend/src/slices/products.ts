import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface Filter {
  inputValue: string;
  limit: number;
  offset: number;
}

interface ProductsState {
  value: string;
  filterInventory: Filter
}

const initialState: ProductsState = {
  value: "",
  filterInventory: {
    inputValue: '',
    limit: 10,
    offset: 0
  }
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
    setFilterInventory: (state: ProductsState, action: PayloadAction<Filter>) => {
      state.filterInventory = action.payload
    }
  },
});

export default reducer;

export const { setValue, setFilterInventory } = actions;
