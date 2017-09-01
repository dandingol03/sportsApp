/**
 * Created by dingyiming on 2017/8/16.
 */

import {
    SET_COMPETITION_LIST,
    SET_COMPETITION_ITEM_LIST,
    DISABLE_COMPETITION_ONFRESH,
    ENABLE_COMPETITION_ONFRESH,
    DISABLE_COMPETITION_ITEM_ONFRESH,
    ENABLE_COMPETITION_ITEM_ONFRESH


} from '../constants/CompetitionConstants';

const initialState = {
    competitionList:null,
    competitionItemList:null,
    competitionFresh:true,
    competitionItemFresh:true,
};

let competitions = (state = initialState, action) => {

    switch (action.type) {

        case  SET_COMPETITION_LIST:
            return Object.assign({}, state, {
                competitionList:action.competitionList
            })
        case DISABLE_COMPETITION_ONFRESH:
            return Object.assign({}, state, {
                competitionFresh:false
            })
        case ENABLE_COMPETITION_ONFRESH:
            return Object.assign({}, state, {
                competitionFresh:true
            })

        case  SET_COMPETITION_ITEM_LIST:
            return Object.assign({}, state, {
                competitionItemList:action.competitionItemList
            })
        case DISABLE_COMPETITION_ITEM_ONFRESH:
            return Object.assign({}, state, {
                competitionItemFresh:false
            })
        case ENABLE_COMPETITION_ITEM_ONFRESH:
            return Object.assign({}, state, {
                competitionItemFresh:true
            })

        default:
            return state;
    }
}

export default competitions;

