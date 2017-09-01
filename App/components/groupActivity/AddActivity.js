
import React,{Component} from 'react';
import {
    Alert,
    Dimensions,
    TextInput,
    ScrollView,
    ListView,
    Image,
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-datepicker';
import DateFilter from '../../utils/DateFilter';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'
import {
    releaseActivity
} from '../../action/ActivityActions';
import TextInputWrapper from '../../encrypt/TextInputWrapper';
import VenueInspect from '../../components/venue/VenueInspect';
import CreateGroup from './CreateGroup';
import Coach from '../../components/Coach';
import SelectTime from './SelectTime';

import {
    fetchMyGroupList,disableMyGroupOnFresh,enableActivityOnFresh
} from '../../action/ActivityActions';

import {
    getAccessToken,
} from '../../action/UserActions';

/**
 * 发布活动
 */
class AddActivity extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
            this.props.dispatch(enableActivityOnFresh());
        }
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState(nextProps)
    }

    setEventPlace(eventPlace)
    {
        this.setState({event:Object.assign(this.state.event,{eventPlace:eventPlace.name,unitId:eventPlace.unitId,feeDes:eventPlace.feeDes})});
        this.setState({feeDes:eventPlace.feeDes});

    }

    setCoach(type,coach)
    {
        if(type=='coach'){
            this.setState({event:Object.assign(this.state.event,{coachId:coach.trainerId,coachName:coach.perName})});
        }else{
            this.setState({event:Object.assign(this.state.event,{sparringId:coach.trainerId,sparringName:coach.perName})});
        }
    }

    navigate2VenueInspect()
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'VenueInspect',
                component: VenueInspect,
                params: {
                    setPlace:this.setEventPlace.bind(this)
                }
            })
        }
    }

    navigate2Coach(flag)
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'coach',
                component: Coach,
                params: {
                    setCoach:this.setCoach.bind(this),
                    flag:flag
                }
            })
        }
    }

    navigate2CreateGroup()
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'create_group',
                component: CreateGroup,
                params: {


                }
            })
        }
    }

    setScheduleTime(time){
        var event = this.state.event;
        event.time= time;
        this.setState({event:event});

    }

    navigate2ActivitySchedule()
    {
        const { navigator} =this.props;
        if(navigator){
            navigator.push({
                name:'activity_schedule',
                component:SelectTime,
                params: {
                    setScheduleTime: this.setScheduleTime.bind(this)
                }
            })
        }
    }

    release()
    {
        var event = this.state.event;
        this.props.dispatch(releaseActivity(event)).then((json)=>{
            if(json.re==1){
                Alert.alert('信息','新活动创建成功',[{text:'确认',onPress:()=>{
                    this.goBack()
                }}]);
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));

                }
            }

        });
    }


    //对象水平
    _handlePress1(index) {

        if(index!==0){
            var memberLevel = this.state.memberLevelButtons[index];
            var memberLevelCode = index;
            this.setState({event:Object.assign(this.state.event,{memberLevel:memberLevelCode,memberLevelName:memberLevel})});
        }

    }

    //选类型
    _handlePress2(index) {

        if(index!==0){
            var eventType = this.state.eventTypeButtons[index];
            var eventTypeCode = index;
            this.setState({event:Object.assign(this.state.event,{eventType:eventType})});
        }

    }

    //选群组
    _handlePress3(index,groupNameButtons) {

        if(index!==0){
            var groupName = groupNameButtons[index];
            if(groupName=='新建群组'){
                this.navigate2CreateGroup();
            }else{
                var groupId = null;
                var groupNum = null;
                var groupName = groupNameButtons[index];
                var {myGroupList} = this.props;
                if(myGroupList!==null&&myGroupList!==undefined){
                    myGroupList.map((group,i)=>{
                        if(group.groupName==groupName){
                            groupId = group.groupId;
                           // groupNum =  group.groupInfo.groupNowMemNum;
                        }
                    })
                }

                this.setState({event:Object.assign(this.state.event,{groupName:groupName,groupId:groupId})});
            }
        }

    }

    //选付费方式
    _handlePress4(index,groupNameButtons) {

        if(index!==0){
            var costType = this.state.costTypeButtons[index];
            var costTypeCode = index;
            this.setState({event:Object.assign(this.state.event,{costType:costType,costTypeCode:costTypeCode})});
        }

    }

    show(actionSheet) {
        this[actionSheet].show();
    }

    fetchMyGroupList(){
        this.state.doingFetch=true;
        this.props.dispatch(fetchMyGroupList()).then((json)=> {
            if(json.re==-100){
                this.props.dispatch(getAccessToken(false));
            }else{
                if(json.re==1){
                    this.props.dispatch(disableMyGroupOnFresh());

                    var groupNameButtons=['取消','新建群组'];
                    var {myGroupList} = this.props;
                    if(myGroupList!==null&&myGroupList!==undefined){
                        myGroupList.map((group,i)=>{
                            groupNameButtons.push(group.groupName);
                        })
                    }
                    this.setState({doingFetch:false,groupNameButtons:groupNameButtons});
                }
            }

        }).catch((e)=>{
            this.props.dispatch(disableMyGroupOnFresh());
            this.setState({doingFetch:false,groupNameButtons:groupNameButtons});
            alert(e)
        });

    }

    constructor(props) {
        super(props);
        this.state={
            doingFetch: false,
            selectTime:false,
            eventTime:null,
            event:{eventName:null,eventBrief:'',eventType:null,eventPlace:null,unitId:null,feeDes:null,eventMaxMemNum:null,
                   memberLevel:null,hasCoach:0,hasSparring:0,coachId:null,coachName:null,sparringId:null,sparringName:null,
                   groupName:null,groupId:null,cost:null,costType:null,filedNum:null,time:{startTime:null,endTime:null,eventWeek:null,isSchedule:null,},},

            memberLevelButtons:['取消','业余小白','初级爱好者','业余高手','专业运动员'],
            eventTypeButtons:['取消','公开','组内'],
            groupNameButtons:['取消','新建群组'],
            costTypeButtons:['取消',' 按人付费','按小时付费','总费用','按每人次收费','按每人每小时收费','按场地小时收费'],
        }
    }

    render() {

        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;

        var {myGroupOnFresh} = this.props;
        if(myGroupOnFresh==true) {
            if (this.state.doingFetch == false)
                this.fetchMyGroupList();
        }

        const memberLevelButtons=['取消','业余小白','初级爱好者','业余高手','专业运动员'];
        const eventTypeButtons=['取消','公开','组内'];
        const costTypeButtons=['取消',' 按人付费','按小时付费','总费用','按每人次收费','按每人每小时收费','按场地小时收费'];

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>


                <Toolbar width={width} title="发布活动" navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                         }}
                >
                    <ScrollView style={{height:height-200,width:width,backgroundColor:'#fff',padding:5}}>


                        {/*活动类型*/}
                        <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>活动类型：</Text>
                            </View>
                            <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                              onPress={()=>{ this.show('actionSheet2'); }}>
                                {
                                    this.state.event.eventType==null?
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#888',fontSize:13}}>请选择活动类型：</Text>
                                        </View> :
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#444',fontSize:13}}>{this.state.event.eventType}</Text>
                                        </View>

                                }
                                <View style={{width:60,flexDirection:'row',justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                    <Icon name={'angle-right'} size={30} color="#fff"/>
                                </View>
                                <ActionSheet
                                    ref={(p) => {
                                        this.actionSheet2 =p;
                                    }}
                                    title="请选择活动类型"
                                    options={eventTypeButtons}
                                    cancelButtonIndex={CANCEL_INDEX}
                                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                    onPress={
                                        (data)=>{ this._handlePress2(data); }
                                    }
                                />
                            </TouchableOpacity>
                        </View>

                        {/*活动名称*/}
                        <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>活动名称：</Text>
                            </View>
                            <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                                <TextInputWrapper
                                    placeholderTextColor='#888'
                                    textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                    placeholder="请输入活动名称"
                                    val={this.state.event.eventName}
                                    onChangeText={
                                    (value)=>{
                                        this.setState({event:Object.assign(this.state.event,{eventName:value})})
                                    }}
                                    onCancel={
                                    ()=>{this.setState({event:Object.assign(this.state.event,{eventName:null})});}
                                }
                                />
                            </View>
                        </View>

                        {/*活动时间*/}
                        <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>活动时间：</Text>
                            </View>
                            <TouchableOpacity style={{height:30,flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10 }}
                                               onPress={()=>{this.navigate2ActivitySchedule();}}>
                                {

                                    this.state.event.time.startTime==null?

                                    <View
                                        style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>请选择活动时间：</Text>
                                    </View>:
                                <View
                                    style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{fontSize:13}}>{this.state.event.time.startTimeView}-{this.state.event.time.endTimeView} </Text>
                                </View>
                                }

                            </TouchableOpacity>

                        </View>

                        {/*活动地点*/}
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>活动地点：</Text>
                            </View>

                            {
                                this.state.event.unitId==null?
                                    <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                                      onPress={
                                  ()=>{
                                      this.navigate2VenueInspect()
                                  }}
                                    >
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#888',fontSize:13}}>请选择活动地点：</Text>
                                        </View>
                                        <View style={{width:60,justifyContent:'center',alignItems: 'center',flexDirection:'row',marginLeft:20}}>
                                            <Icon name={'angle-right'} size={30} color="#fff"/>
                                        </View>
                                    </TouchableOpacity> :

                                    <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                                      onPress={
                                  ()=>{
                                      this.navigate2VenueInspect()
                                  }}
                                    >
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#222',fontSize:13}}>{this.state.event.eventPlace}</Text>
                                        </View>

                                        <TouchableOpacity style={{width:60,justifyContent:'center',alignItems: 'center',flexDirection:'row',marginLeft:20,padding:5}}
                                                          onPress={()=>{
                                                              var event = this.state.event;
                                                              event.unitId=null;
                                                              event.eventPlace=null;
                                                              this.setState({event:event});
                                                          }}>
                                            <Ionicons name={'md-close-circle'} size={20} color={'red'}/>
                                        </TouchableOpacity>

                                    </TouchableOpacity>

                            }

                        </View>


                        {/*场地需求*/}

                        {
                            (this.state.event.time.isSchedule==0)?
                                <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:3}}>
                                    <View style={{flex:1}}>
                                        <Text>场地数目：</Text>
                                    </View>
                                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                                        <TextInputWrapper
                                            placeholderTextColor='#888'
                                            textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                            placeholder="请输入需要的场地数目:"
                                            val={this.state.event.eventMaxMemNum}
                                            onChangeText={
                                    (value)=>{
                                        this.setState({event:Object.assign(this.state.event,{filedNum:value})})
                                    }}
                                            onCancel={
                                    ()=>{this.setState({event:Object.assign(this.state.event,{filedNum:null})});}
                                }
                                        />
                                    </View>
                                </View>:null
                        }

                        {/*邀请群组*/}
                        <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>邀请群组：</Text>
                            </View>
                            <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                              onPress={()=>{ this.show('actionSheet3'); }}>

                                {
                                    this.state.event.groupName==null?
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#888',fontSize:13}}>请选择群组：</Text>
                                        </View> :
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#444',fontSize:13}}>{this.state.event.groupName}</Text>
                                        </View>
                                }
                                <View style={{width:60,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                    <Icon name={'angle-right'} size={30} color="#fff"/>
                                </View>
                                <ActionSheet
                                    ref={(o) => {
                                        this.actionSheet3 = o;
                                    }}
                                    title="请选择对象水平"
                                    options={this.state.groupNameButtons}
                                    cancelButtonIndex={CANCEL_INDEX}
                                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                    onPress={
                                        (data)=>{ this._handlePress3(data,this.state.groupNameButtons); }
                                    }
                                />
                            </TouchableOpacity>
                        </View>


                        {/*付费方式*/}
                        <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>付费方式：</Text>
                            </View>
                            <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                              onPress={()=>{ this.show('actionSheet4'); }}>
                                {
                                    this.state.event.costType==null?
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#888',fontSize:13}}>请选择付费方式：</Text>
                                        </View> :
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#444',fontSize:13}}>{this.state.event.costType}</Text>
                                        </View>

                                }
                                <View style={{width:60,flexDirection:'row',justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                    <Icon name={'angle-right'} size={30} color="#fff"/>
                                </View>
                                <ActionSheet
                                    ref={(p) => {
                                        this.actionSheet4 =p;
                                    }}
                                    title="请选择付费方式"
                                    options={costTypeButtons}
                                    cancelButtonIndex={CANCEL_INDEX}
                                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                    onPress={
                                        (data)=>{ this._handlePress4(data); }
                                    }
                                />
                            </TouchableOpacity>
                        </View>



                        {/*人均费用*/}
                        <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>人均费用：</Text>
                            </View>
                            <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                                <TextInputWrapper
                                    placeholderTextColor='#888'
                                    textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                    placeholder="请输入人均费用"
                                    val={this.state.event.cost}
                                    onChangeText={
                                    (value)=>{
                                        this.setState({event:Object.assign(this.state.event,{cost:value})})
                                    }}
                                    onCancel={
                                    ()=>{this.setState({event:Object.assign(this.state.event,{cost:null})});}
                                }
                                />
                            </View>
                        </View>

                        {
                            (this.state.feeDes!=null&&this.state.feeDes!=undefined)?
                                <View style={{height:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',marginLeft:5}}>
                                <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center'}}>
                                    <Text style={{fontSize:12,color:'#aaa'}}>
                                        (Tips：{this.state.feeDes})
                                    </Text>
                                </View>
                            </View>:null

                        }

                        {
                            (this.state.event.eventType=='公开'||this.state.event.eventType==null||this.state.event.eventType==undefined)?
                                <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:3}}>
                                    <View style={{flex:1}}>
                                        <Text>活动人数：</Text>
                                    </View>
                                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                                        <TextInputWrapper
                                            placeholderTextColor='#888'
                                            textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                            placeholder="请输入活动人数"
                                            val={this.state.event.eventMaxMemNum}
                                            onChangeText={
                                    (value)=>{
                                        this.setState({event:Object.assign(this.state.event,{eventMaxMemNum:value})})
                                    }}
                                            onCancel={
                                    ()=>{this.setState({event:Object.assign(this.state.event,{eventMaxMemNum:null})});}
                                }
                                        />
                                    </View>
                                </View>:null
                        }

                        {
                            (this.state.event.eventType=='公开'||this.state.event.eventType==null||this.state.event.eventType==undefined)?

                                <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                    <View style={{flex:1}}>
                                        <Text>对象水平：</Text>
                                    </View>
                                    <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                                      onPress={()=>{ this.show('actionSheet1'); }}>

                                        {
                                            this.state.event.memberLevel==null?
                                                <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                    <Text style={{color:'#888',fontSize:13}}>请选择对象水平：</Text>
                                                </View> :
                                                <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                    <Text style={{color:'#444',fontSize:13}}>{this.state.event.memberLevelName}</Text>
                                                </View>
                                        }
                                        <View style={{width:60,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                            <Icon name={'angle-right'} size={30} color="#fff"/>
                                        </View>
                                        <ActionSheet
                                            ref={(o) => {
                                        this.actionSheet1 = o;
                                    }}
                                            title="请选择对象水平"
                                            options={memberLevelButtons}
                                            cancelButtonIndex={CANCEL_INDEX}
                                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                            onPress={
                                        (data)=>{ this._handlePress1(data); }
                                    }
                                        />
                                    </TouchableOpacity>
                                </View>:null
                        }


                        {/*邀请教练*/}
                        <View style={{height:30*height/568,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>邀请教练：</Text>
                            </View>

                            {
                                this.state.event.coachId==null?

                                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center'
                                }}>

                                            {
                                                this.state.event.hasCoach==1?
                                                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',backgroundColor:'#66CDAA',padding:5,borderRadius:3
                                        ,borderWidth:1,borderColor:'#66CDAA'}}>
                                                        <Text style={{color:'#fff'}}>是</Text>
                                                    </View>:
                                                    <TouchableOpacity style={{flex:1,borderRadius:3,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',borderColor:'#eee',padding:5,borderWidth:1,
                                        }}
                                                                      onPress={()=>{
                                            this.setState({event:Object.assign(this.state.event,{hasCoach:1})});
                                            this.navigate2Coach('coach');
                                        }}
                                                    >
                                                        <Text style={{color:'#666'}}>是</Text>
                                                    </TouchableOpacity>
                                            }

                                            {
                                                this.state.event.hasCoach==0?
                                                    <View style={{flex:1,borderRadius:3,flexDirection:'row',justifyContent:'center',padding:5
                                        ,marginRight:1,backgroundColor:'#66CDAA',borderWidth:1,borderColor:'#66CDAA'}}>
                                                        <Text style={{color:'#fff'}}>否</Text>
                                                    </View>:
                                                    <TouchableOpacity style={{flex:1,borderRadius:3,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',padding:5,
                                        marginRight:1}}
                                                                      onPress={()=>{
                                              this.setState({event:Object.assign(this.state.event,{hasCoach:0})});
                                          }}
                                                    >
                                                        <Text style={{color:'#888'}}>否</Text>
                                                    </TouchableOpacity>

                                            }

                                        </View> :
                                    <View style={{height:30,flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                                        <Text style={{marginLeft:20,fontSize:13,color:'#222'}}>
                                            {this.state.event.coachName}
                                        </Text>

                                        <TouchableOpacity style={{marginLeft:120,fontSize:13,color:'#222'}}
                                                          onPress={()=>{
                                                              var event = this.state.event;
                                                              event.coachId=null;
                                                              this.setState({event:event});
                                                          }}>
                                            <Ionicons name={'md-close-circle'} size={18} color={'red'}/>
                                        </TouchableOpacity>
                                    </View>
                            }


                        </View>

                        {/*邀请陪练*/}
                        <View style={{height:30*height/568,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>邀请陪练：</Text>
                            </View>

                            {
                                this.state.event.sparringId==null?

                                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center'
                                }}>

                                            {
                                                this.state.event.hasSparring==1?
                                                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',backgroundColor:'#66CDAA',padding:5,borderRadius:3
                                        ,borderWidth:1,borderColor:'#66CDAA'}}>
                                                        <Text style={{color:'#fff'}}>是</Text>
                                                    </View>:
                                                    <TouchableOpacity style={{flex:1,borderRadius:3,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',borderColor:'#eee',padding:5,borderWidth:1,
                                        }}
                                                                      onPress={()=>{
                                            this.setState({event:Object.assign(this.state.event,{hasSparring:1})});
                                            this.navigate2Coach('sparring');
                                        }}
                                                    >
                                                        <Text style={{color:'#666'}}>是</Text>
                                                    </TouchableOpacity>
                                            }

                                            {
                                                this.state.event.hasSparring==0?
                                                    <View style={{flex:1,borderRadius:3,flexDirection:'row',justifyContent:'center',padding:5
                                        ,marginRight:1,backgroundColor:'#66CDAA',borderWidth:1,borderColor:'#66CDAA'}}>
                                                        <Text style={{color:'#fff'}}>否</Text>
                                                    </View>:
                                                    <TouchableOpacity style={{flex:1,borderRadius:3,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',padding:5,
                                        marginRight:1}}
                                                                      onPress={()=>{
                                              this.setState({event:Object.assign(this.state.event,{hasSparring:0})})
                                          }}
                                                    >
                                                        <Text style={{color:'#888'}}>否</Text>
                                                    </TouchableOpacity>
                                            }

                                        </View>
                                    :
                                    <View style={{height:30,flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                                        <Text style={{marginLeft:20,fontSize:13,color:'#222'}}>
                                            {this.state.event.sparringName}
                                        </Text>

                                        <TouchableOpacity style={{marginLeft:120,fontSize:13,color:'#222'}}
                                                          onPress={()=>{
                                                              var event = this.state.event;
                                                              event.sparringId=null;
                                                              this.setState({event:event});
                                                          }}>
                                            <Ionicons name={'md-close-circle'} size={18} color={'red'}/>
                                        </TouchableOpacity>
                                    </View>

                            }

                        </View>

                        {/*活动说明*/}
                        <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>活动说明：</Text>
                            </View>
                            <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>

                                <TextInputWrapper
                                    placeholderTextColor='#888'
                                    textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                    placeholder="请输入活动说明"
                                    val={this.state.event.eventBrief}
                                    onChangeText={
                                    (value)=>{
                                        this.setState({event:Object.assign(this.state.event,{eventBrief:value})})
                                    }}
                                    onCancel={
                                    ()=>{this.setState({event:Object.assign(this.state.event,{eventBrief:null})});}
                                }
                                />

                            </View>
                        </View>


                        <View style={{flex:1,backgroundColor:'#fff',padding:10}}>
                            <Text style={{color:'#aaa',fontSize:11}}>
                                温馨提示：您发布的内容应合法、真实、健康、共创文明的网络环境
                            </Text>
                        </View>
                    </ScrollView>


                    <TouchableOpacity style={{height:30,width:width*0.6,marginLeft:width*0.2,backgroundColor:'#66CDAA',margin:10,
                marginBottom:10,justifyContent:'center',alignItems: 'center',borderRadius:10,}}
                                      onPress={()=>{
                                      this.release();
                                      }}>
                        <Text style={{color:'#fff',fontSize:15}}>发 布</Text>
                    </TouchableOpacity>

                </Toolbar>

            </View>
        );
    }

}

var styles = StyleSheet.create({


});

module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        myGroupList:state.activity.myGroupList,
        myGroupOnFresh:state.activity.myGroupOnFresh
    })
)(AddActivity);

