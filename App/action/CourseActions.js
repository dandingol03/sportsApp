
import Config from '../../config'
import Proxy from '../utils/Proxy'

import {
    DISTRIBUTE_COURSE,
    ON_COURSES_UPDATE,
    ON_COURSES_OF_COACH_UPDATE,
    ON_MY_COURSES_UPDATE,
    DISABLE_MY_COURSES_ONFRESH,
    ON_CUSTOM_COURSE_UPDATE,
    ENABLE_MY_CUSTOM_COURSES_ONFRESH,
    DISABLE_MY_CUSTOM_COURSES_ONFRESH,
    SET_MY_CUSTOM_COURSES,
    DISABLE_COURSES_OF_COACH_ONFRESH,
    ENABLE_COURSES_OF_COACH_ONFRESH,
    ENABLE_STUDENTS_ONFRESH,
    DISABLE_STUDENTS_ONFRESH,
    ON_STUDENTS_UPDATE,
    DISABLE_STUDENTS_COURSE_RECORD_ONFRESH,
    ENABLE_STUDENTS_COURSE_RECORD_ONFRESH


} from '../constants/CourseConstants'
import course from "../reducers/CourseReducer";

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


//显示教练需要教学的课
export let fetchCoursesByCreatorId=(creatorId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/allow/fetchCoursesOfCoach',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    creatorId:creatorId
                }
            }).then((json)=>{
                if(json.re==1)
                {
                    var coursesOfCoach=json.data;
                    dispatch(onCoursesOfCoachUpdate(coursesOfCoach));
                    resolve({re:1,data:coursesOfCoach})
                   //resolve(json);
                }

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}
export let setcoursesOfCoach=(coursesOfCoach)=>{
    return {
        type:SET_COURSES_OF_COACH,
        coursesOfCoach:coursesOfCoach
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
                myCourses:myCourses
            }
        })
    }
}

export let onStudentsUpdate=(students)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_STUDENTS_UPDATE,
                students:students

        })
    }
}
export let onStudentsCourseRecordUpdate=(studentsCourseRecord)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_STUDENTS_COURSE_RECORD_UPDATE,
            studentsCourseRecord:studentsCourseRecord

        })
    }
}

export let disableStudentsCourseRecordOnFresh=()=>{
    return {
        type:DISABLE_STUDNETS_COURSE_RECORD_ONFRESH,
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

export let onCoursesOfCoachUpdate=(courses)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_COURSES_OF_COACH_UPDATE,
            coursesOfCoach:courses
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

export let modifyCourse=(course,venue,memberId,demandId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/modifyCourse',
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

export let fetchStudents=(courseId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/getBadmintonCourseMemberFormListOfCourse',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    courseId:courseId
                }
            }).then((json)=>{
                if(json.re==1)
                {
                    var students=json.data;
                    dispatch(onStudentsUpdate(students));
                    resolve({re:1,data:students})
                    //resolve(json);
                }


            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

export let fetchStudentsCourseRecord=(courseId,memberId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/getCourseMemberClassRecordFormListOfMember',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    courseId:courseId,
                    memberId:memberId
                }
            }).then((json)=>{
                if(json.re==1)
                {
                    var students=json.data;
                    dispatch(onStudentsCourseRecordUpdate(studentsCourseRecord));
                    resolve({re:1,data:studentsCourseRecord})
                    //resolve(json);
                }


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

export let enableCoursesOfCoachOnFresh=()=>{
    return {
        type:ENABLE_COURSES_OF_COACH_ONFRESH,
    }
}

export let enableStudentsOnFresh=()=>{
    return {
        type:ENABLE_STUDENTS_ONFRESH,
    }
}
export let enableStudentsCourseRecordOnFresh=()=>{
    return {
        type:ENABLE_STUDENTS_ONFRESH,
    }
}
export let disableCoursesOfCoachOnFresh=()=>{
    return {
        type:DISABLE_COURSES_OF_COACH_ONFRESH,
    }
}
export let disableStudentsOnFresh=()=>{
    return {
        type:DISABLE_STUDENTS_ONFRESH,
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
