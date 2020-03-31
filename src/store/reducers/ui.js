import { PAGE_START_LOADING, PAGE_STOP_LOADING } from '../actions/actionTypes';

const initialState = {
    pageLoading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGE_START_LOADING:
            return {
                ...state,
                pageLoading: true
            }
        case PAGE_STOP_LOADING:
            return {
                ...state,
                pageLoading: false
            }
        default:
            return state
    }
}

export default reducer;