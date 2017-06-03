
import { combineReducers } from 'redux';

import tabReducer from './TabReducer';
import userReducer from './UserReducer';
import pageState from './PageStateReducer';

export default rootReducer = combineReducers({
    tab:tabReducer,
    user:userReducer,
    page:pageState,
})
