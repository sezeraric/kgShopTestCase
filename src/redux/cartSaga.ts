import { call, put, select, takeLatest } from 'redux-saga/effects';
import { clearOutOfStock } from './cartSlice';
import cartService from '@/services/cartService';

function* checkCartStockSaga() {
  const items = yield select((s) => s.cart.items);
  const outOfStockIds = yield call(cartService.checkOutOfStock, items);
  if (outOfStockIds.length > 0) {
    yield put(clearOutOfStock(outOfStockIds));
  }
}

export default function* cartSaga() {
  yield takeLatest('cart/checkStock', checkCartStockSaga);
} 