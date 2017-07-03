/**
 * Created by dingyiming on 2017/5/21.
 */

import {
    UPDATE_ROOT_TAB,
    MAKE_TABS_HIDDEN,
    MAKE_TABS_SHOWN
} from '../constants/TabConstants';

export let updateRootTab=(payload)=>{
    return {
        type:UPDATE_ROOT_TAB,
        payload:payload
    }
}

//设置navigator高度为0
export let makeTabsHidden=()=>{
    return {
        type:MAKE_TABS_HIDDEN,
        payload:{}
    }
}

//设置navigator高度显示
export let makeTabsShown=()=>{
    return {
        type:MAKE_TABS_SHOWN,
        payload:{}
    }
}
