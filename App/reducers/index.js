
import { combineReducers } from 'redux';

import tabReducer from './TabReducer';
import userReducer from './UserReducer';
import pageState from './PageStateReducer';
import activityReducer from './ActivityReducer';
import mapReducer from './MapReducer';
import newsThemeReducer from './NewsThemeReducer';
import courseReducer from './CourseReducer';
import coachReducer from './CoachReducer';
import competitionsReducer from './CompetitionReducer';


export default rootReducer = combineReducers({
    tab:tabReducer,
    user:userReducer,
    page:pageState,
    activity:activityReducer,
    map:mapReducer,
    newsTheme:newsThemeReducer,
    course:courseReducer,
    coach:coachReducer,
    competitions:competitionsReducer
})
