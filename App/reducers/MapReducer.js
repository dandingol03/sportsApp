
import {
    UPDATE_MAP_CENTER
} from '../constants/MapConstants';

const initialState = {
    center: {
        latitude: 36.67205,
        longitude: 117.14501
    },
};

let user = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_MAP_CENTER:
            var {center}=action.payload
            return Object.assign({}, state, {
                center: center,
            })

        default:
            return state;
    }
}

export default user;
