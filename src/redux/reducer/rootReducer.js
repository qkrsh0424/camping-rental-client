import { combineReducers } from 'redux';
import userRedux from './userRedux';

const rootReducer = combineReducers({
    userRedux: userRedux
})

export default rootReducer;