import { STORE_USER, AUTH_ERROR, NEW_USER_AUTH } from '../actions/actionTypes';

const initialState = {
	user: null,
	isError: false,
	errorMsg: "",
	isNewUser: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER:
			return {
				...state,
				user: action.user
			}
		case AUTH_ERROR:
			return {
				...state,
				isError: action.isError,
				errorMsg: action.errorMsg
			}
		case NEW_USER_AUTH:
			return {
				...state,
				isNewUser: action.isNewUser
			}
    default:
      return state;
  }
};

export default reducer;
