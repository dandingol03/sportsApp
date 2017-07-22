
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
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
import News from './News';
import Login from './Login';
import Register from './Register';

import {
    updateRootTab
}  from '../action/TabActions';

import UpdateAndroid from '../native/UpdateAndroid'
var {height, width,scale} = Dimensions.get('window');

var WeChat = require('react-native-wechat');

class App extends Component {

    _createNavigatorItem(route,icon)
    {
        var component=Home;
        switch (route) {
            case '首页':
                break;
            case '消息':
                component=News;
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

    componentDidMount()
    {
        //TODO:fetch username and password in cache
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
