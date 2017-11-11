
import {
    ON_COURSES_UPDATE,
    ON_COURSES_OF_COACH_UPDATE,
    ON_CUSTOM_COURSE_UPDATE,
    DISABLE_MY_COURSES_ONFRESH,
    ON_MY_COURSES_UPDATE,
    ENABLE_MY_CUSTOM_COURSES_ONFRESH,
    DISABLE_MY_CUSTOM_COURSES_ONFRESH,
    SET_MY_CUSTOM_COURSES,
    ENABLE_COURSES_OF_COACH_ONFRESH,
    DISABLE_COURSES_OF_COACH_ONFRESH,
    ENABLE_STUDENTS_ONFRESH,
    DISABLE_STUDENTS_ONFRESH,
    ON_STUDENTS_UPDATE,
    DISABLE_STUDETNS_COURSE_RECORD_ONFRESH,
    ENABLE_STUDENTS_COURSE_RECORD_ONFRESH,
    ON_STUDENTS_COURSE_RECORD_UPDATE




} from '../constants/CourseConstants';

const initialState = {
    courses:null,
    myCourses:null,
    myCoursesOnFresh:true,
    customCourse:null,
    myCustomCourses:null,
    myCustomCourseOnFresh:true,
    //教练发布的课
    coursesOfCoach:null,
    coursesOfCoachOnFresh:true,
    //学生
    studentsOfCourse:null,
    studentsOnFresh:true,
    //学生的课程情况
    studentsCourseRecord:null,
    studentsCourseRecordOnFresh:true


};

let course = (state = initialState, action) => {

    switch (action.type) {

        case  ON_COURSES_UPDATE:
            var {courses}=action.payload
            return Object.assign({}, state, {
                courses:courses
            })
        //教练发布的课
        case  ON_COURSES_OF_COACH_UPDATE:
           // var {coursesOfCoach}=action.payload
            return Object.assign({}, state, {
                coursesOfCoach:action.coursesOfCoach
            })
        case ENABLE_COURSES_OF_COACH_ONFRESH:
            return Object.assign({}, state, {
                coursesOfCoachOnFresh:true
            })
        case DISABLE_COURSES_OF_COACH_ONFRESH:
            return Object.assign({}, state, {
                coursesOfCoachOnFresh:false
            })
       //选择这门课的学生
        case  ON_STUDENTS_UPDATE:
            // var {coursesOfCoach}=action.payload
            return Object.assign({}, state, {
                studentsOfCourse:action.students
            })
        case ENABLE_STUDENTS_ONFRESH:
            return Object.assign({}, state, {
                studentsOnFresh:true
            })
        case DISABLE_STUDENTS_ONFRESH:
            return Object.assign({}, state, {
                studentsOnFresh:false
            })

        //这个学生的课程情况
        case  ON_STUDENTS_COURSE_RECORD_UPDATE:
            // var {coursesOfCoach}=action.payload
            return Object.assign({}, state, {
                studentsCourseRecord:action.studentsCourseRecord
            })
        case ENABLE_STUDENTS_COURSE_RECORD_ONFRESH:
            return Object.assign({}, state, {
                studentsCourseRecordOnFresh:true
            })
        case DISABLE_STUDETNS_COURSE_RECORD_ONFRESH:
            return Object.assign({}, state, {
                studentsCourseRecordOnFresh:false
            })


        case DISABLE_MY_COURSES_ONFRESH:
            return Object.assign({},state,{
                myCoursesOnFresh:false
            })
        case ON_MY_COURSES_UPDATE:
            var {myCourses}=action.payload
            return Object.assign({},state,{
                myCourses:myCourses
            })
        case ON_CUSTOM_COURSE_UPDATE:
            var {customCourse}=action.payload
            return Object.assign({},state,{
                customCourse:customCourse
            })
        case SET_MY_CUSTOM_COURSES:
            return Object.assign({}, state, {
                myCustomCourses:action.myCustomCourses
            })
        case ENABLE_MY_CUSTOM_COURSES_ONFRESH:
            return Object.assign({}, state, {
                myCustomCourseOnFresh:true
            })
        case DISABLE_MY_CUSTOM_COURSES_ONFRESH:
            return Object.assign({}, state, {
                myCustomCourseOnFresh:false
            })

        default:
            return state;
    }
}

export default course;

