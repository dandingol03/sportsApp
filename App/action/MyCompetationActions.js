
import Config from '../../config'
import Proxy from '../utils/Proxy'

import {
    SET_COMPETATION,
    DISABLE_ACTIVITY_ONFRESH,
    ENABLE_ACTIVITY_ONFRESH,
    SET_COMPETITION_SCHEDULELIST,
    DISABLE_COMPETITION_ONFRESH,
    ENABLE_COMPETITION_ONFRESH,

} from '../constants/CompetitionConstants'

//设置教练列表
export let setMyCompetitionsList=(myCompetitionList)=>{
    return {
        type:SET_COMPETATION,
        myCompetitionList:myCompetitionList
    }
}

export let seCompetitionsScheduleList=(mycompetitionScheduleList)=>{
    return {
        type:SET_COMPETITION_SCHEDULELIST,
        competitionScheduleList:mycompetitionScheduleList
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

//拉取我的比赛
export let fetchMyGames=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();
          //  var sessionId = state.user.sessionId;

            Proxy.postes({
                url: Config.server + '/func/competition/getMyBadmintonCompetitionInfoList',
                headers: {

                    'Content-Type': 'application/json',
                 //   'Cookie':sessionId,
                },
                body: {

                }
            }).then((json)=>{
                if(json.re==1){
                    var competitionList = json.data;
                    dispatch(setMyCompetitionsList(competitionList));
                }
                resolve({re:1,data:competitionList})

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

//获取比赛列表
export let fetchcompetitionScheduleList=(competitionId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            Proxy.postes({
                url: Config.server + '/func/competition/getBadmintonCompetitionGameListOfPerson',
                headers: {

                    'Content-Type': 'application/json',
                },
                body: {
                    competitionId:parseInt(competitionId),

                }
            }).then((json)=>{
                if(json.re==1){
                    var mycompetitionScheduleList = json.data;
                    dispatch(seCompetitionsScheduleList(mycompetitionScheduleList));
                }
                resolve({re:1,data:mycompetitionScheduleList})
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

/*export let onGameUpdate=(competations)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_GAME_UPDATE,
           payload:{
                competations
            }
         })
     }
 }*!/*/
