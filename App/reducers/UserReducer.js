

import {
    UPDATE_PERSON_INFO,
    ACCESS_TOKEN_ACK,
    UPDATE_CERTIFICATE,
    UPDATE_USERTYPE
} from '../constants/UserConstants';

const initialState = {
    accessToken: null,
    auth:false,
    personInfo:null,
    portrait:null
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


        default:
            return state;
    }
}

export default user;
