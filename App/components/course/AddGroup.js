
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
    InteractionManager,
    Alert
} from 'react-native';

import PopupDialog,{ScaleAnimation,DefaultAnimation,SlideAnimation} from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import TextInputWrapper from 'react-native-text-input-wrapper'
import CreateBadmintonCourse from './CreateBadmintonCourse';
import CreateCustomerPlan from './CreateCustomerPlan';
import CustomerCourseList from './CustomerCourseList';
import ModifyDistribution from './ModifyDistribution';
import StudentInformation from './StudentInformation';
import RecordClass from './RecordClass';
import SignUpModal from '../my/modal/SignUpModal'

import {Toolbar,OPTION_SHOW,OPTION_NEVER,ACTION_ADD} from 'react-native-toolbar-wrapper'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
var { height, width } = Dimensions.get('window');
import {
    fetchCourses,
    fetchCoursesByCreatorId,
    onCoursesOfCoachUpdate,
    onCoursesUpdate,
    disableGroupContentshOnFresh, enableCoursesOfCoachOnFresh,
    fetchCoureseGroupByCourseId, enableGroupContentsOnFresh
} from '../../action/CourseActions';

import {getAccessToken, onUsernameUpdate, updateUsername,} from '../../action/UserActions';

import BadmintonCourseSignUp from './BadmintonCourseSignUp';
import CoachListModal from '../my/modal/CoachListModal';
class AddGroup extends Component {

    //导航至定制（for 教练）
    navigate2AddCourse() {
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

    navigate2ModifyDistribution(course){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'ModifyDistribution',
                component: ModifyDistribution,
                params: {
                    course:course
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

    navigate2RecordClass(rowData){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name:'RecordClass',
                component:RecordClass,
                params: {
                    courseId:rowData.courseId,
                    course:rowData
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

    navigate2AddClass(){
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

    navigate2StudentInformation(courseId){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'StudentInformation',
                component: StudentInformation,
                params: {
                    courseId:courseId
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
            <TouchableOpacity style={{ flexDirection: 'column', borderBottomWidth: 1, borderColor: '#ddd', marginTop: 4 }}
                              onPress={()=>{


                              }}
            >
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <View style={{ padding: 4, paddingHorizontal: 12 ,flexDirection:'row',}}>

                        <View style={{padding:4,flex:1,alignItems:'center',flexDirection:'row'}}>
                            <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 15 }}>
                                {this.props.course.courseName}
                            </Text>
                        </View>

                        {
                            this.props.course.coachId!==null?
                            <View style={{padding:4,marginLeft:10,flexDirection:'row',alignItems:'center'}}>
                                <CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
                                <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>
                                    {this.props.course.coachId}教练
                                </Text>
                            </View>:
                                <TouchableOpacity style={{padding:4,marginRight:15,flexDirection:'row',alignItems:'center'}}

                                                                          onPress={() => {
                                                                              //this.navigate2RecordClass(rowData);
                                                                              this.showCoachListDialog();
                                                                              //this.setState({coachId:rowData.coachId});
                                                                              //Alert.alert("asd");
                                                                          }
                                                                          }>
                                    {/*<Text style={{color: '#66CDAA', fontSize: 12}}>1</Text>*/}
                                    <Icon name={'plus-circle'} size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
                                </TouchableOpacity>

                        }

                    </View>

                    <View style={{ padding: 3, paddingHorizontal: 12 }}>
                        <Text style={{ color: '#444', fontSize: 13 }}>
                            上课内容：{rowData.content}
                        </Text>
                    </View>

                    <View style={{ paddingTop: 12, paddingBottom: 4, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#f00', fontSize: 12, width: 50 }}>
                            {rowData.groupName}
                        </Text>

                        <View style={{ backgroundColor: '#66CDAA', borderRadius: 6, padding: 4, paddingHorizontal: 6, marginLeft: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>
                                已经上课次数：{rowData.groupType}
                            </Text>
                        </View>

                        {/*<View style={{ backgroundColor: '#ff4730', borderRadius: 6, padding: 4, paddingHorizontal: 6, marginLeft: 10 }}>*/}
                            {/*<Text style={{ color: '#fff', fontSize: 12 }}>*/}
                                {/*{rowData.unitName}*/}
                            {/*</Text>*/}
                        {/*</View>*/}
                    </View>
                </View>

                {/*<View style={{ width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={'angle-right'} size={34} color="#444" style={{ backgroundColor: 'transparent', marginTop: -10 }} />
                </View>*/}

                <View style={{flex:1,flexDirection:'row',padding:10,borderTopWidth:1,borderColor:'#ddd'}}>
                    {<View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>

                    </View>}

                    <TouchableOpacity style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: '#66CDAA',
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 6,
                        marginRight:30
                    }}


                                      onPress={() => {
                                          this.navigate2RecordClass(rowData);
                                      }
                                      }>
                        <Text style={{color: '#66CDAA', fontSize: 12}}>上课记录</Text>
                    </TouchableOpacity>
                </View>

                <PopupDialog
                    ref={(popupDialog) => {
                        this.CoachListDialog = popupDialog;
                    }}
                    dialogAnimation={scaleAnimation}
                    actions={[]}
                    width={0.8}
                    height={0.3}
                >
                    <CoachListModal
                        val={this.props.SignUp}
                        onClose={()=>{
                            this.SignUpDialog.dismiss();
                        }}
                        onConfirm={(val)=>{
                            //Alert.alert("asd");
                            // this.props.dispatch(getGroupMember(this.state.courseId,parseInt(val)))
                            //     .then((json)=>{
                            //
                            //     })
                            //     .catch((e)=>{
                            //
                            //     })
                        }}
                    />

                </PopupDialog>
            </TouchableOpacity>
        )



    }

    fetchGroupsByContent(courseId){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        this.props.dispatch(fetchCoureseGroupByCourseId(courseId)).then((json)=> {
            if(json.re==-100){
                this.props.dispatch(getAccessToken(false));
            }
            this.props.dispatch(disableGroupContentshOnFresh());
            this.setState({doingFetch:false,isRefreshing:false})
        }).catch((e)=>{
            this.props.dispatch(disableGroupContentshOnFresh());
            this.setState({doingFetch:false,isRefreshing:false});
            alert(e)
        });
    }

    _onRefresh() {
        this.setState({isRefreshing: true, fadeAnim: new Animated.Value(0)});
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
        }.bind(this), 500);
        this.props.dispatch(enableGroupContentsOnFresh());
    }






    constructor(props) {
        super(props);
        this.state = {
            doingFetch:false,
            isRefreshing:false,
            fadeAnim:new Animated.Value(1),
            courseId:null,
            data:[{type:"初级班",coach:"吴教练",content:"发球",groupNum:"10人",isHaveCoach:true},
                {type:"初级班",coach:"吴教练",content:"发球",groupNum:"10人",isHaveCoach:false},
                {type:"初级班",coach:"吴教练",content:"发球",groupNum:"10人",isHaveCoach:false},
                {type:"初级班",coach:"吴教练",content:"发球",groupNum:"10人",isHaveCoach:true},
                {type:"初级班",coach:"吴教练",content:"发球",groupNum:"10人",isHaveCoach:true}],
        }

    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }
    showUserNameDialog() {
        this.SignUpDialog.show();
    }
    showCoachListDialog() {
        //this.setState({courseId:val});
        this.CoachListDialog.show();
    }
    render() {
        var groupContentsListView=null;
        var {groupContents,groupContentsOnFresh}=this.props;
        if(groupContentsOnFresh==true)
        {
            if(this.state.doingFetch==false)
                this.fetchGroupsByContent(this.props.course.courseId);
        }else{
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if ( groupContents!== undefined && groupContents !== null && groupContents.length > 0)
            {
                groupContentsListView = (
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(groupContents)}
                        renderRow={this.renderRow.bind(this)}
                    />
                );
            }
        }



        return (
            <View style={styles.container}>
                <Toolbar width={width} title="上课记录" actions={[]} navigator={this.props.navigator}>

                    {<View style={{flex:5,backgroundColor:'#eee'}}>
                        <Animated.View style={{opacity: this.state.fadeAnim,height:height-150,paddingTop:5,paddingBottom:5,}}>
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this._onRefresh.bind(this)}
                                        tintColor="#9c0c13"
                                        title="刷新..."
                                        titleColor="#9c0c13"
                                        colors={['#ff0000', '#00ff00', '#0000ff']}
                                        progressBackgroundColor="#ffff00"
                                    />
                                }
                            >
                                {groupContentsListView}
                                {
                                    groupContentsListView==null?
                                        null:
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                                        </View>
                                }

                            </ScrollView>

                        </Animated.View>
                    </View>}



                </Toolbar>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#66CDAA',
                    position:'absolute',bottom:8}}>
                    <TouchableOpacity style={{flex:1,backgroundColor:'#66CDAA',justifyContent:'center',alignItems: 'center',
                        padding:10,margin:5}}/* onPress={()=>{this.navigate2MyActivity(myEvents,'我的活动');}}*/>
                        {/* <Text style={{color:'#fff',}}>我发起的活动</Text>*/}
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,backgroundColor:'#66CDAA',justifyContent:'center',alignItems: 'center',
                        padding:10,margin:5}} /*onPress={()=>{this.navigate2AddClass();}}*/>
                        {/* <Text style={{color:'#fff',}}>我要添加课程</Text>*/}
                    </TouchableOpacity>
                </View>
                <View style={{height:50,width:50,borderRadius:25,position:'absolute',bottom:8,left:width*0.5-25}}>
                    <TouchableOpacity style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',padding:5,
                        borderWidth:1,borderColor:'#eee',borderRadius:50}}
                                      onPress={()=>{this.navigate2AddCourse();}}>
                        <Icon name={'plus-circle'} size={35} color='#66CDAA'/>
                    </TouchableOpacity>
                </View>

                {/*保存用户名*/}
                <PopupDialog
                    ref={(popupDialog) => {
                        this.SignUpDialog = popupDialog;
                    }}
                    dialogAnimation={scaleAnimation}
                    actions={[]}
                    width={0.8}
                    height={0.3}
                >

                    <SignUpModal
                        val={this.props.SignUp}
                        onClose={()=>{
                            this.SignUpDialog.dismiss();
                        }}
                        onConfirm={(val)=>{
                            // if(val!=this.props.SignUp)
                            // {
                            //     //TODO:进行用户名的保存
                            //     this.props.dispatch(updateUsername(val)).then((json)=>{
                            //         if(json.re==1)
                            //         {
                            //             this.props.dispatch(onUsernameUpdate(val))
                            //         }
                            //         this.usernameDialog.dismiss();
                            //     })
                            // }
                        }}
                    />

                </PopupDialog>
            </View>
        )
    }

    componentDidMount()
    {

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


module.exports = connect(state=>({
        userType: state.user.usertype.perTypeCode,
        groupContents:state.course.groupContents,
        groupContentsOnFresh:state.course.groupContentsOnFresh,
        creatorId:state.user.personInfo.personId
    })
)(AddGroup);