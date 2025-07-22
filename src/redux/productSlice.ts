import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface ProductState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  categories: { slug: string; name: string }[];
  selectedCategory: string;
  search: string;
  sort: string;
  page: number;
  hasMore: boolean;
}

const initialState: ProductState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
  categories: [],
  selectedCategory: 'all',
  search: '',
  sort: 'default',
  page: 0,
  hasMore: true,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<{ products: Product[]; total: number; hasMore: boolean; reset: boolean }>) {
      state.loading = false;
      state.error = null;
      state.total = action.payload.total;
      state.hasMore = action.payload.hasMore;
      if (action.payload.reset) {
        state.products = action.payload.products;
      } else {
        const ids = new Set(state.products.map(p => p.id));
        state.products = [...state.products, ...action.payload.products.filter(p => !ids.has(p.id))];
      }
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
      state.page = 0;
      state.hasMore = true;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 0;
      state.hasMore = true;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
      state.page = 0;
      state.hasMore = true;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCategories(state, action: PayloadAction<{ slug: string; name: string }[]>) {
      state.categories = action.payload;
    },
    clearProducts(state) {
      state.products = [];
      state.page = 0;
      state.hasMore = true;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setCategory,
  setSearch,
  setSort,
  setPage,
  setCategories,
  clearProducts,
} = productSlice.actions;
export default productSlice.reducer; 