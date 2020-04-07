import { PAGE_START_LOADING, PAGE_STOP_LOADING, AUTH_START_LOADING, AUTH_STOP_LOADING, TOGGLE_TOAST } from './actionTypes';

export const pageStartLoading = () => {
    return {
        type: PAGE_START_LOADING
    }
}

export const pageStopLoading = () => {
    return {
        type: PAGE_STOP_LOADING
    }
}

export const authStartLoading = () => {
	return {
			type: AUTH_START_LOADING
	}
}

export const authStopLoading = () => {
	return {
			type: AUTH_STOP_LOADING
	}
}

export const toggleToast = (show, body) => {
	return dispatch => {
		if (show) {
			setTimeout(() => {
				dispatch(toggleToastInStore(false));
			}, 4000);
		}
		dispatch(toggleToastInStore(show, body));
	}
}

export const toggleToastInStore = (show, body) => {
	return {
		type: TOGGLE_TOAST,
		show,
		body
	}
}