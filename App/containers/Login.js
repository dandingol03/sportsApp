import React, {Component} from 'react';
import {
    Image,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    ActivityIndicator,
    TabBarIOS,
    TouchableOpacity,
    Dimensions,
    Modal,
    Platform,
    Animated
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
var Proxy = require('../utils/Proxy');
import {
    doLogin,
} from '../action/UserActions';

import PreferenceStore from '../utils/PreferenceStore';
import {
    PAGE_REGISTER,
} from '../constants/PageStateConstants';
import {
    updatePageState
} from '../action/PageStateActions';

import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
//import TextInputWrapper from '../encrypt/TextInputWrapper';
import TextInputWrapper from 'react-native-text-input-wrapper'

var  Login =React.createClass({

    onLoginPressed:function () {
        const {dispatch} = this.props;
        var {user}=this.state;
        if(user.username!==undefined&&user.username!==null)
        {
            if(user.password!==undefined&&user.password!==null)
            {
                this.setState({showProgress: true,modalVisible:true});
                const {dispatch} = this.props;
                this.timer= setInterval(

                    function () {

                        var loginDot=this.state.loginDot;
                        if(loginDot=='......')
                            loginDot='.';
                        else
                            loginDot+='.';
                        this.setState({loginDot:loginDot});
                    }.bind(this)
                    ,
                    600,
                );
                dispatch(setTimerAction(this.timer));


                //make a test

                dispatch(loginAction(user.username,user.password,(errorMsg)=> {
                    this.setState({showProgress: false,user:{}});

                    if(errorMsg!==undefined&&errorMsg!==null){
                        var string = errorMsg;
                        setTimeout(()=>{
                            Alert.alert(
                                '错误',
                                string,
                                [
                                    {text: 'OK', onPress: () => {
                                    }},
                                ]
                            );
                        },900)
                    }
                })).then(()=>{

                    this.setState({showProgress: false,user:{}});

                }).catch((e)=>{
                    alert(e);
                })

            }
        }else{}

    },

    navigate2Register:function(){
        //TODO:dispatch a action
        this.props.dispatch(updatePageState({state:PAGE_REGISTER}))
    },



    getInitialState:function(){
        return ({
            user:{},
            modalVisible:false,
            showProgress:false,
            loginDot:'.',
            fadeCancel: new Animated.Value(0),
            fadePassword:new Animated.Value(0)
        });
    },

    render:function () {

        var username = this.state.user.username;
        const shadowOpt = {
            width:width-20,
            height:200,
            color:"#000",
            border:2,
            radius:3,
            opacity:0.2,
            x:0,
            y:1.5,
            style:{marginVertical:5}
        }

        return (
            <View style={[styles.container,{backgroundColor:'#eee'}]}>


                    <View style={{justifyContent:'center',flexDirection:'row',padding:0,marginTop:40,}}>

                        <View style={{
                            position:"relative",
                            width: width,
                            backgroundColor: "transparent",
                            borderRadius:3,
                            height:120,
                            justifyContent:'center',
                            flexDirection:'row',
                            overflow:"hidden"}}>
                            <Image style={styles.logo} source={require('../../img/logo.jpg')} resizeMode="center" />
                        </View>

                    </View>

                    <View style={{paddingVertical:2,backgroundColor:'#eee',flex:1}}>

                        {/*输入用户名*/}
                        <View style={[styles.row,{borderBottomWidth:0,height:42,marginBottom:1,backgroundColor:'#fff'}]}>


                            <View style={{flex:6}}>
                                <View style={{flex:1,flexDirection:'row'}}>

                                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',padding:4
                                        ,marginLeft:0,paddingHorizontal:2}}>
                                        <Icon size={18} name="user-o" color="#66CDAA"></Icon>
                                    </View>


                                    <View style={{flex:6,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                        <TextInputWrapper
                                            placeholder="帐号/手机号"
                                            val={this.state.user.username}
                                            onChangeText={(value)=>{
                                                this.setState({user:Object.assign(this.state.user,{username:value})})
                                            }}
                                            onCancel={
                                                ()=>{this.setState({user:Object.assign(this.state.user,{username:value})});}
                                            }
                                        />
                                        {/*<TextInput*/}
                                            {/*style={{height: 42,flex:1,paddingLeft:0,paddingRight:10,paddingTop:2,paddingBottom:2,fontSize:16,*/}
                                                        {/*}}*/}


                                            {/*onChangeText={(username) => {*/}

                                              {/*if( username&&username!='')//不为空*/}
                                              {/*{*/}
                                                     {/*Animated.timing(*/}
                                                    {/*this.state.fadeCancel,*/}
                                                    {/*{toValue: 1},*/}
                                                {/*).start();*/}
                                              {/*}else{*/}
                                                     {/*Animated.timing(*/}
                                                    {/*this.state.fadeCancel,*/}
                                                    {/*{toValue: 0},*/}
                                                 {/*).start();*/}

                                              {/*}*/}

                                                {/*this.state.user.username=username;*/}
                                                {/*this.setState({user:this.state.user});*/}
                                            {/*}}*/}
                                            {/*onBlur={()=>{*/}
                                               {/*if(this.state.fadeCancel==0)*/}
                                               {/*{}*/}
                                               {/*else{*/}
                                                         {/*Animated.timing(*/}
                                                        {/*this.state.fadeCancel,*/}
                                                        {/*{toValue: 0},*/}
                                                     {/*).start();*/}
                                               {/*}*/}
                                            {/*}}*/}
                                            {/*value={this.state.user.username}*/}
                                            {/*placeholder="帐号/手机号"*/}
                                            {/*placeholderTextColor="#aaa"*/}
                                            {/*underlineColorAndroid="transparent"*/}
                                        {/*/>*/}
                                        {/*<Animated.View style={{opacity: this.state.fadeCancel,backgroundColor:'transparent',padding:4,marginRight:8}}>*/}
                                            {/*<TouchableOpacity onPress={()=>{*/}

                                                {/*this.setState({user:Object.assign(this.state.user,{username:''})});*/}
                                                 {/*Animated.timing(*/}
                                                        {/*this.state.fadeCancel,*/}
                                                        {/*{toValue: 0},*/}
                                                     {/*).start();*/}
                                            {/*}}>*/}
                                                {/*<Ionicons name='md-close-circle' size={18} color="red"/>*/}
                                            {/*</TouchableOpacity>*/}
                                        {/*</Animated.View>*/}
                                    </View>
                                </View>
                            </View>

                        </View>

                        {/*输入密码*/}
                        <View style={[styles.row,{borderBottomWidth:0,height:42,marginBottom:0,backgroundColor:'#fff'}]}>


                            <View style={{flex:6}}>
                                <View style={{flex:1,flexDirection:'row'}}>

                                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',padding:4,
                                        paddingHorizontal:2,marginLeft:0}}>
                                        <Icon size={20} name="lock" color="#66CDAA"></Icon>
                                    </View>

                                    <View style={{flex:6,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                        <TextInput
                                            style={{height: 42,flex:1,paddingLeft:0,paddingRight:10,paddingTop:2,paddingBottom:2,fontSize:16}}
                                            onChangeText={(password) => {

                                              if( password&&password!='')//不为空
                                              {
                                                Animated.timing(
                                                    this.state.fadePassword,
                                                    {toValue: 1},
                                                ).start();
                                              }else{
                                                     Animated.timing(
                                                    this.state.fadePassword,
                                                    {toValue: 0},
                                                 ).start();

                                              }
                                                this.state.user.password=password;
                                                this.setState({user:this.state.user});
                                            }}

                                            onBlur={()=>{
                                               if(this.state.fadePassword==0)
                                               {}
                                               else{
                                                         Animated.timing(
                                                        this.state.fadePassword,
                                                        {toValue: 0},
                                                     ).start();
                                               }
                                            }}
                                            secureTextEntry={true}
                                            value={this.state.user.password}
                                            placeholder='请输入密码'
                                            placeholderTextColor="#aaa"
                                            underlineColorAndroid="transparent"
                                        />

                                        <Animated.View style={{opacity: this.state.fadePassword,backgroundColor:'transparent',padding:4,marginRight:8}}>
                                            <TouchableOpacity onPress={()=>{

                                                this.setState({user:Object.assign(this.state.user,{password:''})});
                                                 Animated.timing(
                                                        this.state.fadePassword,
                                                        {toValue: 0},
                                                     ).start();
                                            }}>
                                                <Ionicons name='md-close-circle' size={18} color="red"/>
                                            </TouchableOpacity>
                                        </Animated.View>
                                    </View>

                                </View>
                            </View>
                        </View>



                        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:10,marginTop:20}}>

                                <View style={{flexDirection:'row',width:width*5/6,alignItems:'center',}}>
                                    <TouchableOpacity style={{justifyContent:'center',flexDirection:'row',width:width/3
                                    ,backgroundColor:'#66CDAA',padding:8,borderRadius:4}}
                                                      onPress={()=>{
                                        this.navigate2Register();
                                    }}>
                                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>注册</Text>
                                    </TouchableOpacity>

                                    <View style={{flex:1}}></View>

                                    <TouchableOpacity style={{flex:1,justifyContent:'center',flexDirection:'row',width:width/3,
                                     borderColor:'#66CDAA',padding:8,paddingHorizontal:16,borderRadius:4,borderWidth:1,}}
                                      onPress={()=>{
                                          if(this.state.user&&
                                          this.state.user.username&&this.state.user.username!=''&&
                                          this.state.user.password&&this.state.user.password!='')
                                          {
                                              this.setState({showProgress: true});
                                              this.props.dispatch(doLogin(this.state.user.username,this.state.user.password))
                                              .then(()=>{
                                                  this.setState({showProgress: false,user:{}});
                                              })
                                              .catch((e)=>{
                                                        alert(e);
                                               })
                                          }


                                    }}>
                                        <Text style={{color:'#66CDAA',fontSize:16,fontWeight:'bold'}}>登录</Text>
                                    </TouchableOpacity>
                                </View>

                        </View>

                        {/*<View style={{flexDirection:'row',height:400}}>*/}
                            {/*<Markdown styles={markdownStyles}>*/}
                                {/*下面是一个发布*/}
                                 {/*![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif){'\n'}*/}
                            {/*</Markdown>*/}

                        {/*</View>*/}
                        {/*loading模态框*/}
                        <Modal animationType={"fade"} transparent={true} visible={this.state.showProgress}>

                            <TouchableOpacity style={[styles.modalContainer,styles.modalBackgroundStyle,{alignItems:'center'}]}
                                              onPress={()=>{
                                            //TODO:cancel this behaviour

                                          }}>

                                <View style={{width:width*2/3,height:80,backgroundColor:'rgba(60,60,60,0.9)',position:'relative',
                                        justifyContent:'center',alignItems:'center',borderRadius:6}}>
                                    <ActivityIndicator
                                        animating={true}
                                        style={[styles.loader, {height: 40,position:'absolute',top:8,right:20,transform: [{scale: 1.6}]}]}
                                        size="large"
                                        color="#00BFFF"
                                    />
                                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:45}}>
                                        <Text style={{color:'#fff',fontSize:13,fontWeight:'bold'}}>
                                            登录中...
                                        </Text>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Modal>

                    </View>


            </View>
        );

    },

    componentDidMount() {


        // setTimeout(function () {
        //     Sound.setCategory('Playback', true)
        //     const s = new Sound('./serviceAudio.wav',  Sound.MAIN_BUNDLE,(e) => {
        //         if (e) {
        //             alert(e)
        //             return;
        //         }
        //
        //         s.play(() => s.release());
        //     });
        // },1000)

        //fetch username and password
        var username=null;
        var password=null;
        PreferenceStore.get('username').then((val)=>{
            username=val;
            return PreferenceStore.get('password');
        }).then((val)=>{
            password=val;
            if(username!==undefined&&username!==null&&username!=''
                &&password!==undefined&&password!==null&&password!='')
            {
                //TODO:auto-login
                this.setState({user:{
                    username:username,
                    password:password
                }})
                //this.onLoginPressed();
            }
        })


    },
    componentWillUnmount() {
        // Remove the alert located on this master page from the manager

    }

});


export default connect(
    (state) => ({
    })
)(Login);


const markdownStyles = {
    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    link: {
        color: 'pink',
    },
    mailTo: {
        color: 'orange',
    },
    text: {
        color: '#555555',
    },
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        margin:0,
        padding:0
    },
    modalContainer:{
        flex:1,
        justifyContent: 'center',
        padding: 20
    },
    modalBackgroundStyle:{
        backgroundColor:'rgba(0,0,0,0.3)'
    },
    logo: {
        width: 80,
        height:80,
        resizeMode:'cover',
        backgroundColor:'transparent',
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        width:240,
        justifyContent:'center',
        height: 42,
        marginTop: 10,
        padding: 4,
        fontSize: 12,
        borderWidth: 1,
        borderColor: '#48bbec',
        color: '#48bbec',
        borderBottomWidth:0
    },
    title: {
        fontSize: 38,
        backgroundColor: 'transparent'
    },
    button: {
        marginRight: 10
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    loader: {
        marginTop: 10
    },
    error: {
        color: 'red',
        paddingTop: 10,
        fontWeight: 'bold'
    },
    row:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#222'
    }
});
