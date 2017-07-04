
import {
    ON_COURSES_UPDATE,
    DISABLE_MY_COURSES_ONFRESH,
    ON_MY_COURSES_UPDATE,
    ON_CUSTOM_COURSE_UPDATE,
} from '../constants/CourseConstants';

const initialState = {
    courses:null,
    myCourses:null,
    myCoursesOnFresh:true,
    customCourse:null,
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
        default:
            return state;
    }
}

export default course;

