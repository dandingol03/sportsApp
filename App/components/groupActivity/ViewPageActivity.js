
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
    Alert
} from 'react-native';
//import {getAccessToken} from '../action/UserActions';



import { connect } from 'react-redux';

import { Navigator } from 'react-native-deprecated-custom-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from 'react-native-tab-navigator';
import ActivityDetail from './ActivityDetail';
import UpdateAndroid from '../native/UpdateAndroid'

import Home from '../../containers/Home'
import Notice from '../../containers/Notice'
import Found from '../../containers/Found'
import My from '../../containers/My'
var {height, width,scale} = Dimensions.get('window');


class ViewPageActivity extends Component {

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
                   // this.props.dispatch(updateRootTab({tab:route}));
                }}
                tabStyle={{backgroundColor:'transparent',}}
                onSelectedStyle={{backgroundColor:'#eeecf3',}}
            >

                <View style={{flex:1,}}>
                    <Navigator
                        initialRoute={{ name: route, component:component }}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.FadeAndroid;
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
            share:1,
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





}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = connect(state=>({
    tab:state.tab,
    auth:state.user.auth,
    page:state.page,
    })
)(ViewPageActivity);
