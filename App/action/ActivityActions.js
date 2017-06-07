import Config from '../../config'
import Proxy from '../utils/Proxy'

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


//获取群组信息
export let setGroupList=(groupList)=>{
    return {
        type:SET_GROUP_LIST,
        groupList:groupList
    }
}

export let enableGroupOnFresh=()=>{
    return {
        type:ENABLE_LIFEORDERS_ONFRESH,
    }
}

export let disableGroupOnFresh=()=>{
    return {
        type:DISABLE_LIFEORDERS_ONFRESH,
    }
}

export let fetchGroupList=(payload)=>{
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

