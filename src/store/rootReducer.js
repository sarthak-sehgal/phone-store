import { combineReducers } from 'redux';

import ui from './reducers/ui';
import auth from './reducers/auth';
import cart from './reducers/cart';

export default combineReducers({
		ui,
		auth,
		cart
})