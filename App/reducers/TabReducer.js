/**
 * Created by dingyiming on 2017/5/21.
 */

import {
    UPDATE_ROOT_TAB,
    MAKE_TABS_HIDDEN,
    MAKE_TABS_SHOWN
} from '../constants/TabConstants';

const initialState = {
    rootTab:'首页',
    hidden:false
};

let car = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_ROOT_TAB:
            var {tab}=action.payload;
            return Object.assign({}, state, {
                rootTab:tab
            })
            break;
        case MAKE_TABS_HIDDEN:
            return Object.assign({},state,{
                hidden:true
            })
            break;
        case MAKE_TABS_SHOWN:
            return Object.assign({},state,{
                hidden:false
            })
            break;
        default:
            return state;
    }
}

export default car;
