
import {
    ON_COURSES_UPDATE
} from '../constants/CourseConstants';

const initialState = {
    courses:null
};

let course = (state = initialState, action) => {

    switch (action.type) {

        case  ON_COURSES_UPDATE:
            var {courses}=action.payload
            return Object.assign({}, state, {
                courses:courses
            })

        default:
            return state;
    }
}

export default course;

