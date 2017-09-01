/**
 * Created by dingyiming on 2017/8/16.
 */

import {
    SET_COMPETATION,
    DISABLE_ACTIVITY_ONFRESH,
    ENABLE_ACTIVITY_ONFRESH,
    SET_COMPETITION_SCHEDULELIST,
    DISABLE_COMPETITION_ONFRESH,
    ENABLE_COMPETITION_ONFRESH,
} from '../constants/CompetitionConstants';

const initialState = {
    competitionList:null,
    activityOnFresh:true,
    mycompetitionScheduleList:null,
    competitionOnfresh:true
};

let mycompetition = (state = initialState, action) => {

    switch (action.type) {
        case SET_COMPETATION:
            return Object.assign({}, state, {
                competitionList:action.myCompetitionList
            })

        case DISABLE_ACTIVITY_ONFRESH:
            return Object.assign({}, state, {
                activityOnFresh:false

            })
        case ENABLE_ACTIVITY_ONFRESH:
            return Object.assign({}, state, {
                activityOnFresh:true
            })
        case SET_COMPETITION_SCHEDULELIST:
            return Object.assign({}, state, {
                mycompetitionScheduleList:action.competitionScheduleList
            })
        case DISABLE_COMPETITION_ONFRESH:
            return Object.assign({}, state, {
                competitionOnfresh:false
            })
        case ENABLE_COMPETITION_ONFRESH:
            return Object.assign({}, state, {
                competitionOnfresh:true
            })

        default:
            return state;
    }
}

export default mycompetition;

