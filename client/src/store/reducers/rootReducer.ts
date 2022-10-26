import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { serverErrorReducer } from './serverErrorReducer';
import { themeReducer } from './themeReducer';

const rootReducer = combineReducers({
	user: userReducer,
	server: serverErrorReducer,
	theme: themeReducer,
});

export default rootReducer;