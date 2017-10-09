
import { combineReducers } from 'redux';

import tabReducer from './TabReducer';
import userReducer from './UserReducer';
import pageState from './PageStateReducer';
import activityReducer from './ActivityReducer';
import mapReducer from './MapReducer';
import newsThemeReducer from './NewsThemeReducer';
import courseReducer from './CourseReducer';
import coachReducer from './CoachReducer';
import competitionReducer from './CompetitionReducer';
import mycompetitionReducer from './MyCompetationReducer';

import myprofit from './MyProfitReducer';

import noticeReducer from './NoticeReducer';


export default rootReducer = combineReducers({
    tab:tabReducer,
    user:userReducer,
    page:pageState,
    activity:activityReducer,
    map:mapReducer,
    newsTheme:newsThemeReducer,
    course:courseReducer,
    coach:coachReducer,
    competitions:competitionReducer,
    mycompetition:mycompetitionReducer,
    myprofit:myprofit,
    notice:noticeReducer

})
