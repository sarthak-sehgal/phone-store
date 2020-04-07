import { STORE_CART } from '../actions/actionTypes';

const initialState = {
	cart: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_CART:
			return {
				...state,
				cart: action.cart
			}
    default:
      return state;
  }
};

export default reducer;
