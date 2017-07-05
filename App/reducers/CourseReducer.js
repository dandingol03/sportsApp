
import {
    ON_COURSES_UPDATE,
    ON_CUSTOM_COURSE_UPDATE,

    DISABLE_MY_COURSES_ONFRESH,
    ON_MY_COURSES_UPDATE,

    ENABLE_MY_CUSTOM_COURSES_ONFRESH,
    DISABLE_MY_CUSTOM_COURSES_ONFRESH,
    SET_MY_CUSTOM_COURSES
} from '../constants/CourseConstants';

const initialState = {
    courses:null,
    myCourses:null,
    myCoursesOnFresh:true,
    customCourse:null,
    myCustomCourses:null,
    myCustomCourseOnFresh:true,
};

let course = (state = initialState, action) => {

    switch (action.type) {

        case  ON_COURSES_UPDATE:
            var {courses}=action.payload
            return Object.assign({}, state, {
                courses:courses
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

