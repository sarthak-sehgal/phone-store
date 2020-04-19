import { STORE_CART } from "./actionTypes";
import { cartStartLoading, cartStopLoading } from "./index";
import db from "../../serverConfig";

export const addToCart = (uuid, quantity) => {
  return (dispatch, getState) => {
    // TO DO: Add check here for whether UUID exists
		console.log("inside addToCart", uuid, quantity);
		if (!Number.isInteger(quantity) || quantity<=0 || !uuid)
			return;

		const cart = getState().cart.cart || {};
		cart[uuid] = quantity;
		dispatch(storeCart(cart));
		dispatch(saveCart(cart));
  };
};


export const removeFromCart = (uuid) => {
	return (dispatch, getState) => {
		// TO DO: Add check here for whether UUID exists

		console.log("Deleting item with uuid", uuid);
		let cart = getState().cart.cart || {};
		delete cart[uuid];
		dispatch(storeCart(cart));
		dispatch(saveCart(cart));
	}
}

export const saveCart = (cart, userObj) => {
	console.log("Inside saveCart");
	return (dispatch, getState) => {
		dispatch(cartStartLoading());
		let user = getState().auth.user || userObj;
		if (!cart)
			return;

		console.log("Storing cart in local storage");
		localStorage.setItem("ps-cart", JSON.stringify(cart));

		if (user) {
			if (!user.uid) {
				console.log("Error! User's UID not found!");
				dispatch(cartStopLoading());
				return;
			}
			const userRef = db.collection("users").doc(user.uid);
			if (!userRef) {
				console.log("Error! User not found in database.");
				dispatch(cartStopLoading());
				return;
			}
			userRef.update({
				"cart": JSON.stringify(cart)
			})
			.then(res => console.log("User cart updated successfully in database."))
			.catch(err => console.log("Could not update user cart on db.", err))
			.finally(() => dispatch(cartStopLoading()))
		} else {
			dispatch(cartStopLoading());
		}
	}
}

export const getCartFromLocalStorage = () => {
	console.log("Getting cart from local storage");
	return dispatch => {
		let cart = localStorage.getItem("ps-cart");
		// TO DO: Check here for uuid existence
		if (cart && cart !== "{}") {
			cart = JSON.parse(cart);
			dispatch(storeCart(cart));
		}
	}
}

export const storeCart = (cart) => {
  return {
    type: STORE_CART,
    cart,
  };
};
