
import Config from '../../config'
import Proxy from '../utils/Proxy'

import {
    DISABLE_COMPETITION_ONFRESH,
    ENABLE_COMPETITION_ONFRESH,
    SET_COMPETITION_LIST,
    SET_COMPETITION_ITEM_LIST,
    ENABLE_COMPETITION_ITEM_ONFRESH,
    DISABLE_COMPETITION_ITEM_ONFRESH,
} from '../constants/CompetitionConstants'


//拉取能报名的比赛
export let fetchGames=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/func/competition/getCanJoinBadmintonCompetitionInfoList',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {

                }
            }).then((json)=>{
                if(json.re==1){
                    var competitionList = json.data;
                    dispatch(setCompetitionList(competitionList));
                }
                resolve({re:1,data:competitionList})

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

export let signUpCompetition=(competitionItem,personId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var projectType=competitionItem.projectType;
            var state=getState();
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/func/competition/createCompetitionTeam',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {
                        projectId:projectId,
                        personIdA:personIdA,
                        personIdB:personIdB,
                        teamName:teamName,
                        remark:remark
                }
            }).then((json)=>{
                if(json.re==1){
                     console.log("报名成功")
                }
                resolve({re:1})

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

export let cancelCompetition=(competitionItem,personId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var projectType=competitionItem.projectType;
            var projectId=competitionItem.projectId;
            var personIdA=personId;
            var personIdB=null;
            var teamName=null;
            var remark=null;
            switch(projectType){
                case 1: //男单
                    break;

                case 2:
                    break;

                //case 3:

                //case 4:

                // case 5:

                //case 6:
                default:
                    break;

            }
            var state=getState();
            var sessionId = state.user.sessionId;
            Proxy.postes({
                url: Config.server + '/func/competition/cancelCompetitionTeam',
                headers: {

                    'Content-Type': 'application/json',
                    'Cookie':sessionId,
                },
                body: {
                    projectId:projectId
                }
            }).then((json)=>{
                if(json.re==1){
                    //var competitionList = json.data;
                    //dispatch(setCompetitionList(competitionList));
                    console.log("aaa");

                }
                resolve({re:1})

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

export let setCompetitionList=(competitionList)=>{
    return {
        type:SET_COMPETITION_LIST,
        competitionList:competitionList
    }
}

export let setCompetitionItemList=(competitionItemList)=>{
    return {
        type:SET_COMPETITION_ITEM_LIST,
        competitionItemList:competitionItemList
    }
}
/*export let onGameUpdate=(competitions)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_GAME_UPDATE,
            payload:{
                competitions
            }
        })
    }
}*/


export let enableCompetitionOnFresh=()=>{
    return {
        type:ENABLE_COMPETITION_ONFRESH,
    }
}
export let disableCompetitionOnFresh=()=>{
    return {
        type:DISABLE_COMPETITION_ONFRESH,
    }
}

export let enableCompetitionItemOnFresh=()=>{
    return {
        type:ENABLE_COMPETITION_ITEM_ONFRESH,
    }
}
export let disableCompetitionItemOnFresh=()=>{
    return {
        type:DISABLE_COMPETITION_ITEM_ONFRESH,
    }
}

export let fetchGamesItem=(competitionId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var allCompetitionItemList = null;

            Proxy.postes({
                url: Config.server + '/func/competition/getBadmintonCompetitionProjectList',
                headers: {

                    'Content-Type': 'application/json',

                },
                body: {
                    competitionId:competitionId
                }
            }).then((json)=>{
                if (json.re == 1) {
                    allCompetitionItemList = json.data;
                    if (allCompetitionItemList!== undefined&&allCompetitionItemList && allCompetitionItemList !== null &&allCompetitionItemList.length > 0) {
                        dispatch(setCompetitionItemList(allCompetitionItemList));
                        dispatch(disableCompetitionItemOnFresh());
                        resolve({re:1});
                    }
                }else{

                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:'目前没有已创建的群活动'});
                    }
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}
