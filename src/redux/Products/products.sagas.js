import { takeLatest, put, all, call } from "redux-saga/effects";
import { auth } from "../../firebase/utils";
import { handleAddProduct, handleFetchProducts } from "./products.helpers";
import { setProducts, fetchProductsStart } from "./products.actions";
import productsTypes from "./products.types";

export function* addProduct({ payload: { productCategory, productName, productThumbnail, productPrice } }) {
  try {
    const timestamp = new Date();

    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productAdminUID: auth.currentUser.uid,
      createdDate: timestamp,
    });

    yield put(fetchProductsStart());
  } catch (err) {
    console.error(err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts() {
  try {
    const products = yield handleFetchProducts();
    yield put(setProducts(products));
  } catch (err) {
    console.error(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export default function* productsSagas() {
  yield all([call(onAddProductStart), call(onFetchProductsStart)]);
}