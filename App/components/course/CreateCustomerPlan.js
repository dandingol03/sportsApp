import React,{Component} from 'react';
import {
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
import {BoxShadow} from 'react-native-shadow';
import VenueInspect from '../../components/venue/VenueInspect';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'


import{
    distributeCourse
} from '../../action/CourseActions';


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

    searchMember(info){
        this.props.dispatch(searchMember(info)).then((json)=>{
            if(json.re==1){
                this.setState({member:json.data});
            }else{
                alert('该用户未注册，是否邀请');
                //TODO:微信分享邀请好友
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
            plan:{planItem:null,planPlace:null,unitId:null,planTime:null,phoneNum:null,memberLevel:null,memberLevelName:null,hasCoach:0},
            doingFetch: false,
            isRefreshing: false,
            memberLevelButtons:['取消','无','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'],
        }
    }


    render() {
        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;
        const memberLevelButtons=['取消','无','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'];

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
            <View style={{flex:1}}>

                <Toolbar width={width} title="定制课程" navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                         }}
                >

                <View style={{flex:5,backgroundColor:'#fff'}}>

                    {/*计划时间*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:10,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>计划时间：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入计划时间，如7月中旬..."
                                val={this.state.plan.planTime}
                                onChangeText={
                                    (value)=>{
                                        this.setState({plan:Object.assign(this.state.plan,{planTime:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({plan:Object.assign(this.state.plan,{planTime:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*训练项目*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>训练项目：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入训练项目"
                                val={this.state.plan.planItem}
                                onChangeText={
                                    (value)=>{
                                        this.setState({plan:Object.assign(this.state.plan,{planItem:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({plan:Object.assign(this.state.plan,{planItem:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*训练地点*/}
                    <TouchableOpacity style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,
                        marginTop:5,marginBottom:5}}
                                      onPress={()=>{
                                this.navigate2VenueInspect();
                            }}
                    >
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>训练地点：</Text>
                        </View>
                        <View style={{flex:3,height:28,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            {
                                this.state.venue?
                                    <Text style={{marginLeft:20,fontSize:13,color:'#222'}}>
                                        {this.state.venue.name}
                                    </Text>:
                                    <Text style={{marginLeft:20,fontSize:13,color:'#888'}}>
                                        请选择训练地点
                                    </Text>
                            }

                        </View>
                    </TouchableOpacity>

                    {/*自身水平*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text>自身水平：</Text>
                        </View>
                        <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                          onPress={()=>{ this.show('actionSheet1'); }}>

                            {
                                this.state.plan.memberLevel==null?
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>请选择自身水平：</Text>
                                    </View> :
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.plan.memberLevelName}</Text>
                                    </View>
                            }
                            <View style={{width:60,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                <Icon name={'angle-right'} size={30} color="#fff"/>
                            </View>
                            <ActionSheet
                                ref={(o) => {
                                        this.actionSheet1 = o;
                                    }}
                                title="请选择自身水平"
                                options={memberLevelButtons}
                                cancelButtonIndex={CANCEL_INDEX}
                                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                onPress={
                                        (data)=>{ this._handlePress1(data); }
                                    }
                            />
                        </TouchableOpacity>
                    </View>


                    {/*联系方式*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>联系方式：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
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
                        </View>
                    </View>


                    {/*选择教练*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text>选择教练：</Text>
                        </View>

                        <BoxShadow setting={shadowOpt}>
                            <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center'
                                }}>

                                {
                                    this.state.plan.hasCoach==1?
                                        <View style={{flex:1,flexDirection:'row',justifyContent:'center',backgroundColor:'#66CDAA',padding:5,borderRadius:3
                                        ,borderWidth:1,borderColor:'#66CDAA'}}>
                                            <Text style={{color:'#fff'}}>是</Text>
                                        </View>:
                                        <TouchableOpacity style={{flex:1,borderRadius:3,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',borderColor:'#eee',padding:5,borderWidth:1,
                                        }}
                                                          onPress={()=>{
                                            this.setState({plan:Object.assign(this.state.plan,{hasCoach:1})});

                                        }}
                                        >
                                            <Text style={{color:'#666'}}>是</Text>
                                        </TouchableOpacity>
                                }

                                {
                                    this.state.plan.hasCoach==0?
                                        <View style={{flex:1,borderRadius:3,flexDirection:'row',justifyContent:'center',padding:5
                                        ,marginRight:1,backgroundColor:'#66CDAA',borderWidth:1,borderColor:'#66CDAA'}}>
                                            <Text style={{color:'#fff'}}>否</Text>
                                        </View>:
                                        <TouchableOpacity style={{flex:1,borderRadius:3,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',padding:5,
                                        marginRight:1}}
                                                          onPress={()=>{
                                              this.setState({plan:Object.assign(this.state.plan,{hasCoach:0})});
                                          }}
                                        >
                                            <Text style={{color:'#888'}}>否</Text>
                                        </TouchableOpacity>

                                }

                            </View>
                        </BoxShadow>

                    </View>

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
                            this.props.dispatch(distributeCourse(this.state.course,this.state.timeList,this.state.venue)).then((json)=>{
                                if(json.re==1)
                                {
                                       Alert.alert('信息','课程已发布成功',[{text:'确认',onPress:()=>{
                                            this.goBack();
                                            this.props.setMyCourseList();
                                       }}]);
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


