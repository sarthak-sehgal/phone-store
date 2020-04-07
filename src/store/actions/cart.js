import { STORE_CART } from "./actionTypes";

export const addToCart = (uuid, quantity) => {
  return (dispatch, getState) => {
    // TO DO: Add check here for whether UUID exists
		console.log("inside addToCart", uuid, quantity);
		if (!Number.isInteger(quantity) || quantity<=0)
			return;

		const cart = getState().cart.cart || {};
		cart[uuid] = quantity;
		dispatch(storeCart(cart));
  };
};


export const removeFromCart = (uuid) => {
	return (dispatch, getState) => {
		// TO DO: Add check here for whether UUID exists

		const cart = getState().cart.cart || {};
		delete cart[uuid];
		dispatch(storeCart(cart));
	}
}

export const storeCart = (cart) => {
  return {
    type: STORE_CART,
    cart,
  };
};
