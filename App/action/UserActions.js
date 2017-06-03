import Config from '../../config'
import Proxy from '../utils/Proxy'
import PreferenceStore from '../utils/PreferenceStore';



import {
    UPDATE_CERTIFICATE,
    UPDATE_PERSON_INFO,
    ACCESS_TOKEN_ACK
} from '../constants/UserConstants'

export let updateCertificate=(payload)=>{
    return {
        type:UPDATE_CERTIFICATE,
        payload:payload
    }
}

export let updatePersonInfo=(payload)=>{
    return {
        type:UPDATE_PERSON_INFO,
        payload:payload
    }
}

let getAccessToken= (accessToken)=>{
    if(accessToken!==null)
        return {
            type: ACCESS_TOKEN_ACK,
            accessToken: accessToken,
            auth:true,
        };
    else
        return {
            type:ACCESS_TOKEN_ACK,
            accessToken:accessToken,
            auth:'failed'
        }
}

//用户注册
export let registerUser=(payload)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var {username,password,genderCode,mobilePhone,nickName}=payload;

            Proxy.postes({
                url: Config.server + '/register?'+'username='+username+'&&password='+password+
                '&&mobilePhone='+mobilePhone+'&&genderCode='+genderCode+'&&nickName='+nickName,
                headers: {
                    'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                    'Content-Type': 'application/x-www-form-urlencoded'
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


//用户登录
export let doLogin=function(username,password){

    return dispatch=> {

        return new Promise((resolve, reject) => {


            var accessToken=null;
            Proxy.postes({
                url: Config.server + '/login',
                headers: {
                    'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "grant_type=password&password=" + password + "&username=" + username
            }).then((json)=> {
                accessToken = json.access_token;

                //TODO:make a dispatch
                dispatch(updateCertificate({username: username, password: password}));


                PreferenceStore.put('username',username);
                PreferenceStore.put('password',password);


                return Proxy.postes({
                    url: Config.server + '/svr/request',
                    headers: {
                        'Authorization': "Bearer " + accessToken,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        request: 'getPersonInfoByPersonId'
                    }
                });
            }).then((json) => {

                if (json.re == 1) {
                    dispatch(updatePersonInfo({data: json.data}));
                }

                dispatch(getAccessToken(accessToken));
                resolve(json)
            }).catch((err)=> {

                dispatch(getAccessToken(null));
                reject(err)
            });
        });
    }

}
