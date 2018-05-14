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
import CourseTimeModal from './CourseTimeModal';
import VenueInspect from '../../components/venue/VenueInspect';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper';
import PopupDialog,{ScaleAnimation,DefaultAnimation,SlideAnimation} from 'react-native-popup-dialog';
import ActionSheet from 'react-native-actionsheet';
import SelectVenue from '../../components/venue/SelectVenue';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });
import {
    distributeCourse,
    modifyCourse,
    enableCoursesOfCoachOnFresh, modifyClassDetail
} from '../../action/CourseActions';
import {getAccessToken,} from '../../action/UserActions';

class ModifyBadmintonCourse extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
    constructor(props) {
        super(props);
        this.state={
            dialogShow: false,
            modalVisible:false,
            classDetail:{contentId:this.props.classDetail.contentId,
                grade:this.props.classDetail.grade,
                content:this.props.classDetail.content,
                basicpart:this.props.classDetail.basicpart,
                step:this.props.classDetail.step,
                stamina:this.props.classDetail.stamina,
                standard:this.props.classDetail.standard,
                relax:this.props.classDetail.relax,
                groupType:this.props.classDetail.groupType,
                coachId:this.props.classDetail.coachId},
            doingFetch: false,
            isRefreshing: false,
            time:null,
            timeList:[],
            costTypeButtons:['取消','按人支付','按小时支付','按班支付'],
            venue:this.props.venue
        }
        this.showScaleAnimationDialog = this.showScaleAnimationDialog.bind(this);
    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }


    render() {


        return (
            <View style={{flex:1}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                    backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>编辑上课内容</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </View>
                </View>

                <View style={{flex:5,backgroundColor:'#fff'}}>

                    {/*上课内容*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:10,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>上课内容：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#000'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder={this.props.classDetail.content}
                                val={this.state.classDetail.content}
                                onChangeText={
                                    (value)=>{
                                        this.setState({classDetail:Object.assign(this.state.classDetail,{content:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({classDetail:Object.assign(this.state.classDetail,{content:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*基础部分*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>基础部分：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#000'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder={this.props.classDetail.basicpart}
                                val={this.state.classDetail.basicpart}
                                onChangeText={
                                    (value)=>{
                                        this.setState({classDetail:Object.assign(this.state.classDetail,{basicpart:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({classDetail:Object.assign(this.state.classDetail,{basicpart:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*基本步法*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>基本步伐：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#000'}}
                                placeholder={this.props.classDetail.step}
                                val={this.state.classDetail.step}
                                onChangeText={
                                    (value)=>{
                                        this.setState({classDetail:Object.assign(this.state.classDetail,{step:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({classDetail:Object.assign(this.state.classDetail,{step:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*体能训练*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>体能训练：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder={this.props.classDetail.stamina}
                                val={this.state.classDetail.stamina}
                                onChangeText={
                                    (value)=>{
                                        this.setState({classDetail:Object.assign(this.state.classDetail,{stamina:parseInt(value)})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({classDetail:Object.assign(this.state.classDetail,{stamina:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*完成标准*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>完成标准：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder={this.props.classDetail.standard}
                                val={this.state.classDetail.standard}
                                onChangeText={
                                    (value)=>{
                                        this.setState({classDetail:Object.assign(this.state.classDetail,{standard:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({classDetail:Object.assign(this.state.classDetail,{standard:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*放松项目*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>放松项目：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder={this.props.classDetail.relax}
                                val={this.state.classDetail.relax}
                                onChangeText={
                                    (value)=>{
                                        this.setState({classDetail:Object.assign(this.state.classDetail,{relax:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({classDetail:Object.assign(this.state.classDetail,{relax:null})});}
                                }
                            />
                        </View>
                    </View>
                    {/*委派教练*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>委派教练：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder={this.props.classDetail.coachId}
                                val={this.state.classDetail.coachId}
                                onChangeText={
                                    (value)=>{
                                        this.setState({classDetail:Object.assign(this.state.classDetail,{coachId:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({classDetail:Object.assign(this.state.classDetail,{coachId:null})});}
                                }
                            />
                        </View>
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
                                          if(this.props.classDetail.contentId!==null&&this.props.classDetail.contentId!==undefined){
                                              this.props.dispatch(modifyClassDetail(this.state.classDetail))
                                                  .then((json)=>{
                                                      if(json.re==1){
                                                          Alert.alert('信息','课程编辑成功',[{text:'确认',onPress:()=>{
                                                              this.props.fetchGroupsByContent(this.props.course,this.props.memberId);
                                                              this.goBack();
                                                              }}]);
                                                      }else{
                                                          if(json.re==-100){
                                                              this.props.dispatch(getAccessToken(false));
                                                          }
                                                      }
                                                  })
                                          }

                                      }}>
                        <Text style={{color:'#fff',fontSize:15}}>确定修改</Text>
                    </TouchableOpacity>
                </View>


                {/* Add CourseTime Modal*/}
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log("Modal has been closed.");
                    }}
                >
                    <CourseTimeModal
                        onClose={()=>{
                            this.setState({modalVisible:false});
                        }}
                        accessToken={this.props.accessToken}
                        setTime={(time)=>{
                            if(this.state.timeList!==null&&this.state.timeList!==undefined){
                                var timeList = this.state.timeList;
                                timeList.push(time);
                                this.setState({timeList:timeList});
                            }
                        }}
                        timeListLength={(this.state.timeList!==null&&this.state.timeList!==undefined)?this.state.timeList.length:0}

                    />
                </Modal>

                <PopupDialog
                    ref={(popupDialog) => {
                        this.scaleAnimationDialog = popupDialog;
                    }}
                    dialogAnimation={scaleAnimation}
                    actions={[

                    ]}
                >
                    <View style={styles.dialogContentView}>
                        <CourseTimeModal
                            onClose={()=>{
                                this.scaleAnimationDialog.dismiss();
                                // this.setState({modalVisible:false});
                            }}
                            accessToken={this.props.accessToken}
                            setTime={(time)=>{
                                if(this.state.timeList!==null&&this.state.timeList!==undefined){
                                    var timeList = this.state.timeList;
                                    timeList.push(time);
                                    this.setState({timeList:timeList});
                                    this.scaleAnimationDialog.dismiss();
                                }
                            }}
                            timeListLength={(this.state.timeList!==null&&this.state.timeList!==undefined)?this.state.timeList.length:0}

                        />
                    </View>
                </PopupDialog>

            </View>
        );
    }
    componentDidMount()
    {

    }

    componentWillUnmount()
    {

    }

    componentWillUnmount(){

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
)(ModifyBadmintonCourse);


