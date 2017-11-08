
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
import TextInputWrapper from 'react-native-text-input-wrapper'
import CreateBadmintonCourse from './CreateBadmintonCourse';
import CreateCustomerPlan from './CreateCustomerPlan';
import CustomerCourseList from './CustomerCourseList';
import {Toolbar,OPTION_SHOW,OPTION_NEVER,ACTION_ADD} from 'react-native-toolbar-wrapper'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';


var { height, width } = Dimensions.get('window');

import{
    fetchCourses,
    fetchCoursesByCreatorId,
    onCoursesOfCoachUpdate,
    onCoursesUpdate,
} from '../../action/CourseActions';

import {getAccessToken,} from '../../action/UserActions';

import BadmintonCourseSignUp from './BadmintonCourseSignUp';

class BadmintonCourseRecord extends Component {

    //导航至定制（for 教练）
    navigate2BadmintonCourseForCoach() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'CreateBadmintonCourse',
                component: CreateBadmintonCourse,
                params: {
                    setMyCourseList:this.setMyCourseList.bind(this)
                }
            })
        }
    }

    //导航至定制（for 用户）
    navigate2BadmintonCourseForUser() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'CreateCustomerPlan',
                component: CreateCustomerPlan,
                params: {

                }
            })
        }
    }

    //导航至定制列表（for 教练）
    navigate2CustomCourseList(){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name:'CustomerCourseList',
                component:CustomerCourseList,
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
                    classInfo,
                    setMyCourseList:this.setMyCourseList.bind(this)
                }
            })
        }
    }

    navigate2CourseRecord()
    {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'BadmintonCourseRecord',
                component: BadmintonCourseRecord,
                params: {

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

    setMyCourseList()
    {
        this.props.dispatch(fetchCoursesByCreatorId(creatorId)).then((json)=>{
            if(json.re==1)
            {
                this.props.dispatch(onCoursesOfCoachUpdate(json.data))
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }
            }
        })
    }

    renderRow(rowData, sectionId, rowId) {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', marginTop: 4 }}
                              onPress={()=>{
                                  this.navigate2CourseSignUp(rowData);

                              }}
            >
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <View style={{ padding: 4, paddingHorizontal: 12 ,flexDirection:'row',}}>

                        <View style={{padding:4,flex:1,alignItems:'center',flexDirection:'row'}}>
                            <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 15 }}>
                                {rowData.courseName}
                            </Text>
                        </View>


                        <View style={{padding:4,marginLeft:10,flexDirection:'row',alignItems:'center'}}>
                            <CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
                            <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>
                                {rowData.creatorName}教练
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
                                {rowData.unitName}
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
        var creatorId=this.props.creatorId;
        this.props.dispatch(fetchCoursesByCreatorId(creatorId)).then((json)=>{
            if(json.re==1)
            {
                this.props.dispatch(onCoursesOfCoachUpdate(json.data))
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }
            }
        })

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

    /**
     * ascend,descend
     * @param props
     */

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            menuVisible: false,
            filter: {
                cost: 'ascend'
            }
        };
    }

    render() {

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
        if(this.props.userType=='0')//用户
        {
            // actions.push({icon:ACTION_ADD,value:'xxx',show:OPTION_SHOW})
            actions.push({value:'定制课程',show:OPTION_NEVER})
        }
        else
        {
            actions.push({value:'创建课程',show:OPTION_NEVER});
            actions.push({value:'课程定制',show:OPTION_NEVER});//教练作为用户
            actions.push({value:'查看定制列表',show:OPTION_NEVER});
            actions.push({value:'上课记录',show:OPTION_NEVER});

        }

        return (
            <View style={styles.container}>
                {/*tabbar部分*/}

                <Toolbar width={width} title="课程制定" navigator={this.props.navigator}
                         actions={actions}
                         onPress={(i)=>{
                             if(this.props.userType=='1'){
                                 if(i==0)
                                 {
                                     this.navigate2BadmintonCourseForCoach();
                                 }
                                 /* if(i==1)
                                 {
                                     this.navigate2BadmintonCourseForUser();
                                 }*/
                                 if(i==1)
                                 {
                                     this.navigate2CustomCourseList();
                                 }
                                 if(i==2)
                                 {
                                     this.navigate2CourseRecord();
                                 }

                             }else{
                                 this.navigate2BadmintonCourseForUser()
                             }

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
            this.props.dispatch(fetchCoursesByCreatorId(this.props.creatorId)).then((json)=>{
                if(json.re==1)
                {
                    this.props.dispatch(onCoursesOfCoachUpdate(json.data))
                }else{
                    if(json.re==-100){
                        this.props.dispatch(getAccessToken(false));
                    }
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
        userType: state.user.usertype.perTypeCode,
        courses:state.course.courses
    }
    return props
}


export default connect(mapStateToProps)(BadmintonCourseRecord);

