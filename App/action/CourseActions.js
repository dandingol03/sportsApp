
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

            Proxy.postes({
                url: Config.server + '/func/allow/getMyClass',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

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

            Proxy.postes({
                url: Config.server + '/func/course/verifyCoursesCancelable',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    courses:courses
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
            Proxy.get({
                url: Config.server + '/func/allow/getAllClass ',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

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

//获取用户定制课程
export let fetchCustomCourse=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/fetchCustomCourse',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

                }
            }).then((json)=>{
                if(json.re==-100){
                    resolve(json)
                }else{
                    var allCustomCourse = json.data;
                    if (allCustomCourse!== undefined && allCustomCourse !== null &&allCustomCourse.length > 0) {
                        dispatch(setMyCustomCourses(allCustomCourse));
                        resolve({re:json.re,data:allCustomCourse})
                    }
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
export let distributeCourse=(course,venue,memberId,demandId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/distributeCourse',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    info:{
                        course,
                        venue,
                        memberId,
                        demandId,
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

            Proxy.postes({
                url: Config.server + '/func/course/fetchClassSchedule',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    classId:classId
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
            Proxy.postes({
                url: Config.server + '/func/course/fetchPersonRelative',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: {

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
            var sessionId = state.user.sessionId;

            Proxy.postes({
                url: Config.server + '/func/course/checkPersonIsMember',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

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
            var selfPersonId = state.user.personInfo.personId;
            var courseCount=info.classCount;

            if(info.isSelfCheck==true){

                var personIdStr = selfPersonId+',';
            }else{
                var personIdStr = '';
            }

            info.persons.map((person)=>{
                personIdStr = personIdStr + person.personId+',';
            })

            Proxy.postes({
                url: Config.server + '/func/allow/classMultiplySignUp',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: {

                    classId:parseInt(info.classId),
                    personId:personIdStr,
                    courseCount:parseInt(courseCount)

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
export let distributeCustomerPlan=(plan,remark)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/allow/createClass ',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    hasCoach:plan.hasCoach,
                    classTrainer:plan.coachId,
                    demandBrief:remark,

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

            Proxy.postes({
                url: Config.server + '/func/allow/deleteMyClassForPhone',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    courses:courses
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

            Proxy.postes({
                url: Config.server + '/func/course/finishCustomCourse',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

                    courseId:courseId
                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'成功'});
                }else{
                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:'不成功'});
                    }
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

            Proxy.postes({
                url: Config.server + '/func/course/cancleCustomCourse',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    courseId:courseId
                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:'成功'});
                }else{
                    if(json.re==-100){
                        resolve(json);
                    }else{
                        resolve({re:-1,data:'不成功'});
                    }
                }
            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        });
    }
}
