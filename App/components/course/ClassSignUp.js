
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

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import TextInputWrapper from 'react-native-text-input-wrapper'
import CreateBadmintonCourse from './CreateBadmintonCourse';
import CreateCustomerPlan from './CreateCustomerPlan';
import CustomerCourseList from './CustomerCourseList';
import ModifyDistribution from './ModifyDistribution';
import StudentInformation from './StudentInformation';
import RecordClass from './RecordClass';
import {Toolbar,OPTION_SHOW,OPTION_NEVER,ACTION_ADD} from 'react-native-toolbar-wrapper'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
var { height, width } = Dimensions.get('window');
import {
    fetchClassMember,
    onClassMemberUpdate,
    disableClassMemberOnFresh,
    enableClassMemberOnFresh,
    saveOrUpdateBadmintonCourseClassRecords
} from '../../action/CourseActions';

import {getAccessToken,} from '../../action/UserActions';

import BadmintonCourseSignUp from './BadmintonCourseSignUp';

class ClassSignUp extends Component {

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

    navigate2RecordClass(rowData){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name:'RecordClass',
                component:RecordClass,
                params: {
                    courseId:rowData.courseId
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
        this.props.dispatch(fetchClassMember(this.props.courseId,this.proprs)).then((json)=>{
            if(json.re==1)
            {
                this.props.dispatch(onClassMemberUpdate(json.data))
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }
            }
        })
    }

  /*  renderRow(rowData, sectionId, rowId) {
        return (
            <TouchableOpacity style={{ flexDirection: 'column', borderBottomWidth: 1, borderColor: '#ddd', marginTop: 4 }}
                              onPress={()=>{


                              }}
            >
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <View style={{ padding: 4, paddingHorizontal: 12 ,flexDirection:'row',}}>
                        <View style={{padding:4,flex:1,alignItems:'center',flexDirection:'row'}}>
                            <CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
                            <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>
                                {rowData.perName}
                            </Text>
                        </View>
                        <View style={{flexDirection:'row',marginRight:150,alignItems:'center',justifyContent:'center',paddingHorizontal:10,width:70}}>
                            {
                                rowData.select==true?
                                    <Icon name={'check-square-o'} size={20} color="#666"/>:
                                    <Icon name={'square-o'} size={20} color="#666"/>
                            }
                        </View>
                    </View>

                </View>



                {/!*<View style={{ width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={'angle-right'} size={34} color="#444" style={{ backgroundColor: 'transparent', marginTop: -10 }} />
                </View>*!/}
            </TouchableOpacity>




        )



    }*/

    fetchClassMember(courseId,classId){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        this.props.dispatch(fetchClassMember(courseId,classId)).then((json)=> {
            if(json.re==-100){
                this.props.dispatch(getAccessToken(false));
            }
            this.props.dispatch(disableClassMemberOnFresh());
            this.setState({doingFetch:false,isRefreshing:false})
        }).catch((e)=>{
            this.props.dispatch(disableClassMemberOnFresh());
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
        this.props.dispatch(enableClassMemberOnFresh());

    }






    constructor(props) {
        super(props);
        this.state = {
            doingFetch:false,
            isRefreshing:false,
            fadeAnim:new Animated.Value(1),
            classMember:props.classMember,
             content:null
        };
    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }

    render() {
        var classMemberListView=null;
        var {classMember,classMemberOnFresh}=this.props;
        //var competitionList=this.state.competitionList;


        if(classMemberOnFresh==true)
        {
            if(this.state.doingFetch==false)
                this.fetchClassMember(this.props.courseId,this.props.classId);
        }else{
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (classMember !== undefined && classMember !== null && classMember.length > 0)
            {
             /*   classMemberListView = (
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(classMember)}
                        renderRow={this.renderRow.bind(this)}
                    />
                );*/
                var classMembers=[]
                classMember.map((member,i)=>{
                    classMembers.push(
                        <TouchableOpacity key={i} style={{flexDirection:'row',padding:4,paddingHorizontal:10,marginTop:4}}
                                          onPress={()=> {
                                             var _classMember=_.cloneDeep(classMember);
                                              _classMember.map((_member,j)=>{
                                                if(_member.memberId==member.memberId)
                                                {
                                                    if(_member.select==true)
                                                    {
                                                        _member.select=false;
                                                        member.select=false;
                                                    }
                                                    else{
                                                        _member.select=true;
                                                        member.select=true;
                                                    }
                                                }
                                              })
                                              this.setState({classMember:_classMember});

                                          }}
                        >
                            {member.perName!=null?
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                                <Text>{member.perName}</Text>
                            </View>:
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                                <Text>{member.perNum}</Text>
                            </View>}

                            <View style={{flex:1}}></View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10,marginRight:10}}>
                                {
                                    member.select==true?
                                        <Icon name={'check-square-o'} size={20} color="#666"/>:
                                        <Icon name={'square-o'} size={20} cogit lor="#666"/>
                                }
                            </View>
                            <View style={{flex:2}}></View>


                            <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',width:200,margin:10,marginTop:5,marginBottom:5}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>




                                    <TextInputWrapper
                                    placeholderTextColor='#888'
                                    textInputStyle={{marginLeft: 20, fontSize: 13, color: '#222'}}
                                    placeholder="请输入内容"
                                    val={member.content}
                                    onChangeText={
                                        (value) => {
                                            member.content=value;
                                            this.setState({classMember: classMember})
                                        }}
                                    onCancel={
                                        () => {
                                            this.setState({classMember: Object.assign(this.state.classMember, {content: null})});
                                        }}
                                    />


                                </View>
                            </View>

                        </TouchableOpacity>

                    )
                })
            }
        }



        return (
            <View style={styles.container}>
                <Toolbar width={width} title="学生签到" actions={[]} navigator={this.props.navigator}>

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
                                {classMembers}
                                {
                                    classMembers==null?
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>尚未有学生报名</Text>
                                        </View>:
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                                        </View>
                                }
                                { classMembers==null?
                                    null:
                                <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', marginTop: 4 }}
                                                  onPress={()=>{
                                                  }}
                                >

                                    <View style={{flex:1,flexDirection:'row',padding:10,borderTopWidth:1,borderColor:'#ddd'}}>
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
                                                              this.props.dispatch(saveOrUpdateBadmintonCourseClassRecords(this.state.classMember)).then((json)=>{
                                                                  if(json.re==1){
                                                                      Alert.alert('信息','学生签到保存成功！',[{text:'确认',onPress:()=>{
                                                                          this.goBack();
                                                                          this.props.setClassRecord(this.props.courseId,);

                                                                      }}]);
                                                                  }else{
                                                                      if(json.re==-100){
                                                                          this.props.dispatch(getAccessToken(false));
                                                                      }
                                                                  }
                                                              })
                                                          }
                                                          }>
                                            <Text style={{color: '#66CDAA', fontSize: 12}}>确定</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>}
                            </ScrollView>

                        </Animated.View>
                    </View>}




                       {/* <View style={{flexDirection:'row',padding:4,paddingHorizontal:10,marginTop:4}}>

                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                                <Text style={{color:'#000000',fontWeight:'bold'}}>用户名</Text>
                            </View>

                            <View style={{flex:1}}>

                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10,width:70}}>
                                <Text style={{color:'#000000',fontWeight:'bold'}}>
                                    勾选
                                </Text>
                            </View>

                            <View style={{flex:1}}>

                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10,width:70}}>
                                <Text style={{color:'#000000',fontWeight:'bold'}}>
                                    内容
                                </Text>
                            </View>

                        </View>
*/}



                </Toolbar>

            </View>
        )
    }

    componentDidMount()
    {

    }
    componentWillUnmount(){
        this.props.dispatch(enableClassMemberOnFresh());
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
        classMember:state.course.classMember,
        classMemberOnFresh:state.course.classMemberOnFresh,
        creatorId:state.user.personInfo.personId
    })
)(ClassSignUp);