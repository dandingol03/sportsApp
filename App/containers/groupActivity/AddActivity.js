
import React,{Component} from 'react';
import {
    Alert,
    Dimensions,
    TextInput,
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
    Easing
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-datepicker';
import {BoxShadow} from 'react-native-shadow';
import DateFilter from '../../utils/DateFilter';
import {
    releaseActivity
} from '../../action/ActivityActions';

import TextInputWrapper from '../../encrypt/TextInputWrapper';
import VenueInspect from '../../components/venue/VenueInspect';
import CreateGroup from './CreateGroup';
import {
    fetchMyGroupList,disableGroupOnFresh
} from '../../action/ActivityActions';

class AddActivity extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    navigate2VenueInspect(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'VenueInspect',
                component: VenueInspect,
                params: {

                }
            })
        }
    }

    navigate2CreateGroup(){
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

    release()
    {
        var info = this.state.event;
        this.props.dispatch(releaseActivity(info)).then((json)=>{
            if(json.re==1){
                console.log('发布新活动');
            }

        });
    }

    verifyDate(date)
    {
        this.state.selectTime=true;

        var curDay=new Date();
        var hour=date.getHours();
        var day=date.getDay();

        if(((date-curDay)>0&&curDay.getDate()!=date.getDate())||(curDay.getDate()==date.getDate()&&(hour-curDay.getHours()>2)))
        {
            var eventTime = DateFilter.filter(date,'yyyy-mm-dd hh:mm');
            this.setState({event:Object.assign(this.state.event,{eventTime:date}),selectTime:false,eventTime:eventTime});

        }else{

            setTimeout(()=>{
                Alert.alert('错误','您所选的日期必须在两小时之后,请重新选择',[{text:'确认',onPress:()=>{

                }}]);
            },800)
            this.setState({selectTime:false});
        }

    }

    _handlePress1(index) {

        if(index!==0){
            var memberLevel = this.state.memberLevelButtons[index];
            var memberLevelCode = index;
            this.setState({event:Object.assign(this.state.event,{memberLevel:memberLevel})});
        }

    }

    _handlePress2(index) {

        if(index!==0){
            var eventType = this.state.eventTypeButtons[index];
            var eventTypeCode = index;
            this.setState({event:Object.assign(this.state.event,{type:eventType})});
        }

    }

    _handlePress3(index) {

        if(index!==0){
            var groupName = this.state.groupNameButtons[index];
            if(groupName=='新建群组'){
                this.navigate2CreateGroup();
            }else{
                var groupNameCode = index;
                this.setState({event:Object.assign(this.state.event,{groupName:groupName})});
            }
        }

    }

    show(actionSheet) {
        this[actionSheet].show();
    }

    fetchMyGroupList(){
        this.state.doingFetch=true;
        this.props.dispatch(fetchMyGroupList()).then(()=> {
            this.props.dispatch(disableGroupOnFresh());
            this.setState({doingFetch:false,})
        }).catch((e)=>{
            this.props.dispatch(disableGroupOnFresh());
            this.setState({doingFetch:false,});
            alert(e)
        });

    }

    constructor(props) {
        super(props);
        this.state={
            doingFetch: false,
            selectTime:false,
            eventTime:null,
            event:{eventBrief:'',type:null,eventName:null,eventTime:null,eventPlace:'1',eventMaxMemNum:null,
                   memberLevel:null,hasCoach:0,hasSparring:0,groupName:null},
            memberLevelButtons:['取消','无','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'],
            eventTypeButtons:['取消','公开','私人'],
            groupNameButtons:['取消','宇宙无敌战队组','骑摩托的部长队组','新建群组'],
        }
    }

    render() {

        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;


        // var {myGroupList} = this.props;
        // if(myGroupList==null){
        //     if(this.state.doingFetch==false)
        //         this.fetchMyGroupList();
        // }
        //const groupNameButtons=['取消'];
        // myGroupList.map((group,i)=>{
        //     groupNameButtons.push(group.groupInfo.groupName);
        // })

        const memberLevelButtons=['取消','无','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'];
        const eventTypeButtons=['取消','公开','私人'];
        const groupNameButtons=['取消','宇宙无敌战队组','骑摩托的部长队组','新建群组'];

        const shadowOpt = {
            width:224*width/320,
            height:25*height/568,
            color:"#000",
            border:0.5,
            radius:1,
            opacity:0.2,
            x:-0.5,
            y:1,
            style:{marginVertical:8}
        }

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',
                    backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{
                                          this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>发布活动</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </TouchableOpacity>
                </View>


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
                                this.state.event.type==null?
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>请选择活动类型：</Text>
                                    </View> :
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.event.type}</Text>
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
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>活动时间：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}>
                            {
                                this.state.event.eventTime==null?
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>请选择活动时间：</Text>
                                    </View> :
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.eventTime}</Text>
                                    </View>
                            }

                            <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                <DatePicker
                                    style={{width:60,marginLeft:0,borderWidth:0}}
                                    customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:25,height:22,borderWidth:0},
                                    }}
                                    mode="datetime"
                                    placeholder="选择"
                                    format="YYYY-MM-DD HH:mm"
                                    minDate={new Date()}
                                    confirmBtnText="确认"
                                    cancelBtnText="取消"
                                    showIcon={true}
                                    iconComponent={<Icon name={'angle-right'} size={30} color="#fff"/>}
                                    onDateChange={(date) => {
                                        if(this.state.selectTime==false)
                                        {
                                            //TODO:校检date的合法性
                                            var reg=/([\d]{4})-([\d]{2})-([\d]{2})\s([\d]{2})\:([\d]{2})/;
                                            var re=reg.exec(date);
                                            if(re)
                                            {
                                                var tmpDate=new Date(re[1],parseInt(re[2])-1,re[3],re[4],re[5])
                                                this.verifyDate(tmpDate);
                                            }
                                        }else{
                                        }

                                    }}
                                />
                            </View>
                        </View>


                    </View>

                    {/*活动地点*/}
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>活动地点：</Text>
                        </View>

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
                        </TouchableOpacity>
                    </View>


                {
                    (this.state.event.type=='公开'||this.state.event.type==null||this.state.event.type==undefined)?
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
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
                    (this.state.event.type=='公开'||this.state.event.type==null||this.state.event.type==undefined)?

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
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.event.memberLevel}</Text>
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

                    {
                        (this.state.event.type=='公开'||this.state.event.type==null||this.state.event.type==undefined)?
                            <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                <View style={{flex:1}}>
                                    <Text>邀请群组：</Text>
                                </View>
                                <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                                  onPress={()=>{ this.show('actionSheet3'); }}>

                                    {
                                        this.state.event.memberLevel==null?
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#888',fontSize:13}}>请选择群组：</Text>
                                            </View> :
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#444',fontSize:13}}>{this.state.event.memberLevel}</Text>
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
                                        options={groupNameButtons}
                                        cancelButtonIndex={CANCEL_INDEX}
                                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                        onPress={
                                        (data)=>{ this._handlePress3(data); }
                                    }
                                    />
                                </TouchableOpacity>
                            </View>:null

                    }

                {
                    this.state.event.type=='私人'?

                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>选择群组：</Text>
                        </View>
                        <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                          onPress={()=>{ this.show('actionSheet3'); }}>

                            {
                                this.state.event.memberLevel==null?
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>请选择群组：</Text>
                                    </View> :
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.event.memberLevel}</Text>
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
                                options={groupNameButtons}
                                cancelButtonIndex={CANCEL_INDEX}
                                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                onPress={
                                        (data)=>{ this._handlePress3(data); }
                                    }
                            />
                        </TouchableOpacity>
                    </View>:null

                }



                    <View style={{height:30*height/568,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>邀请教练：</Text>
                        </View>

                        <BoxShadow setting={shadowOpt}>
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
                                            this.setState({event:Object.assign(this.state.event,{hasCoach:1})})
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
                                              this.setState({event:Object.assign(this.state.event,{hasCoach:0})})
                                          }}
                                    >
                                        <Text style={{color:'#888'}}>否</Text>
                                    </TouchableOpacity>

                            }

                        </View>
                        </BoxShadow>

                    </View>


                    <View style={{height:30*height/568,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>邀请陪练：</Text>
                        </View>

                        <BoxShadow setting={shadowOpt}>
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
                                            this.setState({event:Object.assign(this.state.event,{hasCoach:1})})
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
                                              this.setState({event:Object.assign(this.state.event,{hasCoach:0})})
                                          }}
                                        >
                                            <Text style={{color:'#888'}}>否</Text>
                                        </TouchableOpacity>

                                }

                            </View>
                        </BoxShadow>

                    </View>


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
    })
)(AddActivity);

