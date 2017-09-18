
import Config from '../../config'
import Proxy from '../utils/Proxy'

import {
    SET_NOTICE_LIST,
    ENABLE_NOTICE_ONFRESH,
    DISABLE_NOTICE_ONFRESH

} from '../constants/NoticeConstants';

//拉取球讯列表
export let fetchNotices=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var sessionId = state.user.sessionId;


            Proxy.postes({
                url: Config.server + '/func/notices/getNoticesInfo',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                }
            }).then((json)=>{
                if(json.re==1){
                    var noticeList=json.data;
                    dispatch(setNoticeList(noticeList));
                }
                resolve({re:1,data:noticeList})

            }).catch((e)=>{
                alert(e);
                reject(e);
            })


        });
    }
}

export let fetchNoticeMember=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'getNoticesInfo',
                }
            }).then((json)=>{
                resolve(json)

            }).catch((e)=>{
                alert(e);
                reject(e);
            })


        });
    }
}

export let setNoticeList=(noticeList)=>{
    return {
        type:SET_NOTICE_LIST,
        noticeList:noticeList
    }
}

export let enableNoticeOnFresh=()=>{
    return {
        type:ENABLE_NOTICE_ONFRESH,
    }
}

export let disableNoticeOnFresh=()=>{
    return {
        type:DISABLE_NOTICE_ONFRESH,
    }
}