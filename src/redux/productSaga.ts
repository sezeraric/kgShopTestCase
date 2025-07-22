import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setCategories,
} from './productSlice';
import productService from '@/services/productService';

function* fetchProductsSaga() {
  try {
    const state = yield select((s) => s.product);
    const { search, selectedCategory, sort, page } = state;
    const res = yield call(productService.fetchProducts, { search, selectedCategory, sort, page });
    yield put(
      fetchProductsSuccess({
        products: res.products,
        total: res.total,
        hasMore: res.hasMore,
        reset: page === 0,
      })
    );
  } catch (e: any) {
    yield put(fetchProductsFailure(e.message || 'Ürünler yüklenemedi.'));
  }
}

function* fetchCategoriesSaga() {
  try {
    const categories = yield call(productService.fetchCategories);
    yield put(setCategories(categories));
  } catch {}
}

function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
  yield takeLatest('product/fetchCategoriesRequest', fetchCategoriesSaga);
}

export default productSaga; 