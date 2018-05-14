
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
    fetchOrderMember,
    onClassMemberUpdate,
    disableOrderMemberOnFresh,
    enableOrderMemberOnFresh,
    saveOrUpdateBadmintonCourseClassRecords, SignUpOrderMember
} from '../../action/CourseActions';

import {getAccessToken,} from '../../action/UserActions';
import BadmintonCourseSignUp from './BadmintonCourseSignUp';
import AddGroup from "./AddGroup";

class OrderClass extends Component {


    navigate2AddGroup(val) {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'AddGroup',
                component: AddGroup,
                params: {
                    course:val
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


    // renderRow(rowData, sectionId, rowId) {
    //       return (
    //           <TouchableOpacity style={{ flexDirection: 'column', borderBottomWidth: 1, borderColor: '#ddd', marginTop: 4 }}
    //                             onPress={()=>{
    //
    //
    //                             }}
    //           >
    //               <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
    //                   <View style={{ padding: 4, paddingHorizontal: 12 ,flexDirection:'row',}}>
    //                       <View style={{padding:4,flex:1,alignItems:'center',flexDirection:'row'}}>
    //                           <CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
    //                           <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>
    //                               {rowData.perName}
    //                           </Text>
    //                       </View>
    //
    //                       {/*<View style={{padding:4,flex:1,alignItems:'center',flexDirection:'row'}}>*/}
    //                           {/*<CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>*/}
    //                           {/*<Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>*/}
    //                               {/*{rowData.perIdCard}*/}
    //                           {/*</Text>*/}
    //                       {/*</View>*/}
    //
    //                       <View style={{flexDirection:'row',marginRight:50,alignItems:'center',justifyContent:'center',paddingHorizontal:10,width:70}}>
    //                           {
    //                               rowData.select==true?
    //                                   <Icon name={'check-square-o'} size={20} color="#666"/>:
    //                                   <Icon name={'square-o'} size={20} color="#666"/>
    //                           }
    //                       </View>
    //                   </View>
    //
    //               </View>
    //           </TouchableOpacity>
    //       )
    //
    //   }

    fetchOrderMember(courseId){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        this.props.dispatch(fetchOrderMember(courseId)).then((json)=> {
            if(json.re==-100){
                this.props.dispatch(getAccessToken(false));
            }
            this.props.dispatch(disableOrderMemberOnFresh());
            this.setState({doingFetch:false,isRefreshing:false})
        }).catch((e)=>{
            this.props.dispatch(disableOrderMemberOnFresh());
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
        this.props.dispatch(enableOrderMemberOnFresh());

    }






    constructor(props) {
        super(props);
        this.state = {
            doingFetch:false,
            isRefreshing:true,
            fadeAnim:new Animated.Value(1),
            OrderMember:props.OrderMember,
            content:null
        };
    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }

    render() {
        var classMemberListView=null;
        var {OrderMember,OrderMemberOnFresh}=this.props;
        //var competitionList=this.state.competitionList;


        if(OrderMemberOnFresh==true)
        {
            if(this.state.doingFetch==false)
                this.fetchOrderMember(this.props.course.courseId);
        }else{
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (OrderMember !== undefined && OrderMember !== null && OrderMember.length > 0)
            {
                var OrderMembers=[]
                OrderMember.map((member,i)=>{
                    OrderMembers.push(
                        <TouchableOpacity key={i} style={{flexDirection:'row',padding:4,paddingHorizontal:10,marginTop:4}}
                                          onPress={()=> {
                                              var _OrderMember=_.cloneDeep(OrderMember);
                                              _OrderMember.map((_member,j)=>{
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
                                              this.setState({OrderMember:_OrderMember});

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
                                // refreshControl={
                                //     <RefreshControl
                                //         refreshing={this.state.isRefreshing}
                                //         onRefresh={this._onRefresh.bind(this)}
                                //         tintColor="#9c0c13"
                                //         title="刷新..."
                                //         titleColor="#9c0c13"
                                //         colors={['#ff0000', '#00ff00', '#0000ff']}
                                //         progressBackgroundColor="#ffff00"
                                //     />
                                // }
                            >
                                {OrderMembers}
                                {
                                    OrderMembers==null?
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>尚未有学生报名</Text>
                                        </View>:
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                                        </View>
                                }
                                { OrderMembers==null?
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
                                                                  this.props.dispatch(SignUpOrderMember(this.state.OrderMember,this.props.course.courseId)).then((json)=>{
                                                                      if(json.re==1){
                                                                          this.goBack();

                                                                          // Alert.alert('信息','学生签到保存成功！',[{text:'确认',onPress:()=>{
                                                                          //         //this.navigate2AddGroup(this.props.course);
                                                                          //         // this.props.setClassRecord(this.props.courseId,);
                                                                          //
                                                                          //     }}]);

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
                </Toolbar>

            </View>
        )
    }

    componentDidMount()
    {

    }
    componentWillUnmount(){
        this.props.dispatch(enableOrderMemberOnFresh());
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
        OrderMember:state.course.OrderMember,
        OrderMemberOnFresh:state.course.OrderMemberOnFresh,
        creatorId:state.user.personInfo.personId
    })
)(OrderClass);