

import {
    UPDATE_PERSON_INFO,
    UPDATE_TRAINER_INFO,
    UPDATE_PERSON_INFO_AUXILIARY,
    ACCESS_TOKEN_ACK,
    SESSION_ID,
    UPDATE_CERTIFICATE,
    UPDATE_USERTYPE,
    ON_USER_NAME_UPDATE,
    ON_PER_NAME_UPDATE,
    ON_WECHAT_UPDATE,
    ON_GENDER_CODE_UPDATE,
    ON_PER_BIRTHDAY_UPDATE,
    ON_PER_ID_CARD_UPDATE,
    ON_RELATIVE_PERSON_UPDATE,
    ON_SELF_LEVEL_UPDATE,
    UPDATE_PORTRAIT,
    ON_SPORT_LEVEL_UPDATE,
    ON_MOBILE_PHONE_UPDATE,
    ON_UNIVERSITY_UPDATE,


} from '../constants/UserConstants';

const initialState = {
    accessToken: null,
    auth:false,
    sessionId:null,
    personInfo:null,
    portrait:null,
    user:{},
    trainer:{},
    personInfoAuxiliary:null,

};

let user = (state = initialState, action) => {

    switch (action.type) {

        case ACCESS_TOKEN_ACK:
            return Object.assign({}, state, {
                accessToken: action.accessToken,
                auth:action.auth
            })
        case SESSION_ID:
            return Object.assign({}, state, {
                sessionId: action.sessionId,
                auth:action.auth
            })
        case UPDATE_PERSON_INFO:
            var  {data}=action.payload;
            return Object.assign({}, state, {
                personInfo:data
            })
        case UPDATE_TRAINER_INFO:
            var  {data}=action.payload;
            return Object.assign({}, state, {
                trainer:data
            })
        case UPDATE_PERSON_INFO_AUXILIARY:
            var  {data}=action.payload;
            return Object.assign({}, state, {
                personInfoAuxiliary:data
            })

        case UPDATE_USERTYPE:
            var  {usertype}=action.payload;
            return Object.assign({}, state, {
                usertype:usertype
            })
        case UPDATE_CERTIFICATE:

            var  {username,password}=action.payload;
            return Object.assign({}, state, {
                user:{
                    username,
                    password,
                }
            })
        case ON_USER_NAME_UPDATE:
            var  {username}=action.payload;
            return Object.assign({}, state, {
                user:Object.assign(state.user,{username:username})
            })
        case ON_PER_NAME_UPDATE:
            var  {perName}=action.payload;
            return Object.assign({}, state, {
                personInfo:Object.assign(state.personInfo,{perName:perName})
            })
        case ON_GENDER_CODE_UPDATE:
            var {genderCode}=action.payload;
            return Object.assign({},state,{
                personInfo:Object.assign(state.personInfo,{genderCode:genderCode})
            })

        case ON_PER_BIRTHDAY_UPDATE:
            var {perBirthday}=action.payload;
            return Object.assign({},state,{
                personInfo:Object.assign(state.personInfo,{perBirthday:perBirthday})
            })

        case ON_WECHAT_UPDATE:
            var  {wechat}=action.payload;
            return Object.assign({}, state, {
                personInfo:Object.assign(state.personInfo,{wechat:wechat})
            })
        case ON_PER_ID_CARD_UPDATE:
            var  {perIdCard}=action.payload;
            return Object.assign({}, state, {
                personInfo:Object.assign(state.personInfo,{perIdCard:perIdCard})
            })
        case ON_RELATIVE_PERSON_UPDATE:
            var  {persons}=action.payload;
            return Object.assign({}, state, {
                relative:persons
            })
        case ON_SELF_LEVEL_UPDATE:
            var  {selfLevel}=action.payload;
            return Object.assign({}, state, {
                personInfoAuxiliary:Object.assign(state.personInfoAuxiliary,{selfLevel:selfLevel})
            })
        case ON_SPORT_LEVEL_UPDATE:
            var  {sportLevel}=action.payload;
            return Object.assign({}, state, {
                trainer:Object.assign(state.trainer,{sportLevel:sportLevel})
            })

        case ON_MOBILE_PHONE_UPDATE:
            var  {mobilePhone}=action.payload;
            return Object.assign({}, state, {
                personInfo:Object.assign(state.personInfo,{mobilePhone:mobilePhone})
            })
        case ON_UNIVERSITY_UPDATE:
            var  {university}=action.payload;
            return Object.assign({}, state, {
                personInfo:Object.assign(state.personInfo,{university:university})
            })
        case UPDATE_PORTRAIT:
            var data=action.payload;
            return Object.assign({}, state, {
                portrait:data
            })
            break;

        default:
            return state;
    }
}

export default user;
