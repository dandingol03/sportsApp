

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
    Easing,
    Modal
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    PAGE_LOGIN,
} from '../constants/PageStateConstants';
import {
    updatePageState
} from '../action/PageStateActions';

import PreferenceStore from '../utils/PreferenceStore';
import {
    registerUser
} from '../action/UserActions';

import Camera from 'react-native-camera';
var ImagePicker = require('react-native-image-picker');

import ActionSheet from 'react-native-actionsheet'


/**
 * userType:0为用户 1为教练
 */

class Register extends Component{

    showImagePicker(){
        var options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            title:'请选择',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'图库',
            cancelButtonTitle:'取消',


        };
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({portrait: source});

            }
        });
    }

    register()
    {
        var {info}=this.state;
        //TODO:比对state.code和state.info.code
        // var {code,info}=this.state;
        // if(parseInt(code)==parseInt(info.code))
        // {
            this.props.dispatch(registerUser(info)).then((json)=>{
                if(json.re==1) {

                    PreferenceStore.put('username',info.username);
                    PreferenceStore.put('password',info.password);

                    //TODO:make this to confirm
                    Alert.alert(
                        '信息',
                        '注册成功！是否要直接登录？',
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                            {text: 'OK', onPress: () => this.navigate2Login()},
                        ]
                    )

                }else{
                    Alert.alert(
                        '错误',
                        '注册失败'
                    )
                }
            }).catch((e)=>{
                alert(e);
            })

        // }else{
        //     Alert.alert(
        //         '错误',
        //         '手机验证码输入错误'
        //     )
        // }
    }

    navigate2Login(){
    //TODO:dispatch a action
    this.props.dispatch(updatePageState({state:PAGE_LOGIN}))
    }

    constructor(props) {
        super(props);
        this.state={
            info:{
                mobilePhone:'',
                username:'',
                password:'',
                userType:0,
                genderCode:1,
                sportLevel:null,
            },
            portrait:null,
            fadeCancel: new Animated.Value(0),
            fadeNickNameCancel:new Animated.Value(0),
            fadePasswordCancel:new Animated.Value(0),
            fadeSportsLevel:new Animated.Value(0)

        }
    }

    showActionSheet() {
        this.ActionSheet.show()
    }

    render() {


        var  options = [ '取消','无','体育本科', '国家一级运动员', '国家二级运动员', '国家三级运动员' ]
        const CANCEL_INDEX = 0
        const DESTRUCTIVE_INDEX=1

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                        backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#ddd'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.navigate2Login();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>注册</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                        {/*<Text style={{color:'#fff',fontSize:15}}>下一步</Text>*/}
                    </TouchableOpacity>
                </View>

                <View style={{flex:4,backgroundColor:'#eee',paddingTop:15,paddingBottom:10}}>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',padding:5,
                        backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#ddd'}}>
                        <View style={{flex:1,paddingLeft:5}}>
                            <Text style={{color:'#aaa'}}>+86：</Text>
                        </View>
                        <View style={{flex:6,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'}}>
                            <TextInput
                                style={{height:35*height/736,justifyContent:'center',alignItems: 'center',width:width*0.8,
                                paddingLeft:10,paddingRight:10,paddingTop:4,paddingBottom:4,fontSize:13}}
                                onChangeText={(phoneNum) => {
                                       if( phoneNum&&phoneNum!='')//不为空
                                       {
                                             Animated.timing(
                                            this.state.fadeCancel,
                                            {toValue: 1},
                                        ).start();
                                      }else{
                                             Animated.timing(
                                            this.state.fadeCancel,
                                            {toValue: 0},
                                         ).start();

                                      }
                                      this.setState({info:Object.assign(this.state.info,{mobilePhone:phoneNum})});
                                    }}
                                onBlur={()=>{
                                   if(this.state.fadeCancel==0)
                                   {}
                                   else{
                                             Animated.timing(
                                            this.state.fadeCancel,
                                            {toValue: 0},
                                         ).start();
                                   }
                                }}
                                value={this.state.info.mobilePhone}
                                placeholder=' 请输入手机号码'
                                placeholderTextColor="#aaa"
                                underlineColorAndroid="transparent"
                                keyboardType="numeric"
                            />

                            <Animated.View style={{opacity: this.state.fadeCancel,backgroundColor:'transparent',padding:4,marginRight:8}}>
                                <TouchableOpacity onPress={()=>{

                                    this.setState({info:Object.assign(this.state.info,{mobilePhone:''})});
                                     Animated.timing(
                                            this.state.fadeCancel,
                                            {toValue: 0},
                                         ).start();
                                }}>
                                    <Ionicons name='md-close-circle' size={18} color="red"/>
                                </TouchableOpacity>
                            </Animated.View>

                        </View>
                    </View>

                    {/*<View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',padding:5,}}>*/}
                        {/*<TextInput*/}
                            {/*style={{height:35*height/736,justifyContent:'center',alignItems: 'center',width:width,*/}
                               {/*paddingLeft:10,paddingRight:10,paddingTop:4,paddingBottom:4,fontSize:13}}*/}
                            {/*onChangeText={(eventName) => {*/}
                                     {/*this.setState({eventName:this.state.eventName});*/}
                            {/*}}*/}
                            {/*value={this.state.goodName}*/}
                            {/*placeholder=' 请输入验证码'*/}
                            {/*placeholderTextColor="#aaa"*/}
                            {/*underlineColorAndroid="transparent"*/}
                            {/*autoCapitalize="characters"*/}
                        {/*/>*/}
                    {/*</View>*/}

                    <View  style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',
                        backgroundColor:'#fff',marginTop:15,paddingBottom:10}}>

                        {/*照相*/}


                        {
                            this.state.portrait==null?
                                <TouchableOpacity style={{flex:1,backgroundColor:'#ddd',justifyContent:'center',alignItems: 'center',
                            margin:5,paddingTop:15,paddingBottom:15}}
                                                  onPress={
                                ()=>{
                                   this.showImagePicker();
                                }
                            }
                                >
                                    <Icon size={40} name="camera-retro" color="#fff"></Icon>
                                </TouchableOpacity>:
                                <TouchableOpacity style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',
                            margin:5,paddingTop:15,paddingBottom:15}}
                                                  onPress={
                                ()=>{
                                   this.showImagePicker();
                                }
                            }
                                >
                                    <Image resizeMode="stretch" source={this.state.portrait}
                                           style={{width:75,height:70,}}/>
                                </TouchableOpacity>

                        }

                        <View style={{flex:3,padding:5,}}>
                            <View style={{borderBottomWidth:1,borderColor:'#eee',flexDirection:'row'}}>
                                <TextInput
                                    style={{height:35*height/736,justifyContent:'center',alignItems: 'center',flex:1,
                                        paddingLeft:10,paddingRight:10,paddingTop:2,paddingBottom:2,fontSize:13}}
                                    onChangeText={(username) => {

                                       if( username&&username!='')//不为空
                                       {
                                             Animated.timing(
                                            this.state.fadeNickNameCancel,
                                            {toValue: 1},
                                        ).start();
                                      }else{
                                             Animated.timing(
                                            this.state.fadeNickNameCancel,
                                            {toValue: 0},
                                         ).start();

                                      }

                                      this.setState({info:Object.assign(this.state.info,{username:username})});
                                    }}
                                    onBlur={()=>{
                                       if(this.state.fadeNickNameCancel==0)
                                       {}
                                       else{
                                                 Animated.timing(
                                                this.state.fadeNickNameCancel,
                                                {toValue: 0},
                                             ).start();
                                       }
                                    }}
                                    value={this.state.info.username}
                                    placeholder=' 请输入用户名'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                                <Animated.View style={{opacity: this.state.fadeNickNameCancel,backgroundColor:'transparent',
                                        padding:4,marginRight:8,width:30}}>
                                    <TouchableOpacity onPress={()=>{

                                    this.setState({info:Object.assign(this.state.info,{nickName:''})});
                                     Animated.timing(
                                            this.state.fadeNickNameCancel,
                                            {toValue: 0},
                                         ).start();
                                }}>
                                        <Ionicons name='md-close-circle' size={18} color="red"/>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                            <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#eee',}}>
                                <TextInput
                                    style={{height:35*height/736,justifyContent:'center',alignItems: 'center',flex:1,
                                    paddingLeft:10,paddingRight:10,paddingTop:4,paddingBottom:4,fontSize:13}}
                                        onChangeText={(password) => {

                                          if( password&&password!='')//不为空
                                          {
                                                 Animated.timing(
                                                this.state.fadePasswordCancel,
                                                {toValue: 1},
                                            ).start();
                                          }else{
                                                 Animated.timing(
                                                this.state.fadePasswordCancel,
                                                {toValue: 0},
                                             ).start();

                                          }


                                            this.setState({info:Object.assign(this.state.info,{password:password})});
                                        }}
                                        onBlur={()=>{
                                           if(this.state.fadePasswordCancel==0)
                                           {}
                                           else{
                                                     Animated.timing(
                                                    this.state.fadePasswordCancel,
                                                    {toValue: 0},
                                                 ).start();
                                           }
                                        }}
                                        secureTextEntry={true}
                                        value={this.state.password}
                                        placeholder=' 密码（6-16位字母和数字）'
                                        placeholderTextColor="#aaa"
                                        underlineColorAndroid="transparent"
                                />

                                <Animated.View style={{opacity: this.state.fadePasswordCancel,backgroundColor:'transparent',
                                        padding:4,marginRight:8,width:30}}>
                                    <TouchableOpacity onPress={()=>{

                                    this.setState({info:Object.assign(this.state.info,{nickName:''})});
                                     Animated.timing(
                                            this.state.fadePasswordCancel,
                                            {toValue: 0},
                                         ).start();
                                }}>
                                        <Ionicons name='md-close-circle' size={18} color="red"/>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>

                            <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#eee'}}>
                                <View style={{height:35*height/736,flexDirection:'row',flex:1,paddingLeft:15,paddingRight:10,
                                    paddingTop:4,paddingBottom:4}}>

                                    <View style={{flexDirection:'row',alignItems:'center',flex:3}}>
                                        <Text style={{color:'#999',fontSize:13}}>
                                            作为教练注册
                                        </Text>
                                    </View>

                                    <View style={{flexDirection:'row',flex:2,justifyContent:'center'}}>

                                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',flex:1}}
                                            onPress={()=>{
                                                if(this.state.info.userType!=1)
                                                    {
                                                           Animated.timing(
                                                                this.state.fadeSportsLevel,
                                                                {toValue: 1},
                                                            ).start();
                                                           this.setState({info:Object.assign(this.state.info,{userType:1})})
                                                    }

                                            }}
                                        >
                                            {
                                                this.state.info.userType==1?
                                                    <Text style={{fontSize:13,color:'green'}}>是</Text>:
                                                    <Text style={{fontSize:13,color:'gray'}}>是</Text>
                                            }
                                            {
                                                this.state.info.userType==1?
                                                    <Ionicons name='md-radio-button-on' size={16} color="green" style={{marginLeft:4,paddingTop:2}}/>:
                                                    <Ionicons name='md-radio-button-off' size={16} color="gray" style={{marginLeft:4,paddingTop:2}}/>
                                            }


                                        </TouchableOpacity>

                                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',flex:1}}
                                            onPress={()=>{
                                                if(this.state.info.userType==1)
                                                {
                                                      Animated.timing(
                                                            this.state.fadeSportsLevel,
                                                            {toValue: 0},
                                                        ).start();
                                                      this.setState({info:Object.assign(this.state.info,{userType:0})})
                                                }

                                            }}
                                        >
                                            {
                                                this.state.info.userType!=1?
                                                    <Text style={{fontSize:13,color:'green'}}>否</Text>:
                                                    <Text style={{fontSize:13,color:'gray'}}>否</Text>

                                            }
                                            {
                                                this.state.info.userType!=1?
                                                    <Ionicons name='md-radio-button-on' size={16} color="green" style={{marginLeft:4,paddingTop:2}}/>:
                                                    <Ionicons name='md-radio-button-off' size={16} color="gray" style={{marginLeft:4,paddingTop:2}}/>
                                            }


                                        </TouchableOpacity>

                                    </View>

                                </View>

                            </View>


                            {/*渐入*/}
                            <Animated.View style={{opacity: this.state.fadeSportsLevel,flexDirection:'row'}}>
                                <View style={{flexDirection:'row',flex:1,paddingLeft:15,paddingRight:10,
                                        paddingVertical:3}}>

                                    <View style={{flexDirection:'row',alignItems:'center',flex:2}}>
                                        <Text style={{color:'#999',fontSize:13}}>
                                            选择运动水平
                                        </Text>
                                    </View>

                                    <TouchableOpacity style={{flexDirection:'row',flex:2,justifyContent:'center',alignItems:'center'}}
                                                      onPress={()=>{
                                      this.showActionSheet()
                                    }}>


                                        {
                                            this.state.info.sportLevel?
                                                <View style={{borderColor:'#008B00',borderRadius:4,borderWidth:1,padding:5,
                                                        paddingHorizontal:6,}}>
                                                    <Text style={{fontSize:12,color:'#333'}}>
                                                        {this.state.sportLevelStr}
                                                    </Text>
                                                </View>:
                                                <View style={{borderColor:'#008B00',borderRadius:4,borderWidth:1,padding:5,
                                                    paddingHorizontal:20,}}>
                                                    <Text style={{fontSize:12,color:'#333'}}>无</Text>
                                                </View>
                                        }

                                    </TouchableOpacity>

                                </View>

                            </Animated.View>



                        </View>
                    </View>



                    {
                        this.state.info.genderCode==1?
                            <View  style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',
                                    backgroundColor:'#fff',marginTop:15}}>
                                <View style={{flex:1,padding:8,justifyContent:'center',alignItems: 'center',borderRightWidth:1,borderColor:'#eee'}}>
                                    <Text style={{color:'#008B00'}}>男</Text>
                                </View>
                                <TouchableOpacity style={{flex:1,padding:8,justifyContent:'center',alignItems: 'center',}}
                                onPress={()=>{
                                    this.setState({info:Object.assign(this.state.info,{genderCode:2})});
                                }
                                }>
                                    <Text style={{color:'#aaa'}}>女</Text>
                                </TouchableOpacity>
                            </View>:
                            <View  style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',
                                   backgroundColor:'#fff',marginTop:15}}>
                                <TouchableOpacity style={{flex:1,padding:8,justifyContent:'center',alignItems: 'center',
                                    borderRightWidth:1,borderColor:'#eee'}}
                                                  onPress={()=>{
                                    this.setState({info:Object.assign(this.state.info,{genderCode:1})});
                                }
                                }>
                                    <Text style={{color:'#aaa'}}>男</Text>
                                </TouchableOpacity>
                                <View style={{flex:1,padding:8,justifyContent:'center',alignItems: 'center',}}>
                                    <Text style={{color:'#008B00'}}>女</Text>
                                </View>
                            </View>

                    }

                    <TouchableOpacity style={{height:30,width:width*0.4,marginLeft:width*0.3,marginTop:20,justifyContent:'center',alignItems: 'center',
                        borderRadius:10,backgroundColor:'#66CDAA'}}
                    onPress={()=>{
                         this.register();
                    }}>
                        <Text style={{color:'#fff',fontSize:13}}>完成</Text>
                    </TouchableOpacity>

                    {/*<TouchableOpacity style={{height:30,width:width*0.4,marginLeft:width*0.3,marginTop:20,justifyContent:'center',alignItems: 'center',*/}
                {/*borderRadius:10,borderWidth:1,borderColor:'#66CDAA'}}*/}
                    {/*onPress={()=>{*/}

                    {/*}}>*/}
                        {/*<Text style={{color:'#66CDAA',fontSize:13}}>发送验证码</Text>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<View style={{marginTop:5,justifyContent:'center',alignItems: 'center',}}>*/}
                        {/*<Text style={{color:'#aaa',fontSize:11}}>无法获取验证码？</Text>*/}
                    {/*</View>*/}

                </View>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'选择运动水平'}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={(i)=>{
                        if(i!=0&&i!=1)
                        {
                            this.setState({sportLevelStr:options[i],info:Object.assign(this.state.info,{sportLevel:i-1})})
                        }else if(i==1)
                        {
                            this.setState({sportLevelStr:null,info:Object.assign(this.state.info,{sportLevel:null,})})
                        }else{
                        }
                    }}
                />
            </View>
        );
    }

}

var styles = StyleSheet.create({

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
    },
    imageStyle: {
        width: 70,
        height: 70,
        marginTop: 10,
        borderWidth:2,
    },
});

const mapStateToProps = (state, ownProps) => {

    const props = {

    }
    return props
}

export default connect(mapStateToProps)(Register);

