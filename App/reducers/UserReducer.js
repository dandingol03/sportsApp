

import {
    UPDATE_PERSON_INFO,
    ACCESS_TOKEN_ACK,
    UPDATE_CERTIFICATE,
    UPDATE_USERTYPE,
    ON_USER_NAME_UPDATE,
    ON_PER_NAME_UPDATE,
    ON_WECHAT_UPDATE,
    ON_PER_ID_CARD_UPDATE,
    ON_RELATIVE_PERSON_UPDATE
} from '../constants/UserConstants';

const initialState = {
    accessToken: null,
    auth:false,
    personInfo:null,
    portrait:null,
    user:{}
};

let user = (state = initialState, action) => {

    switch (action.type) {

        case ACCESS_TOKEN_ACK:

            return Object.assign({}, state, {
                accessToken: action.accessToken,
                auth:action.auth
            })
        case UPDATE_PERSON_INFO:
            var  {data}=action.payload;
            return Object.assign({}, state, {
                personInfo:data
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
                    password
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

        default:
            return state;
    }
}

export default user;
