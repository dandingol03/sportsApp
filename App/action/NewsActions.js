
import Config from '../../config'
import Proxy from '../utils/Proxy'

import {
    FETCH_NEWS_THEME,
    UPDATE_NEWS_THEME
} from '../constants/NewsConstants';

//拉取球讯列表
export let fetchNewsTheme=()=>{
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
                    request: 'getBadmintonNewsTheme',
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

//拉取球讯内容地址
export let getNewsContentUrl=(themeId)=>{
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
                    request: 'getNewsContentUrl',
                    info:{
                        themeId:themeId
                    }
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

//更新球讯
export let updateNewsTheme=(news)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:UPDATE_NEWS_THEME,
            payload:{
                news
            }
        })
    }
}
