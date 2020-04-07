import { PAGE_START_LOADING, PAGE_STOP_LOADING, AUTH_START_LOADING, AUTH_STOP_LOADING, CART_START_LOADING, CART_STOP_LOADING, TOGGLE_TOAST } from "../actions/actionTypes";

const initialState = {
  pageLoading: false,
	authLoading: false,
	cartLoading: false,
	toastBody: "",
	toastShow: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_START_LOADING:
      return {
        ...state,
        pageLoading: true,
      };
    case PAGE_STOP_LOADING:
      return {
        ...state,
        pageLoading: false,
      };
    case AUTH_START_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    case AUTH_STOP_LOADING:
      return {
        ...state,
        authLoading: false,
			};
		case CART_START_LOADING:
			return {
				...state,
				cartLoading: true
			}
		case CART_STOP_LOADING:
			return {
				...state,
				cartLoading: false
			}
		case TOGGLE_TOAST:
			if (action.show)
				return {
					...state,
					toastShow: 1,
					toastBody: action.body
				}
			else
				return {
					...state,
					toastShow: 0
				}
    default:
      return state;
  }
};

export default reducer;
