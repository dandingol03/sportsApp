
import {
    UPDATE_NEWS_THEME
} from '../constants/NewsConstants';

const initialState = {
    news:null
};

let newsTheme = (state = initialState, action) => {

    switch (action.type) {

        case  UPDATE_NEWS_THEME:
            var {news}=action.payload
            return Object.assign({}, state, {
                news:news
            })

        default:
            return state;
    }
}

export default newsTheme;

