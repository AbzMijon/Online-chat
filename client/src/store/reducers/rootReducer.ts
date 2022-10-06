import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { serverErrorReducer } from './serverErrorReducer';

const rootReducer = combineReducers({
	user: userReducer,
	server: serverErrorReducer,
});

export default rootReducer;