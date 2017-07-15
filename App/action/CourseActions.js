
import Config from '../../config'
import Proxy from '../utils/Proxy'

import {
    DISTRIBUTE_COURSE,
    ON_COURSES_UPDATE,
    ON_MY_COURSES_UPDATE,
    DISABLE_MY_COURSES_ONFRESH,
    ON_CUSTOM_COURSE_UPDATE,

    ENABLE_MY_CUSTOM_COURSES_ONFRESH,
    DISABLE_MY_CUSTOM_COURSES_ONFRESH,
    SET_MY_CUSTOM_COURSES
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


export let verifyCoursesCancelable=(courses)=>{
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
                    request: 'verifyCoursesCancelable',
                    info:{
                        courses
                    }
                }
            }).then((json)=>{
                resolve(json)

            }).catch((e)=>{
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
export let setMyCustomCourses=(myCustomCourses)=>{
    return {
        type:SET_MY_CUSTOM_COURSES,
        myCustomCourses:myCustomCourses
    }
}

export let enableMyCustomCoursesOnFresh=()=>{
    return {
        type:ENABLE_MY_CUSTOM_COURSES_ONFRESH,
    }
}

export let disableMyCustomCoursesOnFresh=()=>{
    return {
        type:DISABLE_MY_CUSTOM_COURSES_ONFRESH,
    }
}

export let fetchCustomCourse=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();
            var accessToken = state.user.accessToken;
            var today = new Date();
            var customCourseList = [];
            var myCustomCourses = [];

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
                            if((customCourse.hasCoach==0&&customCourse.status==0)||(customCourse.hasCoach==1&&customCourse.coach.personId==state.user.personInfo.personId&&customCourse.status==0))
                                customCourseList.push(customCourse);

                            if(customCourse.courseManager==state.user.personInfo.personId){
                                myCustomCourses.push(customCourse);
                            }

                        }
                    })

                    dispatch(setMyCustomCourses(myCustomCourses));
                    resolve({re:json.re,data:customCourseList})
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
export let distributeCourse=(course,timeList,venue,memberId)=>{
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
                        venue,
                        memberId
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

//看是否已经报名
export let checkPersonIsMember=(info)=>{
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

                    request: 'checkPersonIsMember',
                    info:{
                        isSelfCheck:info.isSelfCheck,
                        persons:info.persons,
                        classId:info.classId,
                        creatorId:info.creatorId,
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

//取消已有课程报名
export let dropoutMyCourses=(courses)=>{
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
             request: 'dropoutCourseInBatch',
                    info:{
                        courses
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

//完成定制
export let finishCustomCourse=(courseId)=>{
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
                    request: 'finishCustomCourse',
                    info:{
                        courseId:courseId
                    }
                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'成功'});
                }else{
                    resolve({re:-1,data:'不成功'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}

//取消定制
export let cancleCustomCourse=(courseId)=>{
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
                    request: 'cancleCustomCourse',
                    info:{
                        courseId:courseId
                    }
                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'成功'});
                }else{
                    resolve({re:-1,data:'不成功'});
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}
