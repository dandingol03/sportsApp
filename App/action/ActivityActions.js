import Config from '../../config';
import Proxy from '../utils/Proxy';

import {
    ENABLE_MY_GROUP_ONFRESH,
    DISABLE_MY_GROUP_ONFRESH,
    ENABLE_ALL_GROUP_ONFRESH,
    DISABLE_ALL_GROUP_ONFRESH,
    SET_MY_GROUP_LIST,
    SET_ALL_GROUP_LIST,
    SET_ACTIVITY_LIST,
    ENABLE_ACTIVITY_ONFRESH,
    DISABLE_ACTIVITY_ONFRESH,
} from '../constants/ActivityConstants';

//发布群活动
export let releaseActivity=(payload)=>{
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
                    request: 'addActivity',
                    info:{
                       event:payload
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

//用手机号或用户名搜索成员
export let searchMember=(searchInfo)=>{
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
                    request: 'searchOnePerson',
                    info:{
                        searchInfo:searchInfo
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

//创建群组
export let createGroup=(info)=>{
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
                    request: 'createGroup',
                    info: {
                        groupName:info.group.groupName,
                        groupBrief:info.group.groupBrief,
                        memberList:info.memberList,
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

//设置我的组列表
export let setMyGroupList=(myGroupList)=>{
    return {
        type:SET_MY_GROUP_LIST,
        myGroupList:myGroupList
    }
}

//设置全部组列表
export let setAllGroupList=(allGroupList)=>{
    return {
        type:SET_ALL_GROUP_LIST,
        allGroupList:allGroupList
    }
}

//设置全部活动列表
export let setActivityList=(activityList)=>{
    return {
        type:SET_ACTIVITY_LIST,
        activityList:activityList
    }
}

export let enableMyGroupOnFresh=()=>{
    return {
        type:ENABLE_MY_GROUP_ONFRESH,
    }
}

export let disableMyGroupOnFresh=()=>{
    return {
        type:DISABLE_MY_GROUP_ONFRESH,
    }
}

export let enableAllGroupOnFresh=()=>{
    return {
        type:ENABLE_ALL_GROUP_ONFRESH,
    }
}

export let disableAllGroupOnFresh=()=>{
    return {
        type:DISABLE_ALL_GROUP_ONFRESH,
    }
}

export let enableActivityOnFresh=()=>{
    return {
        type:ENABLE_ACTIVITY_ONFRESH,
    }
}

export let disableActivityOnFresh=()=>{
    return {
        type:DISABLE_ACTIVITY_ONFRESH,
    }
}


export let fetchMyGroupList=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            var myGroupList = null;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request:'fetchMyGroup',
                    info:{
                    }
                }
            }).then((json)=>{
                if (json.re == 1) {
                    myGroupList = json.data;

                    if (myGroupList !== undefined && myGroupList !== null &&myGroupList.length > 0) {
                        dispatch(setMyGroupList(myGroupList));
                        dispatch(disableMyGroupOnFresh());
                        resolve({re:1});
                    }
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

export let fetchAllGroupList=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            var allGroupList = null;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'fetchAllGroup',
                    info:{
                    }
                }
            }).then((json)=>{
                if (json.re == 1) {
                    activityList = json.data;

                    if (allGroupList!== undefined && allGroupList !== null &&allGroupList.length > 0) {
                        dispatch(setAllGroupList(allGroupList));
                        dispatch(disableAllGroupOnFresh());
                        resolve({re:1});
                    }
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

export let fetchActivityList=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            var activityList = null;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'fetchActivityList',
                    info:{
                    }
                }
            }).then((json)=>{
                if (json.re == 1) {
                    activityList = json.data;

                    if (allGroupList!== undefined && allGroupList !== null &&allGroupList.length > 0) {
                        dispatch(setActivityList(activityList));
                        dispatch(disableActivityOnFresh());
                        resolve({re:1});
                    }
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}