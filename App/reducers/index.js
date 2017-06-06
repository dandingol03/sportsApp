
import { combineReducers } from 'redux';

import tabReducer from './TabReducer';
import userReducer from './UserReducer';
import pageState from './PageStateReducer';
import mapReducer from './MapReducer';




export default rootReducer = combineReducers({
    tab:tabReducer,
    user:userReducer,
    page:pageState,
    map:mapReducer
})
