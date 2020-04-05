import { PAGE_START_LOADING, PAGE_STOP_LOADING, AUTH_START_LOADING, AUTH_STOP_LOADING } from './actionTypes';

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