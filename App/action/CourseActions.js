
import Config from '../../config'
import Proxy from '../utils/Proxy'

import {
    DISTRIBUTE_COURSE,
    ON_COURSES_UPDATE,
    ON_MY_COURSES_UPDATE,
    DISABLE_MY_COURSES_ONFRESH,
    ON_CUSTOM_COURSE_UPDATE,
} from '../constants/CourseConstants'

//拉取个人已报名课程
export let fetchMyCourses=()=>{
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
                    request: 'fetchMyCourses'
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

export let onMyCoursesUpdate=(myCourses)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_MY_COURSES_UPDATE,
            payload:{
                myCourses
            }
        })
    }
}

export let disableMyCoursesOnFresh=()=>{
    return {
        type:DISABLE_MY_COURSES_ONFRESH,
    }
}

//拉取课程
export let fetchCourses=()=>{
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
                    request: 'fetchCourses'
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

export let onCoursesUpdate=(courses)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_COURSES_UPDATE,
            payload:{
                courses
            }
        })
    }
}

//拉取定制
export let fetchCustomCourse=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();
            var accessToken = state.user.accessToken;
            var today = new Date();
            var customCourse = [];

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'fetchCustomCourse'
                }
            }).then((json)=>{
                var allCustomCourse = json.data;
                if (allCustomCourse!== undefined && allCustomCourse !== null &&allCustomCourse.length > 0) {
                    allCustomCourse.map((customCourse,i)=>{
                        var date = new Date(customCourse.deadline);
                        if(((date-today)>0&&today.getDate()!=date.getDate())||
                            (today.getDate()==date.getDate()&&(date.getHours()-today.getHours()>0)))
                        {
                            if(customCourse.hasCoach==0||(customCourse.hasCoach==1&&customCourse.coachId==state.user.personInfo.personId))
                            customCourse.push(customCourse);
                        }
                    })
                    resolve({re:json.re,data:customCourse})
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

export let onCustomCourseUpdate=(customCourse)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_CUSTOM_COURSE_UPDATE,
            payload:{
                customCourse
            }
        })
    }
}


//发布课程
export let distributeCourse=(course,timeList,venue)=>{
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
                    request: 'distributeCourse',
                    info:{
                        course,
                        timeList,
                        venue
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

export let fetchClassSchedule=(classId)=>{
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
                    request: 'fetchClassSchedule',
                    info:{
                        classId
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

export let fetchPersonRelative =()=>{
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
                    request: 'fetchPersonRelative',
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

//课程报名
export let addBadmintonClassMermberInfo=(info)=>{
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

                    request: 'addBadmintonClassMermberInfo',
                    info:{
                        isSelfCheck:info.isSelfCheck,
                        persons:info.persons,
                        classId:info.classId,
                        creatorId:info.creatorId,
                        signNumber:info.signNumber,
                        maxNumber:info.maxNumber,
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

//发布用户定制课程
export let distributeCustomerPlan=(plan,venue)=>{
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
                    request: 'distributeCustomerPlan',
                    info:{
                        plan,
                        venue
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