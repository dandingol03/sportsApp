
import {
    ON_COACH_UPDATE,
    SET_COACH
} from '../constants/CoachConstants';

const initialState = {
    coaches:null
};

let coach = (state = initialState, action) => {

    switch (action.type) {

        case  ON_COACH_UPDATE:
            var {coaches}=action.payload
            return Object.assign({}, state, {
                coaches:coaches
            })

        case  SET_COACH:
            return Object.assign({}, state, {
                coaches:action.coaches
            })

        default:
            return state;
    }
}

export default coach;

