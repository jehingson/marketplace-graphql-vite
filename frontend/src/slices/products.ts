import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Product } from 'src/types/product';

interface Filter {
  inputValue: string;
  limit: number;
  offset: number;
}

interface Card {
  product: Product;
  quantity: number;
}

interface ProductsState {
  filterInventory: Filter;
  filterProductPublic: Filter;
  filterOrders: Filter;
  filterSales: Filter;
  card: Card[] | null;
  pymentModal: boolean;
  range: number[]
}

const initialState: ProductsState = {
  filterInventory: {
    inputValue: '',
    limit: 10,
    offset: 0,
  },
  filterProductPublic: {
    inputValue: '',
    limit: 12,
    offset: 0,
  },
  filterOrders: {
    inputValue: '',
    limit: 10,
    offset: 0,
  },
  filterSales: {
    inputValue: '',
    limit: 10,
    offset: 0,
  },
  card: null,
  pymentModal: false,
  range: [100, 3000]
};

const { reducer, actions } = createSlice({
  name: 'products_store',
  initialState,
  reducers: {
    resetStore: () => {
      return initialState;
    },
    setFilterInventory: (state: ProductsState, action: PayloadAction<Filter>) => {
      state.filterInventory = action.payload;
    },
    setFilterProductPublic: (state: ProductsState, action: PayloadAction<Filter>) => {
      state.filterProductPublic = action.payload;
    },
    setFilterOrder: (state: ProductsState, action: PayloadAction<Filter>) => {
      state.filterOrders = action.payload;
    },
    setFilterSales: (state: ProductsState, action: PayloadAction<Filter>) => {
      state.filterOrders = action.payload;
    },
    setAddCard: (state: ProductsState, action: PayloadAction<Card[] | null>) => {
      state.card = action.payload;
    },
    setPymentModal: (state: ProductsState, action: PayloadAction<boolean>) => {
      state.pymentModal = action.payload;
    },
    setRange: (state: ProductsState, action: PayloadAction<number[]>) => {
      state.range = action.payload;
    },
  },
});

export default reducer;

export const {
  setFilterInventory,
  setFilterProductPublic,
  setFilterOrder,
  setAddCard,
  setPymentModal,
  setRange
} = actions;
