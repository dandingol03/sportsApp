

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

class Register extends Component{

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
            info:{mobilePhone:'',nickName:'',username:'',password:'',userType:'0'},//userType:0:学员，1：教练
            genderCode:'1',
        }
    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#008B00',borderBottomWidth:1,borderColor:'#ddd'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.navigate2Login();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>手机号码注册</Text>
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
                                      this.setState({info:Object.assign(this.state.info,{mobilePhone:phoneNum,username:phoneNum})});
                                    }}
                                value={this.state.info.mobilePhone}
                                placeholder=' 请输入手机号码'
                                placeholderTextColor="#aaa"
                                underlineColorAndroid="transparent"
                                autoCapitalize="characters"
                            />

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
                    backgroundColor:'#fff',marginTop:15}}>

                        <View style={{flex:1,backgroundColor:'#ddd',justifyContent:'center',alignItems: 'center',margin:5,paddingTop:15,paddingBottom:15}}>
                            <Icon size={33} name="camera-retro" color="#fff"></Icon>
                        </View>
                        <View style={{flex:3,padding:5,}}>
                            <View style={{borderBottomWidth:1,borderColor:'#eee'}}>
                                <TextInput
                                    style={{height:35*height/736,justifyContent:'center',alignItems: 'center',width:width*0.8,
                                paddingLeft:10,paddingRight:10,paddingTop:4,paddingBottom:4,fontSize:13}}
                                    onChangeText={(nickName) => {
                                         this.setState({info:Object.assign(this.state.info,{nickName:nickName})});
                                    }}
                                    value={this.state.info.nickName}
                                    placeholder=' 请输入昵称'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={{height:35*height/736,justifyContent:'center',alignItems: 'center',width:width*0.8,
                                paddingLeft:10,paddingRight:10,paddingTop:4,paddingBottom:4,fontSize:13}}
                                    onChangeText={(password) => {
                                        this.setState({info:Object.assign(this.state.info,{password:password})});
                                    }}
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    placeholder=' 密码（6-16位字母和数字）'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                    </View>


                    {
                        this.state.genderCode=='1'?
                            <View  style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',
                    backgroundColor:'#fff',marginTop:15}}>
                                <View style={{flex:1,padding:8,justifyContent:'center',alignItems: 'center',borderRightWidth:1,borderColor:'#eee'}}>
                                    <Text style={{color:'#008B00'}}>男</Text>
                                </View>
                                <TouchableOpacity style={{flex:1,padding:8,justifyContent:'center',alignItems: 'center',}}
                                onPress={()=>{
                                    this.setState({genderCode:'2'});
                                    this.setState({info:Object.assign(this.state.info,{genderCode:'2'})});
                                }
                                }>
                                    <Text style={{color:'#aaa'}}>女</Text>
                                </TouchableOpacity>
                            </View>:
                            <View  style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',
                    backgroundColor:'#fff',marginTop:15}}>
                                <TouchableOpacity style={{flex:1,padding:8,justifyContent:'center',alignItems: 'center',borderRightWidth:1,borderColor:'#eee'}}
                                                  onPress={()=>{
                                    this.setState({genderCode:'1'});
                                    this.setState({info:Object.assign(this.state.info,{genderCode:'1'})});
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
            </View>
        );
    }

}

var styles = StyleSheet.create({


});

const mapStateToProps = (state, ownProps) => {

    const props = {

    }
    return props
}

export default connect(mapStateToProps)(Register);

