import React,{Component} from 'react';
import {
    Dimensions,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    Modal,
    DeviceEventEmitter,
    Alert
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputWrapper from 'react-native-text-input-wrapper';
import ActionSheet from 'react-native-actionsheet';
import VenueInspect from '../../components/venue/VenueInspect';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper';
import Coach from '../../components/Coach';
import DatePicker from 'react-native-datepicker';
import DateFilter from '../../utils/DateFilter';
import SelectVenue from '../../components/venue/SelectVenue';

import{
    distributeCustomerPlan
} from '../../action/CourseActions';

import {getAccessToken,} from '../../action/UserActions';

class CreateCustomerPlan extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    _handlePress1(index) {

        if(index!==0){
            var memberLevel = this.state.memberLevelButtons[index];
            var memberLevelCode = index;
            this.setState({plan:Object.assign(this.state.plan,{memberLevel:memberLevelCode,memberLevelName:memberLevel})});
        }

    }

    show(actionSheet) {
        this[actionSheet].show();
    }

    setCoursePlace(coursePlace)
    {
        this.setState({venue:coursePlace});

    }

    navigate2SelectVenue()
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'VenueInspect',
                component: SelectVenue,
                params: {
                    setPlace:this.setCoursePlace.bind(this)
                }
            })
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
                    setPlace:this.setCoursePlace.bind(this)
                }
            })
        }
    }

    setCoach(type,coach)
    {
        if(type=='coach'){
            this.setState({planNew:Object.assign(this.state.planNew,{coachId:coach.trainerId.toString(),coachName:coach.perName})});
        }else{
            this.setState({planNew:Object.assign(this.state.planNew,{sparringId:coach.trainerId.toString(),sparringName:coach.perName})});
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

    verifyDate(date)
    {
        this.state.selectTime=true;

        var curDay=new Date();
        var hour=date.getHours();
        var day=date.getDay();

        if(((date-curDay)>0&&curDay.getDate()!=date.getDate())||(curDay.getDate()==date.getDate()&&(hour-curDay.getHours()>2)))
        {
            var deadlineTime = DateFilter.filter(date,'yyyy-mm-dd hh:mm');
            this.setState({plan:Object.assign(this.state.plan,{deadline:date,deadlineTime:deadlineTime}),selectTime:false});

        }
        else{

            setTimeout(()=>{
                Alert.alert('错误','您所选的日期必须在两小时之后,请重新选择',[{text:'确认',onPress:()=>{

                }}]);
            },800)
            this.setState({selectTime:false});
        }

    }

    searchMember(info){
        this.props.dispatch(searchMember(info)).then((json)=>{
            if(json.re==1){
                this.setState({member:json.data});
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }else{
                    alert('该用户未注册，是否邀请');
                    //TODO:微信分享邀请好友
                }
            }
        });
    }

    removeMember(timeList,rowData) {

        var index=-1;
        timeList.map((time, i) => {
            if(time.id==rowData.id){
                index = i;
            }
        });
        if(index!==-1){
            timeList.splice(index, 1);
            this.setState({timeList:timeList});
        }
    }

    renderRow(rowData,sectionId,rowId){

        var dayMap=['周一','周二','周三','周四','周五','周六','周日']
        var dayStr=dayMap[rowData.day-1]

        var row=(
            <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',marginBottom:5,padding:5,borderBottomWidth:1,
            borderColor:'#eee',borderRadius:8,margin:5}}>

                <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                    <View style={{flex:1}}>
                        <Text style={{color:'#888'}}>{rowData.id}.</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{color:'#888'}}>{dayStr}</Text>
                    </View>
                    <View style={{flex:2,}}>
                        <Text style={{color:'#aaa'}}>{rowData.startTime}   -</Text>
                    </View>
                    <View style={{flex:2,marginLeft:5}}>
                        <Text style={{color:'#aaa'}}>{rowData.endTime}</Text>
                    </View>
                </View>

                <TouchableOpacity style={{flex:1}}
                                  onPress={()=>{
                                        this.removeMember(this.state.timeList,rowData);
                }}>
                    <Icon name={'minus-circle'} size={20} color="#FF4040"/>
                </TouchableOpacity>
            </View>
        );
        return row;
    }

    constructor(props) {
        super(props);
        this.state={
            dialogShow: false,
            modalVisible:false,
            selectTime:false,
            plan:{planItem:null,planPlace:null,unitId:null,planTime:null,phoneNum:null,memberLevel:null,memberLevelName:null,hasCoach:0,
            coachId:null,coachName:null,deadline:null,deadlineTime:null},
            doingFetch: false,
            isRefreshing: false,
            memberLevelButtons:['取消','业余小白','初级爱好者','业余高手','专业运动员'],

            planNew:{hasCoach:'0',coachId:null,remark:'',coachName:null},
            remark:''
        }
    }


    render() {
        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;
        const memberLevelButtons=['取消','业余小白','初级爱好者','业余高手','专业运动员'];

        return (
            <View style={{flex:1}}>

                <Toolbar width={width} title="定制课程" navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                         }}
                >

                <View style={{flex:5,backgroundColor:'#fff'}}>


                    <View style={{height:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>

                    </View>

                    {/*需求描述*/}
                    <View style={{flex:3,margin:10,marginTop:5,marginBottom:5}}>
                        <Text>需求描述:</Text>
                        <TextInput
                            style={{height:height*200/736,padding:8,fontSize:13,marginTop:5,borderRadius:5,backgroundColor:'#eee'}}
                            onChangeText={(text) =>
                                        {
                                           this.setState({remark:text});
                                        }}
                            value={this.state.remark}
                            placeholder='请描述需求...'
                            placeholderTextColor="#aaa"
                            underlineColorAndroid="transparent"
                            multiline={true}
                        />
                    </View>

                    <View style={{flex:2}}>
                        {/*联系方式*/}
                        <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                            <View style={{flex:1}}>
                                <Text style={{color:'#343434'}}>联系方式：</Text>
                            </View>
                            <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                                {
                                    this.props.personInfo.mobilePhone!==null?

                                        <View style={{height:30,marginLeft:20,justifyContent:'center',alignItems: 'center',}}>
                                            <Text style={{color:'#222'}}>
                                                {this.props.personInfo.mobilePhone}
                                            </Text>
                                        </View>:
                                        <TextInputWrapper
                                            placeholderTextColor='#888'
                                            textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                            placeholder="请输入联系方式"
                                            val={this.state.plan.phoneNum}
                                            onChangeText={
                                    (value)=>{
                                        this.setState({plan:Object.assign(this.state.plan,{phoneNum:value})})
                                    }}
                                            onCancel={
                                    ()=>{this.setState({plan:Object.assign(this.state.plan,{phoneNum:null})});}
                                }
                                        />
                                }
                            </View>
                        </View>

                        {/*选择教练*/}
                        <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                            <View style={{flex:1}}>
                                <Text>选择教练：</Text>
                            </View>

                            {
                                this.state.plan.coachId==null?

                                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center'
                                }}>

                                        {
                                            this.state.plan.hasCoach=='1'?
                                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',backgroundColor:'#66CDAA',padding:5,borderRadius:3
                                        ,borderWidth:1,borderColor:'#66CDAA'}}>
                                                    <Text style={{color:'#fff'}}>是</Text>
                                                </View>:
                                                <TouchableOpacity style={{flex:1,borderRadius:3,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',borderColor:'#eee',padding:5,borderWidth:1,
                                        }}
                                                                  onPress={()=>{
                                            this.setState({planNew:Object.assign(this.state.planNew,{hasCoach:'1'})});
                                            this.navigate2Coach('coach');
                                        }}
                                                >
                                                    <Text style={{color:'#666'}}>是</Text>
                                                </TouchableOpacity>
                                        }

                                        {
                                            this.state.plan.hasCoach=='0'?
                                                <View style={{flex:1,borderRadius:3,flexDirection:'row',justifyContent:'center',padding:5
                                        ,marginRight:1,backgroundColor:'#66CDAA',borderWidth:1,borderColor:'#66CDAA'}}>
                                                    <Text style={{color:'#fff'}}>否</Text>
                                                </View>:
                                                <TouchableOpacity style={{flex:1,borderRadius:3,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',padding:5,
                                        marginRight:1}}
                                                                  onPress={()=>{
                                              this.setState({planNew:Object.assign(this.state.planNew,{hasCoach:'0'})});
                                          }}
                                                >
                                                    <Text style={{color:'#888'}}>否</Text>
                                                </TouchableOpacity>

                                        }

                                    </View> :
                                    <View style={{height:30,flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                                        <Text style={{marginLeft:20,fontSize:13,color:'#222'}}>
                                            {this.state.planNew.coachName}
                                        </Text>

                                        <TouchableOpacity style={{marginLeft:120,fontSize:13,color:'#222'}}
                                                          onPress={()=>{
                                                              var plan = this.state.planNew;
                                                              plan.coachId=null;
                                                              this.setState({planNew:plan});
                                                          }}>
                                            <Ionicons name={'md-close-circle'} size={18} color={'red'}/>
                                        </TouchableOpacity>
                                    </View>
                            }
                        </View>

                    </View>


                    {/*/!*计划时间*!/*/}
                    {/*<View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:10,marginBottom:5}}>*/}
                        {/*<View style={{flex:1}}>*/}
                            {/*<Text style={{color:'#343434'}}>计划时间：</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',*/}
                            {/*borderRadius:10}}>*/}
                            {/*<TextInputWrapper*/}
                                {/*placeholderTextColor='#888'*/}
                                {/*textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}*/}
                                {/*placeholder="请输入计划时间，如7月中旬..."*/}
                                {/*val={this.state.plan.planTime}*/}
                                {/*onChangeText={*/}
                                    {/*(value)=>{*/}
                                        {/*this.setState({plan:Object.assign(this.state.plan,{planTime:value})})*/}
                                    {/*}}*/}
                                {/*onCancel={*/}
                                    {/*()=>{this.setState({plan:Object.assign(this.state.plan,{planTime:null})});}*/}
                                {/*}*/}
                            {/*/>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                    {/*/!*训练项目*!/*/}
                    {/*<View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>*/}
                        {/*<View style={{flex:1}}>*/}
                            {/*<Text style={{color:'#343434'}}>训练项目：</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',*/}
                            {/*borderRadius:10}}>*/}
                            {/*<TextInputWrapper*/}
                                {/*placeholderTextColor='#888'*/}
                                {/*textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}*/}
                                {/*placeholder="请输入训练项目"*/}
                                {/*val={this.state.plan.planItem}*/}
                                {/*onChangeText={*/}
                                    {/*(value)=>{*/}
                                        {/*this.setState({plan:Object.assign(this.state.plan,{planItem:value})})*/}
                                    {/*}}*/}
                                {/*onCancel={*/}
                                    {/*()=>{this.setState({plan:Object.assign(this.state.plan,{planItem:null})});}*/}
                                {/*}*/}
                            {/*/>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                    {/*/!*训练地点*!/*/}
                    {/*<View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>*/}
                        {/*<View style={{flex:1}}>*/}
                            {/*<Text style={{color:'#343434'}}>训练地点：</Text>*/}
                        {/*</View>*/}

                        {/*{*/}
                            {/*this.state.venue==null?*/}
                                {/*<TouchableOpacity style={{flex:3,height:28,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',*/}
                            {/*borderRadius:10}}*/}
                                                  {/*onPress={()=>{*/}
                                {/*this.navigate2VenueInspect();*/}
                                 {/*//this.navigate2SelectVenue();*/}
                            {/*}}>*/}
                                    {/*<Text style={{marginLeft:20,fontSize:13,color:'#888'}}>*/}
                                        {/*请选择训练地点*/}
                                    {/*</Text>*/}
                                {/*</TouchableOpacity>:*/}
                                {/*<TouchableOpacity style={{flex:3,height:28,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',*/}
                            {/*borderRadius:10}}*/}
                                                  {/*onPress={()=>{*/}
                                {/*this.navigate2VenueInspect();*/}
                                 {/*//this.navigate2SelectVenue();*/}
                            {/*}}>*/}
                                    {/*<View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>*/}
                                        {/*<Text style={{color:'#222',fontSize:13}}>{this.state.venue.name}</Text>*/}
                                    {/*</View>*/}
                                    {/*<TouchableOpacity style={{width:60,justifyContent:'center',alignItems: 'center',flexDirection:'row',marginLeft:20,padding:5}}*/}
                                                      {/*onPress={()=>{*/}
                                                              {/*var venue = null;*/}
                                                              {/*this.setState({venue:venue});*/}
                                                          {/*}}>*/}
                                        {/*<Ionicons name={'md-close-circle'} size={20} color={'red'}/>*/}
                                    {/*</TouchableOpacity>*/}

                                {/*</TouchableOpacity>*/}

                        {/*}*/}

                    {/*</View>*/}

                    {/*/!*自身水平*!/*/}
                    {/*<View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>*/}
                        {/*<View style={{flex:1}}>*/}
                            {/*<Text>自身水平：</Text>*/}
                        {/*</View>*/}
                        {/*<TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',*/}
                            {/*borderRadius:10}}*/}
                                          {/*onPress={()=>{ this.show('actionSheet1'); }}>*/}

                            {/*{*/}
                                {/*this.state.plan.memberLevel==null?*/}
                                    {/*<View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>*/}
                                        {/*<Text style={{color:'#888',fontSize:13}}>请选择自身水平：</Text>*/}
                                    {/*</View> :*/}
                                    {/*<View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>*/}
                                        {/*<Text style={{color:'#444',fontSize:13}}>{this.state.plan.memberLevelName}</Text>*/}
                                    {/*</View>*/}
                            {/*}*/}
                            {/*<View style={{width:60,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>*/}
                                {/*<Icon name={'angle-right'} size={30} color="#fff"/>*/}
                            {/*</View>*/}
                            {/*<ActionSheet*/}
                                {/*ref={(o) => {*/}
                                        {/*this.actionSheet1 = o;*/}
                                    {/*}}*/}
                                {/*title="请选择自身水平"*/}
                                {/*options={memberLevelButtons}*/}
                                {/*cancelButtonIndex={CANCEL_INDEX}*/}
                                {/*destructiveButtonIndex={DESTRUCTIVE_INDEX}*/}
                                {/*onPress={*/}
                                        {/*(data)=>{ this._handlePress1(data); }*/}
                                    {/*}*/}
                            {/*/>*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}

                    {/*/!*活动时间*!/*/}
                    {/*<View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>*/}
                        {/*<View style={{flex:1}}>*/}
                            {/*<Text>有效期至</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',borderRadius:10}}>*/}
                            {/*{*/}
                                {/*this.state.plan.deadlineTime==null?*/}
                                    {/*<View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>*/}
                                        {/*<Text style={{color:'#888',fontSize:13}}>请选择有效期至：</Text>*/}
                                    {/*</View> :*/}
                                    {/*<View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>*/}
                                        {/*<Text style={{color:'#444',fontSize:13}}>{this.state.plan.deadlineTime}</Text>*/}
                                    {/*</View>*/}
                            {/*}*/}

                            {/*<View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>*/}
                                {/*<DatePicker*/}
                                    {/*style={{width:60,marginLeft:0,borderWidth:0}}*/}
                                    {/*customStyles={{*/}
                                        {/*placeholderText:{color:'transparent',fontSize:12},*/}
                                        {/*dateInput:{height:30,borderWidth:0},*/}
                                        {/*dateTouchBody:{marginRight:25,height:22,borderWidth:0},*/}
                                    {/*}}*/}
                                    {/*mode="datetime"*/}
                                    {/*placeholder="选择"*/}
                                    {/*format="YYYY-MM-DD HH:mm"*/}
                                    {/*minDate={new Date()}*/}
                                    {/*confirmBtnText="确认"*/}
                                    {/*cancelBtnText="取消"*/}
                                    {/*showIcon={true}*/}
                                    {/*iconComponent={<Icon name={'angle-right'} size={30} color="#fff"/>}*/}
                                    {/*onDateChange={(date) => {*/}
                                        {/*if(this.state.selectTime==false)*/}
                                        {/*{*/}
                                            {/*//TODO:校检date的合法性*/}
                                            {/*var reg=/([\d]{4})-([\d]{2})-([\d]{2})\s([\d]{2})\:([\d]{2})/;*/}
                                            {/*var re=reg.exec(date);*/}
                                            {/*if(re)*/}
                                            {/*{*/}
                                                {/*var tmpDate=new Date(re[1],parseInt(re[2])-1,re[3],re[4],re[5])*/}
                                                {/*this.verifyDate(tmpDate);*/}
                                            {/*}*/}
                                        {/*}else{*/}
                                        {/*}*/}

                                    {/*}}*/}
                                {/*/>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                    <View style={{backgroundColor:'#fff',padding:10}}>
                        <Text style={{color:'#aaa',fontSize:11}}>
                            温馨提示：您发布的内容应合法、真实、健康、共创文明的网络环境
                        </Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',height:60,justifyContent:'center',alignItems:'center',width:width}}>
                    <TouchableOpacity style={{width:width*2/3,backgroundColor:'#66CDAA',borderRadius:10,padding:10,flexDirection:'row',
                        justifyContent:'center'}}
                                      onPress={()=>{
                            this.props.dispatch(distributeCustomerPlan(this.state.planNew,this.state.remark)).then((json)=>{
                                if(json.re==1)
                                {
                                       Alert.alert('信息','定制课程已发布成功',[{text:'确认',onPress:()=>{
                                            this.goBack();

                                       }}]);
                                }else{
                                    if(json.re==-100){
                                        this.props.dispatch(getAccessToken(false));
                                    }
            }
                            })
                      }}>
                        <Text style={{color:'#fff',fontSize:15}}>发布</Text>
                    </TouchableOpacity>
                </View>

                </Toolbar>

            </View>
        );
    }
    componentDidMount()
    {
        this.venueListener=DeviceEventEmitter.addListener('on_venue_confirm', (data)=>{
            if(data)
                this.setState({venue:data})
        });
    }

    componentWillUnmount()
    {
        if(this.venueListener)
            this.venueListener.remove();
    }

}

var styles = StyleSheet.create({
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});


module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        myGroupList:state.activity.myGroupList,
        groupOnFresh:state.activity.groupOnFresh
    })
)(CreateCustomerPlan);


