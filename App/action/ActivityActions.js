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
    SET_MY_EVENTS,
    SET_MY_TAKEN_EVENTS,
    SET_VISIBLE_EVENTS,
} from '../constants/ActivityConstants';

//发布群活动
export let releaseActivity=(event)=>{

    if(event.eventType=='组内'&&event.groupNum!==null&&event.groupNum!==undefined){
        event.eventMaxMemNum = event.groupNum;
    }

    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,

                },
                body: {
                       event:event

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

//设置全部活动列表
export let setActivityList=(activityList)=>{
    return {
        type:SET_ACTIVITY_LIST,
        activityList:activityList
    }
}

//设置可见活动列表
export let setVisibleEvents=(visibleEvents)=>{
    return {
        type:SET_VISIBLE_EVENTS,
        visibleEvents:visibleEvents
    }
}

//设置我发起的活动列表
export let setMyEvents=(myEvents)=>{
    return {
        type:SET_MY_EVENTS,
        myEvents:myEvents
    }
}

//设置我报名活动列表
export let setMyTakenEvents=(myTakenEvents)=>{
    return {
        type:SET_MY_TAKEN_EVENTS,
        myTakenEvents:myTakenEvents
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

//获取全部的群组列表
export let fetchActivityList=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            var allActivityList = null;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {
                }
            }).then((json)=>{
                if (json.re == 1) {
                    allActivityList = json.data;
                    var visibleEvents=[];
                    var myEvents=[];//我发起的活动
                    var myTakenEvents=[];//我报名的活动
                    var today = new Date();

                    if (allActivityList!== undefined && allActivityList !== null &&allActivityList.length > 0) {
                        dispatch(setActivityList(allActivityList));
                        allActivityList.map((activity,i)=>{

                            var date = new Date(activity.eventTime);
                            if(((date-today)>0&&today.getDate()!=date.getDate())||
                                (today.getDate()==date.getDate()&&(date.getHours()-today.getHours()>0)))
                            {

                                var isMember=0;
                                activity.memberList.map((member)=>{
                                    if(member.personId==state.user.personInfo.personId)
                                    {
                                        isMember++;
                                    }
                                })

                                //我发起的活动
                                if(activity.coachId==state.user.trainer.trainerId&&activity.coachId!==null){
                                    activity.meCoach = true
                                    visibleEvents.push(activity);
                                }

                                //我发起的活动
                                if(activity.eventManager.personId==state.user.personInfo.personId){
                                    myEvents.push(activity);
                                }else{
                                    //我报名的活动
                                    if(isMember!==0){
                                        myTakenEvents.push(activity);
                                    }else{
                                        //我可选的活动
                                        if(activity.eventType==0){
                                            visibleEvents.push(activity);
                                        }else{
                                            var myGroupList = state.activity.myGroupList;
                                            if(myGroupList==null||myGroupList==undefined){
                                                dispatch(fetchMyGroupList()).then((json)=>{
                                                    if(activity.groupId!==null){
                                                        myGroupList = json.data;
                                                        myGroupList.map((group,i)=>{
                                                            if(group.groupInfo.groupId==activity.groupId){
                                                                visibleEvents.push(activity);
                                                            }
                                                        })
                                                    }
                                                });
                                            }else{
                                                if(activity.groupId!==null){
                                                    myGroupList.map((group,i)=>{
                                                        if(group.groupInfo.groupId==activity.groupId){
                                                            visibleEvents.push(activity);
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }

                            }

                        });

                        dispatch(setVisibleEvents(visibleEvents));
                        dispatch(setMyEvents(myEvents));
                        dispatch(setMyTakenEvents(myTakenEvents));

                        dispatch(disableActivityOnFresh());
                        resolve({re:1});
                    }
                }else{
                    resolve({re:-1,data:'目前没有已创建的群活动'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

//报名群活动
export let signUpActivity=(eventId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,

                },
                body: {
                    eventId:eventId

                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'报名成功'});
                }else{
                    resolve({re:-1,data:'报名不成功'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

//撤销群活动
export let deleteActivity=(eventId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                        eventId:eventId

                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:' 撤销成功'});
                }else{
                    resolve({re:-1,data:'撤销不成功'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

//退出群活动
export let exitActivity=(eventId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                        eventId:eventId

                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'退出成功'});
                }else{
                    resolve({re:-1,data:'退出不成功'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}


//用用户名搜索成员
export let searchMember=(searchInfo)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                        searchInfo:searchInfo

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
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                        groupName:info.group.groupName,
                        groupBrief:info.group.groupBrief,
                        memberList:info.memberList,
                        groupMaxMemNum:info.group.groupMaxMemNum,

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

//获取我的群组列表
export let fetchMyGroupList=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            var myGroupList = null;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                }
            }).then((json)=>{
                if (json.re == 1) {
                    myGroupList = json.data;

                    if (myGroupList !== undefined && myGroupList !== null &&myGroupList.length > 0) {
                        dispatch(setMyGroupList(myGroupList));
                        dispatch(disableMyGroupOnFresh());
                        resolve({re:1,data:myGroupList});
                    }
                }else{
                    resolve({re:-1,data:'目前未加入任何群组'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

//获取全部的群组列表
export let fetchAllGroupList=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            var allGroupList = null;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                }
            }).then((json)=>{
                if (json.re == 1) {
                    allGroupList = json.data;

                    if (allGroupList!== undefined && allGroupList !== null &&allGroupList.length > 0) {

                        var groupList = [];
                        allGroupList.map((group)=>{
                            var flag = 0;
                            group.memberList.map((member)=>{
                                if(member.personId==state.user.personInfo.personId)
                                    flag++;
                            });
                            if(flag==0){
                                groupList.push(group);
                            }
                        })
                        dispatch(setAllGroupList(groupList));
                        dispatch(disableAllGroupOnFresh());
                        resolve({re:1});
                    }
                }else{
                    resolve({re:-1,data:'目前没有已创建的群组'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

//加入群组
export let joinGroup=(groupId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                        groupId:groupId

                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:null});
                }else{
                    resolve({re:-1,data:' 加入不成功'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

//删除群组
export let deleteGroup=(groupId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                        groupId:groupId

                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'删除成功'});
                }else{
                    resolve({re:-1,data:'删除不成功'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

//退出群组
export let exitGroup=(group)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                        groupId:group.groupId

                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'退出成功'});
                }else{
                    resolve({re:-1,data:'退出不成功'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}


