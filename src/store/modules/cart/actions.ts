import { ActionsTypes, IProduct } from "./types";

export function addProductToCartRequest(product: IProduct) {
  return {
    type: ActionsTypes.addProductToCartRequest,
    payload: {
      product,
    }
  };
}

export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionsTypes.addProductToCartSuccess,
    payload: {
      product,
    }
  };
}

export function addProductToCartFailure(productId: string) {
  return {
    type: ActionsTypes.addProductToCartFailure,
    payload: {
      productId,
    }
  };
}