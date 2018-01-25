import React, {Component} from 'react';
import {
    Alert,
    Dimensions,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    ToastAndroid
} from 'react-native';

import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');

import DateFilter from '../../utils/DateFilter';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddActivity from './AddActivity';
import MyActivity from './MyActivity';
import ActivityDetail from './ActivityDetail';
import ActivityPay from './ActivityPay';
import ChooseField from './ChooseField';
import GroupJPush from './GroupJPush';
import goFieldOrder from './FieldOrder'
import PopupDialog,{ScaleAnimation,DefaultAnimation,SlideAnimation} from 'react-native-popup-dialog';
const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });
import QrcodeModal from './QrcodeModal';
import {
    fetchActivityList,disableActivityOnFresh,enableActivityOnFresh,signUpActivity,fetchEventMemberList,exitActivity,exitFieldTimeActivity
} from '../../action/ActivityActions';

import {getAccessToken,} from '../../action/UserActions';
import WechatShare from '../WechatShare';
var WeChat=require('react-native-wechat');

import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'
/**
 * 群活动
 */

class Activity extends Component {

    goBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
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
        this.props.dispatch(enableActivityOnFresh());
    }

    setMyActivityList()
    {
        this.props.dispatch(enableActivityOnFresh());
    }

    navigate2AddActivity(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'add_activity',
                component: AddActivity,
                params: {

                }
            })
        }
    }

    navigate2goFieldOrder(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'go_FieldOrder',
                component: goFieldOrder,
                params: {

                }
            })
        }
    }

    navigate2MyActivity(myEvents,flag){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'my_activity',
                component: MyActivity,
                params: {
                    myEvents:myEvents,
                    flag:flag
                }
            })
        }
    }



    navigate2ActivityDetail(rowData,flag){

        this.props.dispatch(fetchEventMemberList(rowData.eventId))
            .then((json)=> {
                if(json.re==1){

                    var memberList = json.data;
                    rowData.memberList = memberList;
                    const { navigator } = this.props;
                    if(navigator) {
                        navigator.push({
                            name: 'activity_detail',
                            component: ActivityDetail,
                            params: {
                                activity:rowData,
                                flag:flag,
                                signUpActivity:this.signUpActivity.bind(this)
                            }
                        })
                    }
                }else{
                    if(json.re==-100){
                        this.props.dispatch(getAccessToken(false));
                    }
                }
            })
    }

    navigate2ActivityPay(event)
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'ActivityPay',
                component: ActivityPay,
                params: {
                    activity:event
                }
            })
        }
    }


    navigate2ActivityChooseField(event){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'ChooseField',
                component:ChooseField,
                params: {
                    activity:event
                }
            })
        }

    }
    signUpActivity(event,eventNowMemNum)
    {
        if(event.eventMaxMemNum<=eventNowMemNum){
            alert('该活动人数已满！');

        }else{
            //
            // this.navigate2ActivityPay(event);
            // this.setMyActivityList();
            this.props.dispatch(signUpActivity(event.eventId)).then((json)=>{
                if(json.re==1){
                        this.navigate2ActivityPay(event);
                        this.setMyActivityList();
                }else{
                    if(json.re==-100){
                        this.props.dispatch(getAccessToken(false));
                    }
                }
            })
        }
    }

    exitActivity(event)
    {

            this.props.dispatch(exitActivity(event.eventId)).then((json)=>{
                if(json.re==1){
                    Alert.alert('信息','退出报名成功',[{text:'确认',onPress:()=>{
                        // this.setMyActivityList();
                        //this.goBack();
                        this.setMyActivityList();
                    }},
                    ]);
                }else{
                    if(json.re==-100){
                        this.props.dispatch(getAccessToken(false));
                    }
                }
            })

    }

    exitFieldTimeActivity(event)
    {

        this.props.dispatch(exitActivity(event.eventId)).then((json)=>{
            if(json.re==1){
                this.props.dispatch(exitFieldTimeActivity(event.eventId)).then((json)=>{
                    Alert.alert('信息','退出报名成功',[{text:'确认',onPress:()=>{
                        // this.setMyActivityList();
                        //this.goBack();
                        this.setMyActivityList();
                    }},
                    ]);
                })

            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }
            }
        })

    }
    isActivityPay(event){
        Alert.alert('信息','您已成功报名，但未支付，是否现在支付？',[{text:'是',onPress:()=>{
            // this.setMyActivityList();
            this.navigate2ActivityPay(event);
        }},
            {text:'否',onPress:()=>{

                //this.goBack();
                //this.setMyActivityList();
            }},
        ]);

    }

    renderRow(rowData,sectionId,rowId){

        switch(rowData.costType){
            case '1':rowData.costType = '按每人收费'; break;
            case '2':rowData.costType = '按每小时收费'; break;
            case '3':rowData.costType = '总费用'; break;
            case '4':rowData.costType = '按每人次收费'; break;
            case '5':rowData.costType = '按每人每小时收费'; break;
            case '6':rowData.costType = '按场地小时收费'; break;

        }

        var str=rowData.eventMember;
        var members=new Array();
        members=str.split(",");
        if(members[0]==""){
            var eventNowMemNum=0;
        }else{
            var eventNowMemNum=members.length;
        }

        var flag=1;
        var row=(
            <View style={{flex:1,backgroundColor:'#fff',marginTop:5,marginBottom:5,}}>
                <View style={{flex:1,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:5}}>
                        <View>
                            {/*<Text>{rowData.eventManager.username}</Text>*/}
                        </View>
                    </View>
                    <View style={{flex:2,justifyContent:'center',alignItems: 'flex-end'}}>
                        {
                            rowData.eventType==0?null:
                                <Text>组内活动</Text>
                        }
                    </View>


                    {rowData.coach!==undefined&&rowData.coach!==null?
                        <View style={{flex:2,justifyContent:'center',alignItems: 'flex-end',marginRight:15}}>
                            <Text>指定教练</Text>
                        </View> :null
                    }




                     <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}
                     onPress={()=>{
                     this.sharetoSomeone.show();
                     this.state.share=rowData;
                     }}>
                     <Text style={{marginRight:5,color:'#66CDAA'}}>分享</Text>
                     <Icon name={'angle-right'} size={25} color="#66CDAA"/>
                     </TouchableOpacity>



                    <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                        {
                            rowData.money!=0 && rowData.money!=null && rowData.money!=undefined && rowData.isSignUp==1?
                                <View>
                                            <TouchableOpacity style={{flex:2,borderWidth:1,borderColor:'#66CDAA',padding:7,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                                              onPress={()=>{this.usernameDialog.show()}}>
                                                <Text style={{color:'#f00',fontSize:12}}>已支付</Text>
                                            </TouchableOpacity>
                                </View>:
                                <View>
                                    {
                                        ( rowData.Money==0 || rowData.Money==null || rowData.Money==undefined )&& rowData.isSignUp==1?
                                            <TouchableOpacity style={{flex:2,borderWidth:1,borderColor:'#66CDAA',padding:7,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                                              onPress={()=>{this.isActivityPay(rowData)}}>
                                                <Text style={{color:'#f00',fontSize:12}}>未支付</Text>
                                            </TouchableOpacity>:
                                            null
                                    }

                                </View>
                        }


                    </View>

                </View>
                <View style={{flex:3,padding:10}}>
                    <View style={{flex:3,flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'star'} size={16} color="#66CDAA"/>
                        </View>
                        <View style={{flex:7}}>
                            <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.eventName}</Text>
                        </View>

                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.eventPlaceName}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'时间:'+rowData.startTimeStr+'---'+rowData.endTimeStr}
                        </Text>
                    </View>
                    {
                        rowData.eventBrief!=undefined&&rowData.eventBrief!=null&&rowData.eventBrief!=''?
                        <View style={{flexDirection:'row',marginBottom:3}}>

                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text
                                style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                                {'比赛简介：' + rowData.eventBrief}
                            </Text>
                        </View>:
                            <View style={{flexDirection:'row',marginBottom:3}}>

                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text
                                style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                                {'比赛简介：' + '无'}
                            </Text>
                        </View>
                    }

                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'场地数目：'+rowData.yardNum}
                        </Text>
                    </View>


                </View>
                <View style={{flex:1,flexDirection:'row',padding:10,borderTopWidth:1,borderColor:'#ddd'}}>
                    <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                        {
                            rowData.eventNowMemNum!=null?
                                <Text style={{color:'#aaa',fontSize:13}}>已报名:{eventNowMemNum}</Text>:
                                <Text style={{color:'#aaa',fontSize:13}}>已报名:暂无</Text>
                        }

                    </View>


                    <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                        <Text style={{color:'#aaa',fontSize:13}}>已支付:{rowData.payCount}</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center'}}>

                    </View>

                    {
                        rowData.isSignUp==0 ?
                            <View>
                            {
                                rowData.isChooseYardTime==1?
                                <View >
                                    {
                                        rowData.isChooseYardTime==1?
                                <TouchableOpacity style={{flex:2,borderWidth:1,borderColor:'#66CDAA',padding:5,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                                  onPress={()=>{this.navigate2ActivityChooseField(rowData)}}>
                                    <Text style={{color:'#f00',fontSize:12}}>我要报名</Text>
                                </TouchableOpacity>:
                                    <TouchableOpacity style={{flex:2,borderWidth:1,borderColor:'#66CDAA',padding:5,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}>
                                        <Text style={{color:'#f00',fontSize:12}}>我要报名</Text>
                                    </TouchableOpacity>
                                    }
                                </View>:
                                    <TouchableOpacity style={{flex:2,borderWidth:1,borderColor:'#66CDAA',padding:5,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                                      onPress={()=>{this.signUpActivity(rowData,eventNowMemNum)}}>
                                        <Text style={{color:'#f00',fontSize:12}}>我要报名</Text>
                                    </TouchableOpacity>
                    }

                            </View>:

                            <View>
                                {
                                    rowData.money==0||rowData.money==null?
                                        <View>
                                                    <TouchableOpacity style={{flex:2,borderWidth:1,borderColor:'#66CDAA',padding:5,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                                                      onPress={()=>{this.exitActivity(rowData)}}>
                                                        <Text style={{color:'#f00',fontSize:12}}>取消报名</Text>
                                                    </TouchableOpacity>
                                        </View>:
                                        <View>
                                        <TouchableOpacity style={{flex:2,borderWidth:1,borderColor:'#66CDAA',padding:5,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                        >
                                            <Text style={{color:'#f00',fontSize:12}}>报名成功</Text>
                                        </TouchableOpacity>
                                        </View>

                                }

                            </View>
                    }

                </View>


                <View style={{flex:1,height:30,flexDirection:'row',padding:10,borderTopWidth:1,borderColor:'#ddd'}}>

                    {
                        rowData.eventMember!=null&&rowData.eventMember!=undefined&&rowData.eventMember!=""?
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                                <Text style={{color:'#f00',fontSize:13}}>已报名用户:{rowData.eventMember}</Text>
                            </View>:
                            <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                                <Text style={{color:'#f00',fontSize:13}}>已报名用户:暂 无</Text>
                            </View>

                    }

                </View>



            </View>
        );
        return row;
    }

    sharetoPyq(rowData){
        WeChat.isWXAppInstalled().then((isInstalled) => {
            if (isInstalled) {
                WeChat.shareToTimeline({
                    type: 'news',
                    title:rowData.eventName,
                    description:'活动'+rowData.eventName+'在'+rowData.eventPlaceName+'举行，'+'活动时间为'+rowData.startTimeStr+'---'+rowData.endTimeStr,
                    thumbImage:'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike72%2C5%2C5%2C72%2C24/sign=f96438a8b1389b502cf2e800e45c8eb8/d043ad4bd11373f04db74d29ac0f4bfbfaed04ff.jpg',
                    webpageUrl:'http://211.87.225.204:8080/badmintionhot/ShareTimeLine.html',
                })
                    .catch((error) => {
                        console(error.message);
                    });
            } else {
                console('没有安装微信软件，请您安装微信之后再试');
            }
        });
    }

    sharetoperson(rowData){
        WeChat.isWXAppInstalled().then((isInstalled) => {
            if (isInstalled) {
                WeChat.shareToSession({
                    type: 'news',
                    title:rowData.eventName,
                    description:'活动'+rowData.eventName+'在'+rowData.eventPlaceName+'举行，'+'活动时间为'+rowData.startTimeStr+'---'+rowData.endTimeStr,
                    thumbImage:'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike72%2C5%2C5%2C72%2C24/sign=f96438a8b1389b502cf2e800e45c8eb8/d043ad4bd11373f04db74d29ac0f4bfbfaed04ff.jpg',
                    webpageUrl:'http://211.87.225.204:8080/badmintionhot/ShareTimeLine.html',
                })
                    .catch((error) => {
                        console(error.message);
                    });
            } else {
                console('没有安装微信软件，请您安装微信之后再试');
            }
        });
    }
    fetchData(){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        this.props.dispatch(fetchActivityList()).then((json)=> {
            if(json.re==-100){
                this.props.dispatch(getAccessToken(false));
            }
            this.props.dispatch(disableActivityOnFresh());
            this.setState({doingFetch:false,isRefreshing:false})
        }).catch((e)=>{
            this.props.dispatch(disableActivityOnFresh());
            this.setState({doingFetch:false,isRefreshing:false});
            alert(e)
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
            signupedShow:false,
            //myTakenEvents:{isSignUp:null,eventId:null,eventId:null,eventBrief:null,money:null,eventName:null},
            myTakenEvents:{},
            share:{},
            event:{eventName:null,startTimeStr:null,eventPlaceName:null,isChooseYardTime:null,eventBrief:'',eventType:null,eventPlace:null,unitId:null,feeDes:null,yardTotal:null,eventMaxMemNum:null,
                memberLevel:null,hasCoach:0,hasSparring:0,coachId:null,coachName:null,sparringId:null,sparringName:null,
                groupName:null,groupId:null,cost:null,costType:null,field:null,filedNum:null,time:{startTime:null,endTime:null,eventWeek:null,isSchedule:null,},},

        }
    }

    render() {


        this.state.event.eventId='244';
        this.state.event.eventMaxMemNum='100';
        this.state.event.cost=15;
        this.state.event.eventName='周末日常活动';
        this.state.event.eventBrief='周末日常活动';
        this.state.event.eventPlaceName='山东大学-宇宙级羽毛球馆';
        this.state.event.startTimeStr='2017-11-18 08:00-2017-12-18 17:00'
        var activityListView=null;
        var {activityList,activityOnFresh,visibleEvents,myEvents,myTakenEvents}=this.props;
        //this.state.myTakenEvents.isSignUp=myTakenEvents.isSignUp;
        if(activityOnFresh==true)
        {
            if(this.state.doingFetch==false)
                this.fetchData();
        }else {
            myTakenEvents.map((myTakenEvents,i)=>{
                // this.state.myTakenEvents.isSignUp=myTakenEvents.isSignUp;
                // this.state.myTakenEvents.eventName=myTakenEvents.eventName;
                // this.state.myTakenEvents.eventBrief=myTakenEvents.eventBrief;
                this.state.myTakenEvents=myTakenEvents;
            })
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (visibleEvents !== undefined && visibleEvents !== null && visibleEvents.length > 0) {

                activityListView = (
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(visibleEvents)}
                        renderRow={this.renderRow.bind(this)}
                    />
                );
            }
        }

        return (

            <View style={{flex:1}}>

                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>群活动</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                        <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                          onPress={()=>{this.navigate2goFieldOrder();}}>
                            <Text style={{color:'#fff',fontSize:18}}>场地预约</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    <View style={{flex:1,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                                <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                            </View>
                            <View style={{marginTop:10,width:200}}>
                                <View style={{flex:3,flexDirection:'row',marginBottom:0}}>
                                    <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                        <Icon name={'star'} size={16} color="#66CDAA"/>
                                    </View>
                                    <View style={{flex:7}}>
                                        <Text style={{color:'#000',justifyContent:'flex-start',alignItems: 'center'}}>{this.state.myTakenEvents.eventName}</Text>
                                    </View>
                                </View>
                                <View style={{flex:3,flexDirection:'row',marginBottom:0}}>
                                    <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                        <Icon name={'circle'} size={12} color="#aaa"/>
                                    </View>
                                    <View style={{flex:7}}>
                                        <Text style={{color:'#000',justifyContent:'flex-start',alignItems: 'center'}}>{this.state.myTakenEvents.eventPlaceName}</Text>
                                    </View>
                                </View>
                                <View style={{width:140,justifyContent:'center',alignItems: 'center'}}>
                                    <View>
                                        <Text style={{color:'#343434'}}>{this.state.myTakenEvents.eventBrief}</Text>
                                    </View>
                                </View>
                            </View>




                        <View style={{flex:2,flexDirection:'column',justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                            {
                                this.state.myTakenEvents.money!=0 && this.state.myTakenEvents.money!=null && this.state.myTakenEvents.money!=undefined && this.state.myTakenEvents.isSignUp==1?
                                    <View>
                                        <TouchableOpacity style={{height:25,borderWidth:1,borderColor:'#66CDAA',padding:7,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                                          onPress={()=>{this.usernameDialog.show()}}>
                                            <Text style={{color:'#f00',fontSize:12}}>已支付</Text>
                                        </TouchableOpacity>
                                    </View>:
                                    <View>
                                        {
                                            ( this.state.myTakenEvents.Money==0 || this.state.myTakenEvents.Money==null || this.state.myTakenEvents.Money==undefined )&& this.state.myTakenEvents.isSignUp==1?
                                                <TouchableOpacity style={{height:25,marginBottom:10,borderWidth:1,borderColor:'#66CDAA',padding:7,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                                                  onPress={()=>{this.isActivityPay(this.state.myTakenEvents)}}>
                                                    <Text style={{color:'#f00',fontSize:12}}>未支付</Text>
                                                </TouchableOpacity>:
                                                null
                                        }

                                    </View>
                            }



                            {
                                this.state.myTakenEvents.isSignUp==0 ?
                                    <View>
                                        {

                                                <TouchableOpacity style={{height:30,borderWidth:1,borderColor:'#66CDAA',padding:5,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                                                  onPress={()=>{this.signUpActivity(this.state.myTakenEvents,1)}}>
                                                    <Text style={{color:'#f00',fontSize:12}}>我要报名</Text>
                                                </TouchableOpacity>
                                        }

                                    </View>:

                                    <View>
                                        {
                                            this.state.myTakenEvents.money==0||this.state.myTakenEvents.money==null?
                                                <View>
                                                    <TouchableOpacity style={{height:30,borderWidth:1,borderColor:'#66CDAA',padding:5,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                                                      onPress={()=>{this.exitActivity(this.state.myTakenEvents)}}
                                                    >
                                                        <Text style={{color:'#f00',fontSize:12}}>取消报名</Text>
                                                    </TouchableOpacity>
                                                </View>:
                                                <View>
                                                    <TouchableOpacity style={{height:30,borderWidth:1,borderColor:'#66CDAA',padding:5,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                                    >
                                                        <Text style={{color:'#f00',fontSize:12}}>报名成功</Text>
                                                    </TouchableOpacity>
                                                </View>

                                        }

                                    </View>
                            }
                        </View>

                    </View>

                    {/*内容区*/}
                    <View style={{flex:5,backgroundColor:'#eee'}}>
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
                                {activityListView}

                                {
                                    activityListView==null?
                                        null:
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                                        </View>
                                }

                            </ScrollView>
                        </Animated.View>
                    </View>

                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#66CDAA',
                            position:'absolute',bottom:8}}>
                        <TouchableOpacity style={{flex:1,backgroundColor:'#66CDAA',justifyContent:'center',alignItems: 'center',
                            padding:10,margin:5}} onPress={()=>{this.navigate2MyActivity(myEvents,'我的活动');}}>
                            <Text style={{color:'#fff',}}>我发起的活动</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1,backgroundColor:'#66CDAA',justifyContent:'center',alignItems: 'center',
                            padding:10,margin:5}} onPress={()=>{this.navigate2AddActivity();}}>
                            <Text style={{color:'#fff',}}>我要创建活动</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{height:50,width:50,borderRadius:25,position:'absolute',bottom:8,left:width*0.5-25}}>
                        <TouchableOpacity style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',padding:5,
                        borderWidth:1,borderColor:'#eee',borderRadius:50}}
                        >
                            <Icon name={'plus-circle'} size={35} color='#66CDAA'/>
                        </TouchableOpacity>
                    </View>

                    <PopupDialog
                        ref={(popupDialog) => {
                        this.usernameDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <QrcodeModal
                            onClose={()=>{
                                this.usernameDialog.dismiss();
                            }}
                        />

                    </PopupDialog>


                    <PopupDialog
                        ref={(popupDialog) => {
                        this.sharetoSomeone = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.25}
                    >
                    <View style={{flex:1,padding:10,alignItems:"center",flexDirection:"row",justifyContent:"center"}}>

                        <View style={{flex:1,flexDirection:"column",alignItems:"center"}}>
                            <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center"}}
                                onPress={()=>{
                                    this.sharetoSomeone.dismiss();
                                    this.sharetoperson(this.state.share);

                                }}
                            >
                            <Icon name={'user-circle'} size={45} color='#00CD00'/>
                            <Text>好友</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,flexDirection:"column",alignItems:"center"}}>
                            <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center"}}
                                onPress={()=>{
                                    this.sharetoPyq(this.state.share);
                                    this.sharetoSomeone.dismiss();
                                }}
                            >
                            <Icon name={'wechat'} size={45} color='#00CD00'/>
                            <Text>朋友圈</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                    </PopupDialog>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {

    },

});


module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        trainer:state.user.trainer,
        activityList:state.activity.activityList,
        myEvents:state.activity.myEvents,
        myTakenEvents:state.activity.myTakenEvents,
        visibleEvents:state.activity.visibleEvents,
        activityOnFresh:state.activity.activityOnFresh,
    })
)(Activity);



