
import _ from 'lodash'
import Proxy from '../utils/Proxy'
import PreferenceStore from '../utils/PreferenceStore';
import Config from '../../config';
import {
    RTMP_UPDATE_URL
} from '../constants/LiveConstants';



let updateRtmpUrl = (payload) => {
    return {
        type: RTMP_UPDATE_URL,
        payload
    }
}

//获取直播推流
export let getRTMPPushUrl = () => {
    return (dispatch, getState) => {

        return new Promise((resolve, reject) => {

            var state = getState();
            var accessToken = state.user.accessToken;

           // var {time,loginName,title,brief,longbrief}=payload
            Proxy.postes({
                url: Config.server + '/func/allow/testQn',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    time:120,
                    // hubName:"sportshot",
                    // type:"RTMP",
                    // hubType:1,
                    // streamName:"test",
                    // title,
                    // brief,
                    // longbrief,

                }
            }).then((json) => {
                dispatch(updateRtmpUrl({ url:json.data }));
                resolve({re:1,json:json.data})
            }).catch((e) => {
                reject(e)
            })
        })
    }
}
