

import {
    ENABLE_MY_GROUP_ONFRESH,
    DISABLE_MY_GROUP_ONFRESH,
    ENABLE_ALL_GROUP_ONFRESH,
    DISABLE_ALL_GROUP_ONFRESH,
    SET_MY_GROUP_LIST,
    SET_ALL_GROUP_LIST,
} from '../constants/ActivityConstants';

const initialState = {
    myGroupList: null,
    allGroupList:null,
    myGroupOnFresh:true,
    allGroupOnFresh:true,
    activityOnFresh:false,
};

let activity = (state = initialState, action) => {

    switch (action.type) {

        case ENABLE_MY_GROUP_ONFRESH:
            return Object.assign({}, state, {
                myGroupOnFresh:true
            })
        case DISABLE_MY_GROUP_ONFRESH:
            return Object.assign({}, state, {
                myGroupOnFresh:false
            })
        case ENABLE_ALL_GROUP_ONFRESH:
            return Object.assign({}, state, {
                allGroupOnFresh:true
            })
        case DISABLE_ALL_GROUP_ONFRESH:
            return Object.assign({}, state, {
                allGroupOnFresh:false
            })
        case SET_MY_GROUP_LIST:
            return Object.assign({}, state, {
                myGroupList:action.myGroupList
            })
        case SET_ALL_GROUP_LIST:
            return Object.assign({}, state, {
                allGroupList:action.allGroupList
            })

        default:
            return state;
    }
}

export default activity;

