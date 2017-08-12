
import {
    UPDATE_NEWS_THEME,
    UPDATE_NEWS_INFO
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
        case  UPDATE_NEWS_INFO:
            var {news}=action.payload
            return Object.assign({}, state, {
                news:news
            })
        default:
            return state;
    }
}

export default newsTheme;

