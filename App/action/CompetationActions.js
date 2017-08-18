
import Config from '../../config'
import Proxy from '../utils/Proxy'

import {
    SET_COMPETATION

} from '../constants/CompetationConstants'

//设置教练列表
export let setCompetations=(competations)=>{
    return {
        type:SET_COMPETATION,
        games:competations
    }
}

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
                    var competations = json.data;

                    dispatch(setCompetations(competations));
                }
                resolve({re:1,data:competations})

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}


export let onGameUpdate=(competations)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_GAME_UPDATE,
            payload:{
                competations
            }
        })
    }
}
