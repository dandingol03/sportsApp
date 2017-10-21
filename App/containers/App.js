
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform,
    ToastAndroid,
    BackAndroid,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import {getAccessToken} from '../action/UserActions';

import {
    createNotification,
    downloadGeneratedTTS,
    alertWithType,
    closeMessage
} from '../action/JpushActions';

import JPush,{JpushEventReceiveMessage,JpushEventOpenMessage} from 'react-native-jpush';
import { connect } from 'react-redux';

import { Navigator } from 'react-native-deprecated-custom-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from 'react-native-tab-navigator';

import {
    PAGE_LOGIN,
    PAGE_REGISTER,
    PAGE_PASSWORDFORGET,

} from '../constants/PageStateConstants';

import Home from './Home';
import My from './My';
import Found from './Found';
import Notice from './Notice';
import Login from './Login';
import Register from './Register';

import {
    updateRootTab
}  from '../action/TabActions';

import UpdateAndroid from '../native/UpdateAndroid'

var {height, width,scale} = Dimensions.get('window');

var WeChat = require('react-native-wechat');
// var RNFS =require('react-native-fs');

class App extends Component {

    _createNavigatorItem(route,icon)
    {
        var component=Home;
        switch (route) {
            case '首页':
                break;
            case '消息':
                component=Notice;
                break;
            case '发现':
                component=Found;
                break;
            case '我的':
                component=My;
                break;
            default:
                break;
        }

        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === route}
                title={route}
                titleStyle={{color:'#C6C5CA',fontSize:13}}
                selectedTitleStyle={{color:'#34C87A'}}
                renderIcon={() => <Icon name={icon} size={26} color="#C6C5CA" />}
                renderSelectedIcon={() => <Icon name={icon} size={26} color='#66CDAA' />}
                onPress={() => {
                    this.setState({ selectedTab: route });
                    this.props.dispatch(updateRootTab({tab:route}));
                }}
                tabStyle={{backgroundColor:'transparent',}}
                onSelectedStyle={{backgroundColor:'#eeecf3',}}
            >

                <View style={{flex:1,}}>
                    <Navigator
                        initialRoute={{ name: route, component:component }}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                          }}
                        renderScene={(route, navigator) => {
                            let Component = route.component;
                            //this.props.dispatch(updateNavigator({route:route.name,navigator:navigator}))
                            return (<Component {...route.params} navigator={navigator} />);
                          }}

                    />

                </View>
            </TabNavigator.Item>
        );
    }
    // onNotificationRecv(payload)
    // {
    //     if (Platform.OS === 'android') {
    //         var extra = payload["cn.jpush.android.EXTRA"];
    //         payload = JSON.parse(extra);
    //     }
    //
    //     var {type}=payload;
    //     console.log('type='+type);
    //
    //     switch(type)
    //     {
    //         case 'from-service':
    //             var {orderId,servicePersonId,date}=payload;
    //             var content='工号为'+servicePersonId+'的服务人员发出接单请求';
    //             var user={};
    //             date=new Date(date);
    //
    //             this.props.dispatch(getAccessToken())
    //                 .then((json)=>{
    //
    //
    //                     if(json.re==1)
    //                     {
    //                         //TODO:获取accessToken并进行页面跳转
    //
    //
    //                         this.props.dispatch(createNotification(payload,'service'))
    //                             .then( (json) =>{
    //                                 //TODO:下载音频文件
    //                                 console.log('go get tts');
    //                                 return this.props.dispatch(downloadGeneratedTTS({content:content}));
    //                             })
    //                             .then( (json)=> {
    //                                 if(json.re==1)
    //                                 {
    //                                     var path=json.data;
    //                                     console.log('播放音频文件path:   '+path);
    //
    //                                     RNFS.readDir(RNFS.DocumentDirectoryPath)
    //                                         .then((result) => {
    //                                             console.log('下载到的播音文件', result);})
    //
    //                                     //TODO:播放音频文件
    //                                     var sound = new Sound(json.data, '', (error) => {
    //                                         if (error) {
    //                                             console.log('failed to load the sound', error);
    //                                         }else{
    //                                             this.state.soundMounted=sound;
    //                                             setTimeout(() => {
    //                                                 sound.setVolume(10);
    //                                                 sound.play((success) => {
    //                                                     if (success) {
    //                                                         console.log('successfully finished playing');
    //                                                         sound.release();
    //                                                         this.state.soundMounted=null;
    //                                                     } else {
    //                                                         console.log('playback failed due to audio decoding errors');
    //                                                         sound.release();
    //                                                         this.state.soundMounted=null;
    //                                                     }
    //                                                 });
    //                                             }, 100);
    //                                         }
    //                                     });
    //
    //                                     //TODO:popup插件,当点击这个插件时取消音频播放,sound.stop();sound.release();
    //                                     this.props.dispatch(alertWithType({msg:content}));
    //
    //
    //                                 }
    //                             });
    //
    //                     }else{
    //                     }
    //                 }).catch( (e)=> {
    //                 alert(e);
    //             })
    //
    //             break;
    //         case 'from-background':
    //             var {orderState}=payload;
    //             switch(orderState)
    //             {
    //                 case 3:
    //                     //报价完成
    //                     var {orderId,orderNum,orderType,date}=payload;
    //                     date=new Date(date);
    //                     var content='订单号为'+orderNum+'的车险订单已报价完成';
    //                     var msg=null;
    //                     if(orderType==1)
    //                     {
    //                         msg='订单号为'+orderNum+'的车险订单已报价完成\r\n'+'是否现在进入车险订单页面查看';
    //                         this.props.dispatch(enableCarOrderRefresh());
    //                     }
    //                     else if(orderType==2)
    //                     {
    //                         msg='订单号为'+orderNum+'的寿险订单已报价完成\r\n'+'是否现在进入寿险订单页面查看';
    //                         this.props.dispatch(enableCarOrderRefresh());
    //                     }
    //
    //                     this.props.dispatch(getAccessToken())
    //                         .then(function (json) {
    //                             if(json.re==1)
    //                             {
    //                                 //获取accesToken
    //                                 this.props.dispatch(createNotification(payload,orderType==1?'car':'life'))
    //                                     .then(function (json) {
    //                                         return this.props.dispatch(downloadGeneratedTTS({content:msg}));
    //                                     })
    //                                     .then(function (json) {
    //
    //                                         if(json.re==1)
    //                                         {
    //                                             var path=json.data;
    //
    //                                             console.log('播放音频文件路径:  '+path);
    //
    //                                             //TODO:播放音频文件
    //                                             var sound = new Sound(json.data, '', (error) => {
    //                                                 if (error) {
    //                                                     console.log('failed to load the sound', error);
    //                                                 }else{
    //                                                     this.state.soundMounted=sound;
    //                                                     setTimeout(() => {
    //                                                         sound.play((success) => {
    //                                                             if (success) {
    //                                                                 console.log('successfully finished playing');
    //                                                                 sound.release();
    //                                                                 this.state.soundMounted=null;
    //                                                             } else {
    //                                                                 console.log('playback failed due to audio decoding errors');
    //                                                                 sound.release();
    //                                                                 this.state.soundMounted=null;
    //                                                             }
    //                                                         });
    //                                                     }, 100);
    //                                                 }
    //                                             });
    //
    //
    //                                             //TODO:popup插件,当点击这个插件时取消音频播放,sound.stop();sound.release();
    //                                             this.props.dispatch(alertWithType({msg:content}));
    //
    //
    //                                         }
    //
    //
    //                                     })
    //                             }
    //                         })
    //
    //
    //                     break;
    //             }
    //             break;
    //     }
    //
    // }


    constructor(props) {
        super(props);
        this.state={
            tab:'home',
            selectedTab:props.tab.rootTab,
            name:null,

        }
    }


    render() {

        var props=this.props;
        let auth=this.props.auth;
        var {tab}=this.props
        if(auth==true)
        {

            var defaultStyle={
                backgroundColor:'#eeecf3',
                paddingBottom:5,
                paddingTop:5,
                height:60
            }

            var defaultSceneStyle={
            }

            if(tab.hidden==true)
            {
                defaultStyle.height=0
                defaultStyle.paddingBottom=0
                defaultStyle.paddingTop=0
                defaultSceneStyle.paddingBottom=0
            }


            return (

                <TabNavigator  tabBarStyle={defaultStyle} sceneStyle={defaultSceneStyle}>
                    {this._createNavigatorItem('首页','home')}
                    {this._createNavigatorItem('消息','comment-o')}
                    {this._createNavigatorItem('发现','search')}
                    {this._createNavigatorItem('我的','user-o')}
                </TabNavigator>
            );
        }else{

            switch(props.page.state)
            {
                case PAGE_LOGIN:
                    return (<Login/>);
                    break;
                case PAGE_REGISTER:
                    return (<Register/>);
                    break;
                case PAGE_PASSWORDFORGET:
                    return (<PasswordForget/>);
                    break;
            }

        }
    }
    onBackAndroid()
    {
        if(this.lastBackPressed&&this.lastBackPressed+2000>=Date.now())
        {
            return false;
        }
        this.lastBackPressed=Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        return true;
    }
    componentWillMount()
    {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
        this.pushlisteners.forEach(listener=> {
            JPush.removeEventListener(listener);
        });
    }

    componentDidMount()
    {
        //TODO:fetch username and password in cache
        //JPush.requestPermissions()

        JPush.getRegistrationID().then(function (res){
            if(res&&res!=''){
                var registrationID=res;
                console.log('jPush获得registrationId='+registrationID);
            }
        })


        this.pushlisteners = [
            JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
            JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
        ]

            //console.log("Opening notification!");



        if(Platform.OS=='android')
        {
            //ToastAndroid.show('Awesome', ToastAndroid.SHORT);
            //NotificationAndroid.notify('你有新的apk版本等待更新')
            UpdateAndroid.check()
        }

        WeChat.registerApp('wx9068ac0e88c09e7a').then(function (res) {
            console.log("羽毛球热微信注册成功！！！！！");

        })

    }


    onReceiveMessage(message) {
        //TODO:make a notification through
        var notification=message._data;
        JPush.getRegistrationID().then(function (res){
            if(res&&res!=''){
                var registrationID=res;
                console.log('jPush获得registrationId='+registrationId);
            }
        })
       // this.onNotificationRecv(notification);
    }

    onOpenMessage(message) {
        console.log(message);

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default connect(
    (state) => ({
        tab:state.tab,
        auth:state.user.auth,
        page:state.page,
    })
)(App);
