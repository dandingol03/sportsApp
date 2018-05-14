
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
    ENABLE_STUDENTS_COURSE_RECORD_ONFRESH,
    ON_STUDENTS_COURSE_RECORD_UPDATE,
    ENABLE_STUDENTS_PAY_ONFRESH,
    DISABLE_STUDENTS_PAY_ONFRESH,
    ON_STUDENTS_PAY_UPDATE,
    ON_COURSE_CLASS_UPDATE,
    ENABLE_COURSE_CLASS_ONFRESH,
    DISABLE_COURSE_CLASS_ONFRESH,

    ON_GROUP_CONTENTS_UPDATE,
    ENABLE_GROUP_CONTENTS_ONFRESH,
    DISABLE_GROUP_CONTENTS_ONFRESH,

    ON_CLASS_MEMBER_UPDATE,
    DISABLE_CLASS_MEMBER_ONFRESH,
    ENABLE_CLASS_MEMBER_ONFRESH,

    ON_ORDER_MEMBER_UPDATE,
    DISABLE_ORDER_MEMBER_ONFRESH,
    ENABLE_ORDER_MEMBER_ONFRESH,

    ON_COURSE_GROUP_UPDATE





} from '../constants/CourseConstants'
import course from "../reducers/CourseReducer";


export let checkCourseMemberPay=(member)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/allow/establishEveryDayClass',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    course:course

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

export let establishEveryDayClass=(course)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/allow/establishEveryDayClass',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    course:course

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



export let updateIsHasPhotoStatus=(memberId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/allow/updateIsHasPhotoStatus',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                        memberId:parseInt(memberId)

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

//显示课程分组
export let fetchCoureseGroupByCourseId=(course,memberId1)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/allow/getGroupContents',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    course:course,
                    memberId:memberId1
                }
            }).then((json)=>{
                if(json.re==1)
                {
                    var groupContents=json.data;
                    dispatch(onGroupContentsUpdate(groupContents));
                    resolve({re:1,data:groupContents})
                    //resolve({re:1,data:groupContents})
                    //resolve(json);

                }

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

export let fetchCourseClass=(courseId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/getBadmintonCourseClassFormListOfCourse',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    courseId:courseId
                }
            }).then((json)=>{
                if(json.re==1)
                {
                    var courseClass=json.data;
                    dispatch(onCourseClassUpdate(courseClass));
                    resolve({re:1,data:courseClass})
                    //resolve(json);
                }

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

export let addClass=(courseId,yard,unitId,classWeek,startTime,endTime,content)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/saveOrUpdateBadmintonCourseClass',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    //classId:classId,
                    courseId:courseId,
                    yard:yard,
                    unitId:unitId,
                    classWeek:classWeek,
                    startTime:startTime,
                    endTime:endTime,
                    content:content
                }
            }).then((json)=>{
                if(json.re==1)
                {
                    resolve(json)
                }

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

export let editClass=(classId,courseId,yard,unitId,classWeek,startTime,endTime,content)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/saveOrUpdateBadmintonCourseClass',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    classId:classId,
                    courseId:courseId,
                    unitId:unitId,
                    venue:venue,
                    classWeek:classWeek,
                    startTime:startTime,
                    endTime:endTime,
                    content:content,
                    indexNum:0
                }
            }).then((json)=>{
                if(json.re==1)
                {
                    resolve(json)
                }

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}

export let fetchOrderMember=(courseId)=> {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {

            var state = getState();

            Proxy.postes({
                url: Config.server + '/func/allow/fetchOrderMember',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    courseId: courseId,
                }
            }).then((json) => {
                if (json.re == 1) {
                    var OrderMember = json.data;
                    dispatch(onOrderMemberUpdate(OrderMember));
                    resolve({re: 1, data: OrderMember})
                    //resolve(json);
                }

            }).catch((e) => {
                alert(e);
                reject(e);
            })

        })
    }
}

export let fetchClassMember=(courseId,classId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/getBadmintonCourseClassRecordFormListOfClass',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    courseId:courseId,
                    classId:classId
                }
            }).then((json)=>{
                if(json.re==1)
                {
                    var classMember=json.data;
                    dispatch(onClassMemberUpdate(classMember));
                    resolve({re:1,data:classMember})
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

export let onClassMemberUpdate=(classMember)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_CLASS_MEMBER_UPDATE,
            classMember:classMember

        })
    }
}



    export let onOrderMemberUpdate=(OrderMember)=>{
        return (dispatch,getState)=>{
            dispatch({
                type:ON_ORDER_MEMBER_UPDATE,
                OrderMember:OrderMember

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

export let onCourseClassUpdate=(courseClass)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_COURSE_CLASS_UPDATE,
            courseClass:courseClass

        })
    }
}

export let disableStudentsCourseRecordOnFresh=()=>{
    return {
        type:DISABLE_STUDENTS_COURSE_RECORD_ONFRESH,
    }
}


export let disableMyCoursesOnFresh=()=>{
    return {
        type:DISABLE_MY_COURSES_ONFRESH,
    }
}
export let disableCourseClassOnFresh=()=>{
    return {
        type:DISABLE_COURSE_CLASS_ONFRESH,
    }
}

export let disableClassMemberOnFresh=()=>{
    return {
        type:DISABLE_CLASS_MEMBER_ONFRESH,
    }
}

    export let disableOrderMemberOnFresh=()=>{
        return {
            type:DISABLE_ORDER_MEMBER_ONFRESH,
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

export let onGroupContentsUpdate=(groupContents)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_GROUP_CONTENTS_UPDATE,
            groupContents:groupContents
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

export let enableCourseClassOnFresh=()=>{
    return {
        type:ENABLE_COURSE_CLASS_ONFRESH,
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

export let saveOrUpdateBadmintonCourseClassRecords=(classMember,courseId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/saveOrUpdateBadmintonCourseClassRecords',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    classMember:classMember,
                    courseId:courseId

                }
            }).then((json)=>{
                if(json.re==-100){
                    resolve(json)
                }else{

                        resolve(json)

                }
            }).catch((e)=>{
                alert("此时不是签到时间");
                reject(e);
            })

        })
    }
}

export let SignUpOrderMember=(OrderMember,courseId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/SignUpOrderMember',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    OrderMember:OrderMember,
                    courseId:courseId

                }
            }).then((json)=>{
                if(json.re==-100){
                    resolve(json)
                }else{

                    resolve(json)

                }
            }).catch((e)=>{
                alert("此时不是签到时间");
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
export let distributeCourse=(course,venue,memberId,coach,demandId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();
            var venue1=null;
            if(venue==null){
                venue1="未选"
            }else{
                venue1=venue;
            }
            var coachId=null;
            coachId=coach.substring(0,coach.length-1);
            var indexNum=0;
            Proxy.postes({
                url: Config.server + '/func/course/distributeCourse',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    info:{
                        course ,
                        venue,
                        memberId,
                        demandId,
                        indexNum,
                        coachId
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
                        indexNum:0,
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


export let modifyClassDetail=(classDetail)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/modifyClassDetail',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    info:{
                        classDetail
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

export let ShowSchemePersons=(course,memberId,groupType)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/allow/ShowSchemePersons',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    course:course,
                    memberId:memberId,
                    groupType:groupType
                }
            }).then((json)=>{
                if(json.re==1)
                {
                    var students=json.data;
                    resolve({re:1,data:students})

                }


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
                    var studentsCourseRecord=json.data;
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

export let enableGroupContentsOnFresh=()=>{
    return {
        type:ENABLE_GROUP_CONTENTS_ONFRESH,
    }
}

export let enableStudentsOnFresh=()=>{
    return {
        type:ENABLE_STUDENTS_ONFRESH,
    }
}
export let enableStudentsCourseRecordOnFresh=()=>{
    return {
        type:ENABLE_STUDENTS_COURSE_RECORD_ONFRESH,
    }
}
export let disableCoursesOfCoachOnFresh=()=>{
    return {
        type:DISABLE_COURSES_OF_COACH_ONFRESH,
    }
}

export let disableGroupContentshOnFresh=()=>{
    return {
        type:DISABLE_GROUP_CONTENTS_ONFRESH,
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

//获得组成员
export let getGroupMember=(courseId,perName)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/allow/getCourseGroup',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    courseId:courseId,
                    //learnerId:learnerId
                    perName:perName
                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:json});
                    var courseGroup=json.data;
                    //dispatch(onStudentsPayUpdate(studentsPay));
                    dispatch(onCourseGroupUpdate(courseGroup));
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

//获得组成员
export let createCourseGroup=(courseId,joinCount)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/allow/createCourseGroup',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    courseId:courseId,
                    joinCount:joinCount
                }
            }).then((json)=>{
                if (json.re == 1) {
                    resolve({re:1,data:json});
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

export let fetchStudentsPay=(courseId,memberId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/course/getBadmintonCoursePayFormListOfMember',
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
                    var studentsPay=json.data;
                    dispatch(onStudentsPayUpdate(studentsPay));
                    resolve({re:1,data:studentsPay})
                    //resolve(json);
                }


            }).catch((e)=>{
                alert(e);
                reject(e);
            })



        })
    }
}

export let enableStudentsPayOnFresh=()=>{
    return {
        type:ENABLE_STUDENTS_PAY_ONFRESH,
    }
}

export let enableClassMemberOnFresh=()=>{
    return {
        type:ENABLE_CLASS_MEMBER_ONFRESH,
    }
}

    export let enableOrderMemberOnFresh=()=>{
        return {
            type:ENABLE_ORDER_MEMBER_ONFRESH,
        }
    }


export let disableStudentsPayOnFresh=()=>{
    return {
        type:DISABLE_STUDENTS_PAY_ONFRESH,
    }
}

export let onStudentsPayUpdate=(studentsPay)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_STUDENTS_PAY_UPDATE,
            studentsPay:studentsPay

        })
    }

}

export let onCourseGroupUpdate=(courseGroup)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_COURSE_GROUP_UPDATE,
            courseGroup:courseGroup

        })
    }

}