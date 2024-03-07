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
  card: Card[] | null;
  pymentModal: boolean;
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
  card: null,
  pymentModal: false,
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
    setAddCard: (state: ProductsState, action: PayloadAction<Card[]>) => {
      state.card = action.payload;
    },
    setPymentModal: (state: ProductsState, action: PayloadAction<boolean>) => {
      state.pymentModal = action.payload;
    },
  },
});

export default reducer;

export const { setFilterInventory, setFilterProductPublic, setAddCard, setPymentModal } = actions;
