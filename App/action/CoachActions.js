
import Config from '../../config'
import Proxy from '../utils/Proxy'

import {
    DISTRIBUTE_COACH,
    ON_COACH_UPDATE,
    SET_COACH,

} from '../constants/CoachConstants'

//设置教练列表
export let setCoaches=(coaches)=>{
    return {
        type:SET_COACH,
        coaches:coaches
    }
}

//拉取教练
export let fetchCoaches=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/node/fetchCoaches',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: {

                }
            }).then((json)=>{
                if(json.re==1){
                    var coaches = json.data;
                    coaches.map((coach)=>{
                        coach.checked = false;
                    });

                    //dispatch(setCoaches(coaches));
                }
                resolve({re:1,data:coaches})

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}


export let onCoachUpdate=(coaches)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_COACH_UPDATE,
            payload:{
                coaches
            }
        })
    }
}
