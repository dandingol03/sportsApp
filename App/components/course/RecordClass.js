
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
import ModifyDistribution from './ModifyDistribution';
import StudentInformation from './StudentInformation';
import AddClass from './AddClass';
import EditClass from './EditClass';
import ClassSignUp from './ClassSignUp';
import {Toolbar,OPTION_SHOW,OPTION_NEVER,ACTION_ADD} from 'react-native-toolbar-wrapper'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
var { height, width } = Dimensions.get('window');
import {
    onCourseClassUpdate,
    disableCourseClassOnFresh,
    enableCourseClassOnFresh,
    fetchCourseClass
} from '../../action/CourseActions';

import {getAccessToken,} from '../../action/UserActions';

import BadmintonCourseSignUp from './BadmintonCourseSignUp';

class RecordClass extends Component {

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

    navigate2ModifyClass()
    {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'ModifyClass',
                component: ModifyClass,
                params: {

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

    navigate2AddClass(){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'AddClass',
                component: AddClass,
                params: {
                    course:this.props.course,
                    courseId:this.props.courseId,
                    setClassRecord:this.setClassRecord.bind(this)
                }
            })
        }
    }

    navigate2EditClass(classes,startTime,endTime,classWeek){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'EditClass',
                component: EditClass,
                params: {
                    course:this.props.course,
                    class:classes,
                    setClassRecord:this.setClassRecord.bind(this),
                    startTime:startTime,
                    endTime:endTime,
                    classWeek:classWeek,
                    content:classes.content

                }
            })
        }
    }

    navigate2ClassSignUp(courseId,classId){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'ClassSignUp',
                component: ClassSignUp,
                params: {
                    courseId:courseId,
                    classId:classId,
                    setClassRecord:this.setClassRecord.bind(this)
                }
            })
        }
    }

    goBack() {
        const { navigator } = this.props;

        if (navigator) {
            navigator.pop();
        }
        //this.props.dispatch(enableCourseClassOnFresh())
    }

    setClassRecord(courseId)
    {
        this.props.dispatch(fetchCourseClass(courseId)).then((json)=>{
            if(json.re==1)
            {
                this.props.dispatch(onCourseClassUpdate(json.data))
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }
            }
        })
    }


    renderRow(rowData, sectionId, rowId) {
        var time=(new Date(rowData.startTime)).toLocaleTimeString();
        var date=new Date(rowData.startTime);
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var startTime=year+'年'+month+'月'+day+'日'+' '+time;
        var startTime1=year+'-'+month+'-'+day+' '+time;
        //var time=time.toLocaleDateString()+" "+time.toLocaleTimeString();
        var time1=(new Date(rowData.endTime)).toLocaleTimeString();
        var date1=new Date(rowData.endTime);
        var year1=date1.getFullYear();
        var month1=date1.getMonth()+1;
        var day1=date1.getDate();
        var hour1=date1.getHours();
        var minute1=date1.getMinutes();
        var second1=date1.getSeconds();
        var endTime=year1+'年'+month1+'月'+day1+'日'+' '+time1;
        var endTime1=year1+'-'+month1+'-'+day1+' '+time1;
        var a=new Array("日","一","二","三","四","五","六");
        var week=date.getDay();
        var classWeek="星期"+a[week]+" "+month+"月"+day+"日";
        var currentTime=new Date();
        var currentTimeYear=currentTime.getFullYear();
        var currentTimeMonth=currentTime.getMonth()+1;
        var currentTimeDay=currentTime.getDate();
        var currentTimeTime=(new Date(currentTime)).toLocaleTimeString();
        var currentTimeHour=currentTime.getHours();
        var currentTimeMinute=currentTime.getMinutes();
        var currentTimeSecond=currentTime.getSeconds();
        var currentTime1=currentTimeYear+'-'+currentTimeMonth+'-'+currentTimeDay+' '+currentTimeTime;
        var flag=true;
     /*   var a =DateTime.parse(endTime1);
        var b=DateTime.parse(currentTime1);
        if(a>b)
        {flag=true}
        else{
            flag=false;
        }
*/
       if(year1==currentTimeYear)
        {
            if(month1==currentTimeMonth)
            {
                if(day1==currentTimeDay) {

                        if(hour1==currentTimeHour)
                        {
                            if(minute1==currentTimeMinute)
                            {
                                if(second1==currentTimeSecond)
                                {
                                 flag=true;
                                }else{
                                    if (second1 > currentTimeSecond) flag = true;
                                else flag = false;
                                }
                            }
                            else{
                                if (minute1 > currentTimeMinute) flag = true;
                                else flag = false;
                            }
                        }
                        else{
                            if (hour1 > currentTimeHour) flag = true;
                            else flag = false;
                        }


                }
                else{
                    if (day1 > currentTimeDay) flag = true;
                    else flag = false;
                }
            }
            else{
                if (month1 > currentTimeMonth) flag = true;
                else flag = false;
            }
            }

        else{
            if (year1 > currentTimeYear) flag = true;
            else flag = false;
        }
       /* if(new Date(endTime1.replace(/-/g,"V"))<new Date(currentTime.replace(/-/g,"V")))
        {
            flag=false;
        }*/


        /*SimpleDateFormat strdate = new SimpleDateFormat("E");
        String str = strdate.format(date);*/
        return (
            <TouchableOpacity style={{ flexDirection: 'column', borderBottomWidth: 1, borderColor: '#ddd', marginTop: 4 }}
                              onPress={()=>{
                              }}
            >

                <View style={{flex:3,padding:10}}>

                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'上课时间：'+startTime}
                        </Text>
                    </View>



                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'下课时间：'+endTime}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'训练地点：'+rowData.uintName}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'训练场地：'+rowData.yards}
                        </Text>
                    </View>

                   {/* <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'训练场地：'+rowData.yards}
                        </Text>
                    </View>*/}

                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'实到人员：'+rowData.joinCount}
                        </Text>
                    </View>

                   {rowData.remark!=null?
                       <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'备注：'+rowData.remark}
                        </Text>
                    </View>:null}


                </View>

               {/* <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <View style={{ padding: 4, paddingHorizontal: 12 ,flexDirection:'row',}}>

                        <View style={{padding:4,flex:1,alignItems:'center',flexDirection:'row'}}>
                            <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 15 }}>
                                上课时间：{rowData.startTime}
                            </Text>
                        </View>


                        <View style={{padding:4,marginLeft:10,flexDirection:'row',alignItems:'center'}}>
                            <CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
                            <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>
                                训练地点：{rowData.uintName}
                            </Text>
                        </View>

                        <View style={{ padding: 3, paddingHorizontal: 12 }}>
                            <Text style={{ color: '#444', fontSize: 13 }}>
                                训练场地:{rowData.yards}
                            </Text>
                        </View>
                    </View>



                    <View style={{ paddingTop: 12, paddingBottom: 4, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' }}>

                        <View style={{ backgroundColor: '#66CDAA', borderRadius: 6, padding: 4, paddingHorizontal: 6, marginLeft: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>
                                实到人员：{rowData.joinCount}
                            </Text>
                        </View>

                        <View style={{ backgroundColor: '#ff4730', borderRadius: 6, padding: 4, paddingHorizontal: 6, marginLeft: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>
                                备注：{rowData.remark}
                            </Text>
                        </View>

                    </View>
                </View>*/}



                <View style={{flex:1,flexDirection:'row',padding:10,borderTopWidth:1,borderColor:'#ddd'}}>
                   {/* {flag==true?
                    <TouchableOpacity style={{
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
                                          this.navigate2EditClass(rowData,time,time1,classWeek);
                                      }
                                      }>
                        <Text style={{color: '#66CDAA', fontSize: 12}}>删除课程信息</Text>
                    </TouchableOpacity>:null
                    }*/}

                    {<View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>

                    </View>}
                    {flag==true?
                    <TouchableOpacity style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: '#66CDAA',
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 6,
                        marginRight:30,

                    }}


                                      onPress={() => {
                                          this.navigate2ClassSignUp(rowData.courseId,rowData.classId);
                                      }
                                      }>
                        <Text style={{color: '#66CDAA', fontSize: 12}}>开始上课</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: '#66CDAA',
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 6,
                        marginRight:30,

                    }}


                                      onPress={() => {
                                          this.navigate2ClassSignUp(rowData.courseId,rowData.classId);
                                      }
                                      }>
                        <Text style={{color: '#66CDAA', fontSize: 12}}>查看学生出勤</Text>
                    </TouchableOpacity>}
                </View>
            </TouchableOpacity>

        )
    }

    fetchCourseClass(courseId){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        this.props.dispatch(fetchCourseClass(courseId)).then((json)=> {
            if(json.re==-100){

                this.props.dispatch(getAccessToken(false));
            }
            this.props.dispatch(disableCourseClassOnFresh());
            this.setState({doingFetch:false,isRefreshing:false})
        }).catch((e)=>{
            this.props.dispatch(disableCourseClassOnFresh());
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
        this.props.dispatch(enableCourseClassOnFresh());

    }






    constructor(props) {
        super(props);
        this.state = {
            doingFetch:false,
            isRefreshing:false,
            fadeAnim:new Animated.Value(1),
            classWeek:null

        };
    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }

    render() {
        var courseClassListView=null;
        var {courseClass,courseClassOnFresh}=this.props;
        //courseClassOnFresh=true;
        if(courseClassOnFresh==true)
        {
            if(this.state.doingFetch==false)
                this.fetchCourseClass(this.props.courseId);
      }else{
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (courseClass !== undefined && courseClass !== null && courseClass.length > 0)
            {
                courseClassListView = (
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(courseClass)}
                        renderRow={this.renderRow.bind(this)}
                    />
                );
            }
       }

        return (
            <View style={styles.container}>
                {/*<Toolbar width={width} title="上课记录" actions={[]} navigator={this.props.navigator}>*/}
                <View style={{height:55,width:width,paddingTop:10,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                    backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:10,justifyContent:'center',alignItems: 'center'}}>
                        <Text style={{color:'#fff',fontSize:18}}>上课记录</Text>
                    </View>
                </View>

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
                                {courseClassListView}
                                {
                                    courseClassListView==null?
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>尚未有课程记录</Text>
                                        </View>:
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                                        </View>
                                }

                            </ScrollView>

                        </Animated.View>
                    </View>}

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
                                          onPress={()=>{this.navigate2AddClass();}}>
                            <Icon name={'plus-circle'} size={35} color='#66CDAA'/>
                        </TouchableOpacity>
                    </View>

                {/*</Toolbar>*/}

            </View>


        )
    }

    componentDidMount()
    {

    }

    componentWillUnmount(){
        this.props.dispatch(enableCourseClassOnFresh());
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

/*
const mapStateToProps = (state, ownProps) => {

    const props = {
        userType: state.user.usertype.perTypeCode,
        courses:state.course.courses,
        creatorId:this.props.creatorId
    }
    return props
}


export default connect(mapStateToProps)(MyDistribution);
*/

module.exports = connect(state=>({
        userType: state.user.usertype.perTypeCode,
        courseClass:state.course.courseClass,
        courseClassOnFresh:state.course.courseClassOnFresh,
        creatorId:state.user.personInfo.personId
    })
)(RecordClass);