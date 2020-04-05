import { PAGE_START_LOADING, PAGE_STOP_LOADING, AUTH_START_LOADING, AUTH_STOP_LOADING } from "../actions/actionTypes";

const initialState = {
  pageLoading: false,
  authLoading: false,
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
    default:
      return state;
  }
};

export default reducer;
