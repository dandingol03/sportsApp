import React,{Component} from 'react';
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
    Easing
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MyGroup from '../components/groupActivity/MyGroup';
import MyCourses from '../components/course/MyCourses';
import MyInformation from '../components/my/MyInformation';
import Setting from '../components/my/Setting';
import CustomCourse from '../components/course/MyCustomCourse';
import PortraitModal from '../components/my/modal/PortraitModal';

import PopupDialog,{ScaleAnimation,DefaultAnimation,SlideAnimation} from 'react-native-popup-dialog';
const scaleAnimation = new ScaleAnimation();

import {
    downloadPortrait,
    updatePortrait,
    uploadPortrait
} from '../action/UserActions';

class My extends Component{

    navigate2MyGroup(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'my_group',
                component: MyGroup,
                params: {

                }
            })
        }
    }

    navigate2Setting(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'setting',
                component: Setting,
                params: {

                }
            })
        }
    }

    //导航-我的定制
    navigate2CustomCourse(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'CustomCourse',
                component: CustomCourse,
                params: {

                }
            })
        }
    }

    //导航进我的课程
    navigate2MyCourse(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'MyCourses',
                component: MyCourses,
                params: {

                }
            })
        }
    }

    navigate2MyInformation()
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'MyInformation',
                component: MyInformation,
                params: {

                }
            })
        }
    }

    showPortraitDialog() {
        this.portraitDialog.show();
    }

    setPortrait(portrait){
        this.setState({portrait:portrait});
    }

    getPortrait(){
        this.props.dispatch(downloadPortrait())
            .then((json)=>{
                if(json.re==1){
                    var portrait=json.data;
                    this.setState({portrait:portrait});
                    this.props.dispatch(updatePortrait(portrait));

                }else{

                }

            });
    }

    constructor(props) {
        super(props);
        this.state={
           portrait:null
        }
    }

    componentWillMount(){

        this.getPortrait();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:2}}>
                    <Image style={{flex:2,width:width,position:'relative'}} source={require('../../img/my_banner.jpeg')} >
                        <View style={{marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                            {
                                this.state.portrait!==undefined&&this.state.portrait!==null?

                                <TouchableOpacity style={{height:height*90/736,width:height*90/736,borderRadius:height*45/736}}
                                                  onPress={()=>{
                                         this.showPortraitDialog();
                                    }}>
                                    <Image resizeMode="stretch" style={{height:height*90/736,width:height*90/736,
                            borderRadius:height*45/736}} source={{uri:this.state.portrait}}/>
                                </TouchableOpacity> :
                                    <TouchableOpacity style={{height:height*90/736,width:height*90/736,borderRadius:height*45/736}}
                                    onPress={()=>{
                                         this.showPortraitDialog();
                                    }}>
                                        <Image resizeMode="stretch" style={{height:height*90/736,width:height*90/736,borderRadius:height*45/736}}
                                               source={require('../../img/portrait.jpg')}/>
                                    </TouchableOpacity>
                            }
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:15}}>
                            <Text style={{color:'#fff',fontSize:18}}>小鱼丁</Text>
                        </View>
                    </Image>
                </View>
                <View style={{flex:5,backgroundColor:'#eee'}}>
                    <View style={{flex:12,backgroundColor:'#eee'}}>
                        <TouchableOpacity style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                        onPress={()=>{
                            this.navigate2MyGroup();
                        }}>
                            <View style={{flex:1,backgroundColor:'#FF69B4',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                            justifyContent:'center',alignItems: 'center'}}>
                                <Icon name={'group'} size={18} color="#fff"/>
                            </View>
                            <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                                <Text>我的群</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                          onPress={()=>{
                            this.navigate2MyInformation();
                        }}
                        >

                            <View style={{flex:1,backgroundColor:'#FFEC8B',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                            justifyContent:'center',alignItems: 'center'}}>
                                <Icon name={'user'} size={20} color="#fff"/>
                            </View>
                            <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                                <Text>我的资料</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                          onPress={()=>{
                                this.navigate2MyCourse();
                            }}
                        >
                            <View style={{flex:1,backgroundColor:'#98FB98',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                                justifyContent:'center',alignItems: 'center'}}>
                                <CommIcon name="library" size={22} color="#fff" style={{backgroundColor:'transparent',}}/>
                            </View>
                            <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                                <Text>我的课程</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                            onPress={()=>{
                                this.navigate2CustomCourse();
                            }}
                        >
                            <View style={{flex:1,backgroundColor:'#98FB98',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                            justifyContent:'center',alignItems: 'center'}}>
                                <Icon name={'edit'} size={20} color="#fff"/>
                            </View>
                            <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                                <Text>我的定制</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                                              onPress={()=>{
                                this.navigate2Setting();
                            }}>
                        <View style={{flex:1,backgroundColor:'#63B8FF',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                            justifyContent:'center',alignItems: 'center'}}>
                            <Icon name={'gear'} size={20} color="#fff"/>
                        </View>
                        <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                            <Text>设置</Text>
                        </View>
                    </TouchableOpacity>

                    </View>

                    <View style={{flex:1,backgroundColor:'#eee'}}>

                    </View>
                </View>

                <PopupDialog
                    ref={(popupDialog) => {
                        this.portraitDialog = popupDialog;
                    }}
                    dialogAnimation={scaleAnimation}
                    actions={[]}
                    width={0.8}
                    height={0.4}
                >

                    <PortraitModal
                        val={this.props.username}
                        onClose={()=>{
                                this.portraitDialog.dismiss();
                            }}
                        onConfirm={(portrait)=>{
                             if (portrait) {
                                this.props.dispatch(uploadPortrait(portrait,this.props.personInfo.personId)).then((json)=>{
                                    if(json.re==1){
                                        alert('上传成功');
                                        this.portraitDialog.dismiss();
                                        this.setPortrait(portrait);
                                    }
                                })

                             }else{
                                Alert.alert(
                                    '错误',
                                    '请先进行拍照'
                                );
                             }

                        }}
                    />

                </PopupDialog>


            </View>
        );
    }

}

var styles = StyleSheet.create({


});


module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,

    })
)(My);
