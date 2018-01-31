/**
 * Created by dingyiming on 2017/11/1.
 */

import React, {Component} from 'react';
import {
    Dimensions,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    TextInput,
    BackAndroid,
    findNodeHandle,
    NativeModules
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import{
    getPushUrl,
    getPlayUrl,
} from '../../action/LiveActions';

import PlayKit from './PlayKit';
import PushStreaming from './PushStreaming';


import PlayerView from './PlayerView';

import PushStreamView from './PushStreamView';
var PushStreamViewManager = NativeModules.PushStreamViewManager;

import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'
var {height, width} = Dimensions.get('window');

class LiveHome extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    navigate2PushStreaming(pushUrl){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'pushStreaming',
                component: PushStreaming,
                params: {
                    pushUrl:pushUrl
                }
            })
        }
    }

    navigate2PlayKit(playUrl){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'playKit',
                component: PlayKit,
                params: {
                    playUrl:playUrl
                }
            })
        }
    }

    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,
            pushUrl:null,
            playUrl:null,
            pushFlag:false,
            playFlag:false,
            changeValue:false,

        };
    }

    getPushUrl(){
       // this.setState({pushFlag:true});

        // this.props.dispatch(getPushUrl()).then((json)=>{
        //     if(json.re==1)
        //     {
        //         this.setState({pushUrl:json.data.rtmppushUrl});
        //         var pushUrl = json.data.pushUrl;
        //         this.navigate2PushStreaming(pushUrl);
        //     }
        //     else{
        //
        //     }
        // })
    }

    getPlayUrl(){

        this.setState({playFlag:true});
        // this.props.dispatch(getPlayUrl()).then((json)=>{
        //     if(json.re==1)
        //     {
        //         this.setState({playUrl:json.data.rtmppushUrl});
        //         var playUrl = json.data.playUrl;
        //         this.navigate2PlayKit(playUrl);
        //
        //     }
        //     else{
        //
        //     }
        // })

    }

    startPush(){
        PushStreamViewManager.startPush('Birthday Party', '4 Privet Drive, Surrey');


    }

    render(){

        return (
            <View style={styles.container}>
                <Toolbar width={width} title="直播首页" actions={[]} navigator={this.props.navigator}>


                    {/*{*/}
                        {/*this.state.playFlag==true?*/}
                            {/*<View style={{flex:1,flexDirection:'row',backgroundColor:'#eee',*/}
                            {/*borderRadius:10}}>*/}

                                {/*<PlayerView/>*/}

                            {/*</View>:*/}
                            {/*<View style={{flex:1,flexDirection:'row',backgroundColor:'#eee',*/}
                            {/*borderRadius:10}}>*/}
                                {/*/!*<TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',*!/*/}
                            {/*/!*borderRadius:10}}*!/*/}
                                                  {/*/!*onPress={ ()=>{*!/*/}
                                         {/*/!*this.getPushUrl();}}>*!/*/}

                                    {/*/!*<Text style={{marginLeft:10}}>直播</Text>*!/*/}
                                {/*/!*</TouchableOpacity>*!/*/}

                                {/*<TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',*/}
                            {/*borderRadius:10}}*/}
                                                  {/*onPress={ ()=>{*/}
                                         {/*this.getPlayUrl();}}>*/}
                                    {/*<Text style={{marginLeft:10}}>观看</Text>*/}
                                {/*</TouchableOpacity>*/}
                            {/*</View>*/}

                    {/*}*/}

                     {
                        this.state.pushFlag==false?
                             <View style={{flex:1,backgroundColor:'#eee',borderRadius:10}}>

                                 <View style={{flex:8,backgroundColor:'#eee', borderRadius:10}}>
                                     <PushStreamView
                                         ref="theMyView"
                                     />
                                 </View>

                                 <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',borderRadius:10}}
                                                   onPress={ ()=>{
                                          this.startPush();}}>

                                     <Text style={{marginLeft:10}}>开始</Text>
                                 </TouchableOpacity>

                             </View>:
                             <View style={{flex:1,backgroundColor:'#eee',borderRadius:10}}>
                                 <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                             borderRadius:10}}
                                                   onPress={ ()=>{
                                          //this.getPushUrl();
                                                       this.navigate2PushStreaming()
                                                   }}>

                                     <Text style={{marginLeft:10}}>直播</Text>
                                 </TouchableOpacity>
                            </View>

                    }

                </Toolbar>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eee'
    },
    popoverContent: {
        width: 100,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText: {
        color: '#ccc',
        fontSize:14
    },
    private: {
        width: 200,
        height: 200,
        backgroundColor: 'white'
    }
});


const mapStateToProps = (state, ownProps) => {

    var personInfo=state.user.personInfo
    const props = {
        username:state.user.user.username,
        perName:personInfo.perName,
        wechat:personInfo.wechat,
        perIdCard:personInfo.perIdCard
    }
    return props
}

export default connect(mapStateToProps)(LiveHome);


