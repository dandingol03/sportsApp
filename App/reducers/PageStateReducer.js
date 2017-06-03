import {
    PAGE_REGISTER,
    PAGE_LOGIN,
    PAGE_PASSWORDFORGET,
    UPDATE_PAGE_STATE,
    UPDATE_NAVIGATOR
} from '../constants/PageStateConstants';

const initialState = {
    state:PAGE_LOGIN,
    navigators:{
        home:null,
        my:null,
        chat:null
    }
};

let pageState = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_PAGE_STATE:
            return Object.assign({}, state, {
                state:action.payload.state
            })
            break;
        default:
            return state;
    }
}

export default pageState;

