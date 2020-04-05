import { combineReducers } from 'redux';

import ui from './reducers/ui';
import auth from './reducers/auth';

export default combineReducers({
		ui,
		auth
})