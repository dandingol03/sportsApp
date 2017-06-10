

import {
    ENABLE_GROUP_ONFRESH,
    DISABLE_GROUP_ONFRESH,
    SET_MY_GROUP_LIST,
} from '../constants/ActivityConstants';

const initialState = {
    myGroupList: null,
    allGroupList:null,
    groupOnFresh:true,
    activityOnFresh:false,
};

let activity = (state = initialState, action) => {

    switch (action.type) {

        case ENABLE_GROUP_ONFRESH:
            return Object.assign({}, state, {
                groupOnFresh:true
            })
        case DISABLE_GROUP_ONFRESH:
            return Object.assign({}, state, {
                groupOnFresh:false
            })
        case SET_MY_GROUP_LIST:
            return Object.assign({}, state, {
                myGroupList:action.myGroupList
            })

        default:
            return state;
    }
}

export default activity;

