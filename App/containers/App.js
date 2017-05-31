/**
 * Created by dingyiming on 2017/5/26.
 */
import React, { Component } from 'react';
import {
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

import Home from './Home';
import My from './My';
import Found from './Found';
import News from './News';

import {
    updateRootTab
}  from '../action/TabActions';

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
                titleStyle={{color:'#9e9ca3',fontSize:13}}
                selectedTitleStyle={{color:'#43CD80'}}
                renderIcon={() => <Icon name={icon} size={26} color="#aaa"/>}
                renderSelectedIcon={() => <Icon name={icon} size={26} color='#43CD80' />}
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

        return (

            <TabNavigator  tabBarStyle={{backgroundColor:'#eeecf3',paddingBottom:5,paddingTop:5,height:55}}>
                {this._createNavigatorItem('首页','home')}
                {this._createNavigatorItem('消息','comment-o')}
                {this._createNavigatorItem('发现','search')}
                {this._createNavigatorItem('我的','user-o')}
            </TabNavigator>
        );
    }

    componentDidMount()
    {
        //TODO:fetch username and password in cache
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
    })
)(App);