
import React, { Component } from 'react';
import {
    Dimensions,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    TextInput,
    InteractionManager
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Popover from 'react-native-popover'
import TextInputWrapper from 'react-native-text-input-wrapper'
import MadeCustomCourse from './MadeCustomCourse';
import CreateBadmintonCourse from './CreateBadmintonCourse';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';


var { height, width } = Dimensions.get('window');

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;
import{
    fetchCourses,
    onCoursesUpdate,
    fetchClassSchedule
} from '../../action/CourseActions';

import BadmintonCourseSignUp from './BadmintonCourseSignUp';

class BadmintonCourse extends Component {

    navigate2MadeCustomCourse() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'MadeCustomCourse',
                component: MadeCustomCourse,
                params: {

                }
            })
        }
    }

    //导航至定制（for 教练）
    navigate2BadmintonCourseForCoach() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'CreateBadmintonCourse',
                component: CreateBadmintonCourse,
                params: {

                }
            })
        }
    }

    navigate2CourseSignUp(classInfo)
    {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'BadmintonCourseSignUp',
                component: BadmintonCourseSignUp,
                params: {
                    classInfo
                }
            })
        }
    }


    goBack() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }


    renderRow(rowData, sectionId, rowId) {




        return (
            <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', marginTop: 4 }}
                onPress={()=>{
                    this.props.dispatch(fetchClassSchedule(rowData.classId)).then((json)=>{
                       if(json.re==1)
                       {
                           var classInfo=rowData
                           classInfo.shedules=json.data
                           this.navigate2CourseSignUp(classInfo)
                       }else{

                       }
                    })

                }}
            >
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <View style={{ padding: 4, paddingHorizontal: 12 ,flexDirection:'row',}}>

                        <View style={{padding:4,flex:1,alignItems:'center',flexDirection:'row'}}>
                            <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 15 }}>
                                {rowData.className}
                            </Text>
                        </View>


                        <View style={{padding:4,marginLeft:10,flexDirection:'row',alignItems:'center'}}>
                            <CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
                            <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>
                                {rowData.perName}
                            </Text>
                        </View>
                    </View>

                    <View style={{ padding: 3, paddingHorizontal: 12 }}>
                        <Text style={{ color: '#444', fontSize: 13 }}>
                            {rowData.detail}
                        </Text>
                    </View>

                    <View style={{ paddingTop: 12, paddingBottom: 4, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#f00', fontSize: 12, width: 50 }}>
                            ￥{rowData.cost}
                        </Text>

                        <View style={{ backgroundColor: '#66CDAA', borderRadius: 6, padding: 4, paddingHorizontal: 6, marginLeft: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>
                                {rowData.classCount}课次
                            </Text>
                        </View>

                        <View style={{ backgroundColor: '#ff4730', borderRadius: 6, padding: 4, paddingHorizontal: 6, marginLeft: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>
                                {rowData.venueName}
                            </Text>
                        </View>


                    </View>
                </View>

                <View style={{ width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={'angle-right'} size={34} color="#444" style={{ backgroundColor: 'transparent', marginTop: -10 }} />
                </View>
            </TouchableOpacity>)

    }


    _onRefresh() {
        this.setState({ isRefreshing: true, fadeAnim: new Animated.Value(0) });
        setTimeout(function () {
            this.setState({
                isRefreshing: false,
            });
            Animated.timing(          // Uses easing functions
                this.state.fadeAnim,    // The value to drive
                {
                    toValue: 1,
                    duration: 600,
                    easing: Easing.bounce
                },           // Configuration
            ).start();
        }.bind(this), 2000);
    }

    _handlePress2(index) {

        if (index !== 0) {
            var eventType = this.state.eventTypeButtons[index];
            var eventTypeCode = index;
            this.setState({ event: Object.assign(this.state.event, { type: eventType }) });
        }

    }

    show(actionSheet) {
        this[actionSheet].show();
    }


    showPopover(ref) {
        this.refs[ref].measure((ox, oy, width, height, px, py) => {
            this.setState({
                menuVisible: true,
                buttonRect: { x: px + 20, y: py + 0, width: 200, height: height }
            });
        });
    }


    closePopover() {
        this.setState({ menuVisible: false });
    }

    /**
     * ascend,descend
     * @param props
     */


    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            event: {},
            menuVisible: false,
            memberLevelButtons: ['取消', '无', '体育本科', '国家一级运动员', '国家二级运动员', '国家三级运动员'],
            eventTypeButtons: ['取消', '羽毛球单打', '羽毛球双打', '羽毛球混双', '基础练习'],
            filter: {
                cost: 'ascend'
            }
        };
    }

    render() {


        var displayArea = { x: 5, y: 20, width: width, height: height - 25 };


        var courseList = null
        if (this.props.courses && this.props.courses.length > 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

            var sortedCourses = null;
            //升序
            if (this.state.filter.cost == 'ascend') {
                sortedCourses = this.props.courses.sort((a, b) => {
                    if (a.cost > b.cost)
                        return 1;
                    else
                        return -1;
                });
            } else if (this.state.filter.cost == 'descend') {
                sortedCourses = this.props.courses.sort((a, b) => {
                    if (a.cost > b.cost)
                        return -1;
                    else
                        return 1;
                });
            }


            courseList = (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="拉取课程..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                >
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(sortedCourses)}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>
            );
        }

        var actions=[]
        if(this.props.userType==0)//用户
            actions.push({value:'课程定制',show:OPTION_NEVER})
        else
            actions.push({value:'创建课程',show:OPTION_NEVER})

        return (
            <View style={styles.container}>
                {/*tabbar部分*/}

                <Toolbar width={width} title="课程制定" navigator={this.props.navigator}
                         actions={actions}
                         onPress={(i)=>{
                             if(this.props.userType==0)
                                  this.navigate2MadeCustomCourse()
                             else
                                 this.navigate2BadmintonCourseForCoach()

                         }}
                >
                    <View style={{ flex: 1, width: width, backgroundColor: '#66CDAA' }}>


                        {/*搜索框*/}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
                            <View style={{ flexDirection: 'row', width: width * 7 / 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', borderRadius: 8 }}>

                                <TextInputWrapper
                                    search={true}
                                    textInputStyle={{ marginLeft: 15, fontSize: 14, color: '#222', }}
                                    iconStyle={{ size: 22 }}
                                    placeholder="按教练名进行搜索"
                                    val={this.state.coachName}
                                    onChangeText={(coachName) => {
                                    this.setState({ coachName: coachName })
                                }}
                                    onConfirm={() => {
                                    alert('dw')
                                }}
                                />

                            </View>

                        </View>

                        {/*筛选*/}
                        <View style={{
                        height: 45 * height / 736, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 8,
                        borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: '#fff'
                    }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                                    <Text style={{ fontSize: 13, color: '#008B00' }}>默认</Text>
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end', alignItems: 'center', }}
                                                  onPress={() => {
                                    if (this.state.filter.cost == 'ascend')//升序
                                    {
                                        this.setState({ filter: Object.assign(this.state.filter, { cost: 'descend' }) })
                                    } else {
                                        //降序
                                        this.setState({ filter: Object.assign(this.state.filter, { cost: 'ascend' }) })
                                    }
                                }}
                                >
                                    <Text style={{ fontSize: 13 }}>花销</Text>
                                    {
                                        this.state.filter.cost == 'ascend' ?
                                            <View style={{ marginLeft: 5 }}>
                                                <Icon name={'caret-up'} size={15} color="#008B00" />
                                                <Icon name={'caret-down'} size={15} color="#aaa" />
                                            </View> :
                                            <View style={{ marginLeft: 5 }}>
                                                <Icon name={'caret-up'} size={15} color="#aaa" />
                                                <Icon name={'caret-down'} size={15} color="#008B00" />
                                            </View>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 10 }}></View>
                        </View>

                        {/*课程列表*/}

                        <Animated.View style={{ flex: 1, padding: 4, opacity: this.state.fadeAnim, backgroundColor: '#fff' }}>
                            {courseList}
                        </Animated.View>


                    </View>
                </Toolbar>

            </View>
        )
    }

    componentDidMount()
    {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(fetchCourses()).then((json)=>{
                if(json.re==1)
                {
                    this.props.dispatch(onCoursesUpdate(json.data))
                }
            })
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    popoverContent: {
        width: 100,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText: {
        color: '#ccc',
        fontSize: 14
    }
});

const mapStateToProps = (state, ownProps) => {

    const props = {
        userType: parseInt(state.user.usertype),
        courses:state.course.courses
    }
    return props
}


export default connect(mapStateToProps)(BadmintonCourse);

