/**
 * Created by dingyiming on 2017/5/21.
 */

import {
    UPDATE_ROOT_TAB
} from '../constants/TabConstants';

export let updateRootTab=(payload)=>{
    return {
        type:UPDATE_ROOT_TAB,
        payload:payload
    }
}