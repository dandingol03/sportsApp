
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
    InteractionManager, Alert
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import TextInputWrapper from 'react-native-text-input-wrapper'
import CreateBadmintonCourse from './CreateBadmintonCourse';
import CreateCustomerPlan from './CreateCustomerPlan';
import CustomerCourseList from './CustomerCourseList';
import ModifyDistribution from './ModifyDistribution';
import StudentsCourseRecord from './StudentsCourseRecord';
import StudentPayInformation from './StudentPayInformation';
import {Toolbar,OPTION_SHOW,OPTION_NEVER,ACTION_ADD} from 'react-native-toolbar-wrapper'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';


var { height, width } = Dimensions.get('window');

import {
    onStudentsUpdate,
    enableStudentsOnFresh,
    disableStudentsOnFresh,
    fetchStudents,
    updateIsHasPhotoStatus
} from '../../action/CourseActions';

import {getAccessToken,} from '../../action/UserActions';

import BadmintonCourseSignUp from './BadmintonCourseSignUp';
import FaceCollectionModule from '../../native/AddFacePhoto'

class FaceCollection extends Component {

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

    navigate2StudentPayInformation(courseId,memberId){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'StudentPayInformation',
                component: StudentPayInformation,
                params: {
                    courseId:courseId,
                    memberId:memberId
                }
            })
        }
    }

    navigate2StudentsCourseRecord(courseId,memberId)
    {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'StudentsCourseRecord',
                component: StudentsCourseRecord,
                params: {
                    courseId:courseId,
                    memberId:memberId

                }
            })
        }
    }

    goBack() {
        const { navigator } = this.props;
        if (navigator) {
            this.props.dispatch(enableStudentsOnFresh())
            navigator.pop();

        }
    }

    renderRow(rowData, sectionId, rowId) {
        var date=new Date(rowData.joinTime);
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var joinTime=year+'年'+month+'月'+day+'日';
        /* var date1=new Date(rowData.endTime);
         var year1=date1.getFullYear();
         var month1=date1.getMonth()+1;
         var day1=date1.getDate();
         var endTime=year1+'年'+month1+'月'+day1+'日';*/
        var condition=null;
        if(rowData.state==1)
            condition="报名"
        else
            condition="结业"

        return (
            <TouchableOpacity style={{ flexDirection: 'column', borderBottomWidth: 1, borderColor: '#ddd', marginTop: 4 }}
                              onPress={()=>{


                              }}
            >
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>




                    <View style={{ padding: 4, paddingHorizontal: 12 ,flexDirection:'row',}}>

                        <View style={{padding:4,flex:1,alignItems:'center',flexDirection:'row'}}>
                            <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 15 }}>
                                学员身份证号：{rowData.perIdCard}
                            </Text>
                        </View>

                        {rowData.perName!=null?
                            <View style={{padding:4,marginLeft:10,flexDirection:'row',alignItems:'center'}}>
                                <CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
                                <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>
                                    {rowData.perName}
                                </Text>
                            </View>:
                            <View style={{padding:4,marginLeft:10,flexDirection:'row',alignItems:'center'}}>
                                <CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
                                <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>
                                    {rowData.perName}
                                </Text>
                            </View>
                        }
                    </View>



                    {   rowData.isHasPhoto== 0?
                        <View style={{flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                                照片采集状态：照片未采集
                            </Text>
                        </View>:                    <View style={{flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                                照片采集状态：照片已采集
                            </Text>
                        </View>
                    }

                </View>


                <View style={{flex:1,flexDirection:'row',padding:10,borderTopWidth:1,borderColor:'#ddd'}}>

                    {<View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>

                    </View>}

                    {
                        rowData.isHasPhoto==0?
                            <TouchableOpacity style={{
                                flex: 1,
                                padding: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 6,
                                marginLeft:30,
                                backgroundColor:'#f00'

                            }}
                                              onPress={() => {
                                                  Alert.alert('警告','确定为学员'+rowData.perName+'上传照片，一经上传将无法更改！',[{text:'确认',onPress:()=>{
                                                          //this.navigate2FaceCollection(rowData.memberId,this.props.img);
                                                          FaceCollectionModule.getFace(rowData.memberId,this.props.img);
                                                          this.props.dispatch(updateIsHasPhotoStatus(rowData.memberId)).then((json)=>{
                                                              this._onRefresh();
                                                          }).catch((e)=>{

                                                          });
                                                      }}]);
                                              }
                                              }>
                                <Text style={{color: '#100', fontSize: 12}}>上传照片</Text>
                            </TouchableOpacity>:                    <TouchableOpacity style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: '#66CDAA',
                                padding: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 6,
                                marginLeft:30,

                            }}
                                                                                      onPress={() => {
                                                                                      }
                                                                                      }>
                                <Text style={{color: '#66CDAA', fontSize: 12}}>已采集</Text>
                            </TouchableOpacity>

                    }

                </View>
            </TouchableOpacity>



        )



    }

    fetchStudents(courseId){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        this.props.dispatch(fetchStudents(courseId)).then((json)=> {
            if(json.re==-100){
                this.props.dispatch(getAccessToken(false));
            }
            this.props.dispatch(disableStudentsOnFresh());
            this.setState({doingFetch:false,isRefreshing:false})
        }).catch((e)=>{
            this.props.dispatch(disableStudentsOnFresh());
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
        this.props.dispatch(enableStudentsOnFresh());

    }






    constructor(props) {
        super(props);
        this.state = {
            doingFetch:false,
            isRefreshing:false,
            fadeAnim:new Animated.Value(1),
        };
    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }

    render() {
        var studentsListView=null;
        var {students,studentsOnFresh}=this.props;
        var competitionList=this.state.competitionList;
        if(studentsOnFresh==true)
        {
            if(this.state.doingFetch==false)
                this.fetchStudents(this.props.course.courseId);
        }else{
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (students !== undefined && students !== null && students.length > 0)
            {
                studentsListView = (
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(students)}
                        renderRow={this.renderRow.bind(this)}
                    />
                );
            }
        }



        return (
            <View style={styles.container}>
                <Toolbar width={width} title="照片采集" actions={[]} navigator={this.props.navigator}>

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
                                {studentsListView}
                                {
                                    studentsListView==null?
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>该课程尚未有学生报名</Text>
                                        </View>:
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                                        </View>
                                }

                            </ScrollView>

                        </Animated.View>
                    </View>}



                </Toolbar>

            </View>
        )
    }

    componentDidMount()
    {

    }

    componentWillUnmount(){
        this.props.dispatch(enableStudentsOnFresh());
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
        students:state.course.studentsOfCourse,
        studentsOnFresh:state.course.studentsOnFresh,
        creatorId:state.user.personInfo.personId
    })
)(FaceCollection);