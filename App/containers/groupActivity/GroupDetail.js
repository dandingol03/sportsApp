import React,{Component} from 'react';
import {
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
import Ionicons from 'react-native-vector-icons/Ionicons';

class GroupDetail extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state={
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
            groupList:[
                {groupId:1,groupNum:'G00001',groupName:'宇宙无敌战队组',groupManager:'小鱼丁',createTime:new Date(),memberCount:5,isManager:true},
                {groupId:2,groupNum:'G00002',groupName:'骑摩托的部长队组',groupManager:'Danding',createTime:new Date(),memberCount:3,isManager:false},
            ],

        }
    }

    render() {

        return (
            <View style={{flex:1, backgroundColor:'#eee',}}>

                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',
                    backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>群名</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width:width,height:height,backgroundColor:'#eee'}}>
                    <View style={{flex:1,backgroundColor:'#eee',}}>
                        <View style={{flex:1,backgroundColor:'#fff',padding:5}}>
                            <Text>XXX创建的群</Text>
                            <Text>群号</Text>
                        </View>
                        <View style={{flex:1,backgroundColor:'#fff',padding:5}}>
                            <Text>群成员</Text>
                        </View>

                    </View>
                </ScrollView>

            </View>
        );
    }

}

var styles = StyleSheet.create({


});

module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        groupList:state.activity.groupList,
        groupOnFresh:state.activity.groupOnFresh
    })
)(GroupDetail);
