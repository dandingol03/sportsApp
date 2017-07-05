import Config from '../../config'
import Proxy from '../utils/Proxy'
import PreferenceStore from '../utils/PreferenceStore';



import {
    UPDATE_CERTIFICATE,
    UPDATE_PERSON_INFO,
    UPDATE_USERTYPE,
    ACCESS_TOKEN_ACK,
    ON_USER_NAME_UPDATE,
    ON_MOBILE_PHONE_UPDATE,
    ON_SELF_LEVEL_UPDATE,
    ON_PER_NAME_UPDATE,
    ON_WECHAT_UPDATE,
    ON_PER_ID_CARD_UPDATE,
    ON_RELATIVE_PERSON_UPDATE
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

export let updateUserType=(usertype)=>{
    return {
        type:UPDATE_USERTYPE,
        payload:{
            usertype
        }
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

//自身水平更改
export let updateSelfLevel=(selfLevel)=>{
    return (dispatch,getState)=> {
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'updateSelfLevel',
                    info:{
                        selfLevel
                    }
                }
            }).then((json)=>{
                resolve(json)

            }).catch((e)=>{
                alert(e);
                reject(e);
            })
        })
    }
}

//用户名更改
export let updateUsername=(username)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'updateUsername',
                    info:{
                        username:username
                    }
                }
            }).then((json)=>{
                resolve(json)

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

export let onMobilePhoneUpdate=(mobilePhone)=>{
    return (dispatch,getState)=>{

        dispatch({
            type:ON_MOBILE_PHONE_UPDATE,
            payload: {
                mobilePhone
            }
        })
    }
}


export let onUsernameUpdate=(username)=>{
    return (dispatch,getState)=>{

        dispatch({
            type:ON_USER_NAME_UPDATE,
                payload: {
                    username
                }
        })
    }
}

export let onSelfLevelUpdate=(selfLevel)=>{
    return (dispatch,getState)=>{

        dispatch({
            type:ON_SELF_LEVEL_UPDATE,
            payload: {
                selfLevel
            }
        })
    }
}

//手机号更改
export let updateMobilePhone=(mobilePhone)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'updateMobilePhone',
                    info:{
                        mobilePhone
                    }
                }
            }).then((json)=>{
                resolve(json)

            }).catch((e)=>{
                alert(e);
                reject(e);
            })
        })
    }
}

//手机验证
export let verifyMobilePhone=(mobilePhone)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            Proxy.postes({
                url: Config.server + '/securityCode',
                headers: {
                    'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                    'Content-Type': 'application/json'
                },
                body: {
                    phoneNum:mobilePhone
                }
            }).then((json)=>{
                resolve(json)

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

//真实姓名更改
export let updatePerName=(perName)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'updatePerName',
                    info:{
                        perName:perName
                    }
                }
            }).then((json)=>{
                resolve(json)

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

//微信号更改
export let updateWeChat=(wechat)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'updateWeChat',
                    info:{
                        wechat:wechat
                    }
                }
            }).then((json)=>{
                resolve(json)

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

//身份证证件号更改
export let updatePerIdCard=(perIdCard)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'updatePerIdCard',
                    info:{
                        perIdCard:perIdCard
                    }
                }
            }).then((json)=>{
                resolve(json)

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

export let onPerNameUpdate=(perName)=>{
    return (dispatch,getState)=>{

        dispatch({
            type:ON_PER_NAME_UPDATE,
            payload: {
                perName
            }
        })
    }
}

export let onWeChatUpdate=(wechat)=>{
    return (dispatch,getState)=>{

        dispatch({
            type:ON_WECHAT_UPDATE,
            payload: {
                wechat
            }
        })
    }
}


export let onPerIdCardUpdate=(perIdCard)=>{
    return (dispatch,getState)=>{

        dispatch({
            type:ON_PER_ID_CARD_UPDATE,
            payload: {
                perIdCard
            }
        })
    }
}

//同步用户关联人
export let onRelativePersonsUpdate=(persons)=>{
    return (dispatch,getState)=>{

        dispatch({
            type:ON_RELATIVE_PERSON_UPDATE,
            payload: {
                persons
            }
        })
    }
}

//新增用户关联人
export let addRelativePerson=(payload)=> {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            var state=getState();
            var accessToken = state.user.accessToken;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'addRelativePerson',
                    info:payload
                }
            }).then((json)=>{
                if(json.re==1){
                    resolve(json)
                }else{
                    if(json.re==2){
                        resolve(json)
                    }
                }

            }).catch((e)=>{
                alert(e);
                reject(e);
            })
        })
    }
}


//用户注册
export let registerUser=(payload)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();
            var {userType,username,password,genderCode,mobilePhone,nickName}=payload;

            Proxy.postes({
                url: Config.server + '/register',
                headers: {
                    'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                    'Content-Type': 'application/json'
                },
                body: {
                    username: username,
                    password:password,
                    mobilePhone:mobilePhone,
                    genderCode:genderCode,
                    nickName:nickName,
                    userType:userType
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


                PreferenceStore.put('username', username);
                PreferenceStore.put('password', password);


                return Proxy.postes({
                    url: Config.server + '/svr/request',
                    headers: {
                        'Authorization': "Bearer " + accessToken,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        request: 'getUserTypeByPersonId'
                    }
                });

            }).then((json)=>{

                if(json.re==1)
                {
                    dispatch(updateUserType(json.data))
                }

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

//上传身份证
export let uploadPersonIdCard=(path,personId)=> {
    //var personId = personId.toString();
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var data = new FormData();
            data.append('file', {uri: path, name: 'portrait.jpg', type: 'multipart/form-data'});
            //限定为jpg后缀

            Proxy.post({
                url:Config.server+'/uploadPersonIdCard?personId='+personId.toString(),
                headers: {
                    'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                    'Content-Type':'multipart/form-data',
                },
                body: data,
            },(json)=> {
               resolve(json)

            }, (err) =>{
                reject(err)
            });


        })
    }
}
