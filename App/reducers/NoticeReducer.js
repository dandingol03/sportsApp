/**
 * Created by dingyiming on 2017/8/16.
 */

import {
    SET_NOTICE_LIST,
    DISABLE_NOTICE_ONFRESH,
    ENABLE_NOTICE_ONFRESH,
    SET_NOTICE_MEMBER_LIST,
    ENABLE_NOTICE_MEMBER_ONFRESH,
    DISABLE_NOTICE_MEMBER_ONFRESH
} from '../constants/NoticeConstants';

const initialState = {
    noticeList:null,
    noticeMemberList:null,
    noticeFresh:true,
    noticeMemberFresh:true
};

let notice = (state = initialState, action) => {

    switch (action.type) {

        case  SET_NOTICE_LIST:
            return Object.assign({}, state, {
                noticeList:action.noticeList
            })
        case DISABLE_NOTICE_ONFRESH:
            return Object.assign({}, state, {
                noticeFresh:false
            })

        case ENABLE_NOTICE_ONFRESH:
            return Object.assign({}, state, {
                noticeFresh:true
            })

        case  SET_NOTICE_MEMBER_LIST:
            return Object.assign({}, state, {
                noticeMemberList:action.noticeList
            })
        case DISABLE_NOTICE_MEMBER_ONFRESH:
            return Object.assign({}, state, {
                noticeMemberFresh:false
            })

        case ENABLE_NOTICE_MEMBER_ONFRESH:
            return Object.assign({}, state, {
                noticeMemberFresh:true
            })

        default:
            return state;
    }
}

export default notice;

