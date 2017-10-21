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

    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();

            var personId = state.user.personInfo.personId;

            var params={
                eventManagerId:personId,
                eventName:event.eventName,
                eventType:event.eventType=='组内'?'1':'0',
                eventBrief:event.eventBrief,
                eventPlaceId:event.unitId,
                eventMaxMemNum:event.eventType=='公开'?parseInt(event.eventMaxMemNum):100,
                coachId:parseInt(event.coachId),
                sparringId:parseInt(event.sparringId),
                groupId:parseInt(event.groupId),
                yardNum:event.filedNum==null?1:parseInt(event.filedNum),

                eventDate:event.time.eventWeek,
                startTime:event.time.startTime,
                endTime:event.time.endTime,
                IsSchedule:event.time.isSchedule,

                memberLevel:event.memberLevel==null?"1":event.memberLevel.toString(),
                cost:parseInt(event.cost),
                costType:event.costTypeCode.toString(),
                isNeedCoach:parseInt(event.hasCoach),
                isNeedSparring:parseInt(event.hasSparring),
                feeDes:event.feeDes,
                eventNowMemNum:0,
                status:0

            }

            Proxy.postes({
                url: Config.server + '/func/allow/createEvents',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:params
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

//获取全部的活动列表
export let fetchActivityList=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var allActivityList = null;
            var username = state.user.user.username;

            var visibleEvents=[];
            var myEvents=[];//我发起的活动
            var myTakenEvents=[];//我报名的活动
            Proxy.postes({
               // url: Config.server + '/func/allow/getAllEventsForPhone',
                url: Config.server + '/func/allow/getCheckedEvents',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

                }
            }).then((json)=>{
                if (json.re == 1) {
                    allActivityList = json.data;

                    if (allActivityList!== undefined && allActivityList !== null &&allActivityList.length > 0) {
                        dispatch(setActivityList(allActivityList));
                        allActivityList.map((activity,i)=>{
                            var members=new Array();
                            var flag=0;

                            members=activity.eventMember.split(",");

                            if(activity.eventManagerLoginName==username){
                                myEvents.push(activity);
                            }

                            for(j=0;j<members.length;j++){

                                // if(activity.eventManager==members[j]){
                                //     myTakenEvents.push(activity);
                                // }

                                if(activity.eventManager!=members[j]){
                                    flag++;
                                    if(flag==members.length){

                                        visibleEvents.push(activity);
                                    }
                                }

                            }
                        });

                    }
                }else{

                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:'目前没有已创建的群活动'});
                    }
                }

                Proxy.postes({
                    // url: Config.server + '/func/allow/getAllEventsForPhone',
                    url: Config.server + '/func/allow/getMyEvents',
                    headers: {

                        'Content-Type': 'application/json',

                    },
                    body: {

                    }
                }).then((json)=>{
                    if(json.re==1){
                        myEventsList = json.data;
                        if (myEventsList!== undefined && myEventsList !== null &&myEventsList.length > 0){
                            myEventsList.map((activity,i)=>{
                                var members=new Array();
                                var flag=0;
                                var flag1=0;
                                visibleEvents.map((visibleEvent,k)=>{

                                    if(activity.eventName!=visibleEvent.eventName){

                                        flag1++;
                                    }
                                    if(flag1==visibleEvents.length){

                                        members=activity.eventMember.split(",");

                                        if(activity.eventManager==username){
                                            myEvents.push(activity);
                                        }

                                        visibleEvents.push(activity);
                                        // for(j=0;j<members.length;j++){
                                        //
                                        //     // if(activity.eventManager==members[j]){
                                        //     //     myTakenEvents.push(activity);
                                        //     // }
                                        //     if(activity.eventManager!=members[j]){
                                        //         flag++;
                                        //         if(flag==members.length){
                                        //
                                        //             visibleEvents.push(activity);
                                        //         }
                                        //     }
                                        //
                                        // }

                                    }

                                })


                            });

                        }
                    }
                    dispatch(setVisibleEvents(visibleEvents));
                    dispatch(setMyEvents(myEvents));
                    dispatch(setMyTakenEvents(myTakenEvents));
                    dispatch(disableActivityOnFresh());
                    resolve({re:1});
                }).catch((e)=>{
                    alert(e);
                    reject(e);
                })
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
            Proxy.postes({
                url: Config.server + '/func/node/signUpActivity',
                headers: {

                    'Content-Type': 'application/json',

                },
                body: {
                    eventId:parseInt(eventId)

                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'报名成功'});
                }else{
                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:'报名不成功'});
                    }
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

            Proxy.postes({
                url: Config.server + '/func/node/deleteActivity',
                headers: {

                    'Content-Type': 'application/json',
                },
                body: {

                    eventId:parseInt(eventId)

                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:' 撤销成功'});
                }else{
                    if(json.re==-100){
                        resolve(json);
                    }
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
            Proxy.postes({
                url: Config.server + '/func/node/exitActivity',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    eventId:parseInt(eventId)
                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'退出成功'});
                }else{
                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:'退出不成功'});
                    }

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
            Proxy.postes({
                url: Config.server + '/func/node/searchOnePerson',
                headers: {
                    'Content-Type': 'application/json',
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
            Proxy.postes({
                url: Config.server + '/func/node/createGroup',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

                        groupName:info.group.groupName,
                        groupBrief:info.group.groupBrief,
                        memberList:info.memberList,
                        groupMaxMemNum:parseInt(info.group.groupMaxMemNum),


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
            var myGroupList = null;

            Proxy.postes({
                url: Config.server + '/func/allow/getMyGroups',
                headers: {
                    'Content-Type': 'application/json',
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
                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:'目前未加入任何群组'});
                    }
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
            var allGroupList = null;

            Proxy.postes({
                url: Config.server + '/func//allow/getGroups',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

                }
            }).then((json)=>{
                if (json.re == 1) {
                    allGroupList = json.data;
                    //
                    // if (allGroupList!== undefined && allGroupList !== null &&allGroupList.length > 0) {
                    //
                    //     var groupList = [];
                    //     allGroupList.map((group)=>{
                    //         var flag = 0;
                    //         group.memberList.map((member)=>{
                    //             if(member.personId==state.user.personInfo.personId)
                    //                 flag++;
                    //         });
                    //         if(flag==0){
                    //             groupList.push(group);
                    //         }
                    //     })
                        dispatch(setAllGroupList(allGroupList));
                        dispatch(disableAllGroupOnFresh());
                        resolve({re:1});
                    //}
                }else{
                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:'目前没有已创建的群组'});
                    }
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
            Proxy.postes({
                url: Config.server + '/func/node/joinGroup',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

                        groupId:parseInt(groupId)

                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:null});
                }else{
                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:' 加入不成功'});
                    }
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
            Proxy.postes({
                url: Config.server + '/func/node/deleteGroup',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    groupId:parseInt(groupId)
                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'删除成功'});
                }else{
                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:'删除不成功'});
                    }
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
            Proxy.postes({
                url: Config.server + '/func/node/exitGroup',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    groupId:parseInt(group.groupId)
                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'退出成功'});
                }else{
                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:'退出不成功'});
                    }
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

//获取群活动成员
export let fetchEventMemberList=(eventId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            Proxy.postes({
                url: Config.server + '/func/node/fetchEventMemberList',
                headers: {

                    'Content-Type': 'application/json',
                },
                body: {
                    eventId:parseInt(eventId)
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

//获取群组成员
export let fetchGroupMemberList=(group)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            Proxy.postes({
                url: Config.server + '/func/node/fetchGroupMemberList',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    groupId:parseInt(group.groupId)

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