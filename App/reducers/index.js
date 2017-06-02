/**
 * Created by dingyiming on 2017/5/26.
 */
import { combineReducers } from 'redux';

import tabReducer from './TabReducer';
import userReducer from './UserReducer';

export default rootReducer = combineReducers({
    tab:tabReducer,
    user:userReducer
})
