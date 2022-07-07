import { combineReducers } from 'redux';
import userRedux from './userRedux';
import cartListLocalStorage from './cartListLocalStorage';

const rootReducer = combineReducers({
    userRedux: userRedux,
    cartListLocalStorage: cartListLocalStorage
})

export default rootReducer;