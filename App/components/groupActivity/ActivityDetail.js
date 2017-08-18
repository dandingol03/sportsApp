/**
 * Created by dingyiming on 2017/6/5.
 */

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
import GridView from 'react-native-grid-view';
import ActivityPay from './ActivityPay';
import {
    deleteActivity,exitActivity,
} from '../../action/ActivityActions';
import {getAccessToken,} from '../../action/UserActions';

class ActivityDetail extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    deleteActivity(eventId)
    {
        this.props.dispatch(deleteActivity(eventId)).then((json)=>{
            if(json.re==1){
                alert('活动撤销成功！');
                this.props.setMyActivityList();
                this.goBack();
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }
            }
        });

    }

    exitActivity(eventId)
    {
        this.props.dispatch(exitActivity(eventId)).then((json)=>{
            if(json.re==1){
                alert('已成功退出活动！');
                this.props.setMyActivityList();
                this.goBack();
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }
            }
        });
    }

    renderRow(rowData)
    {
        return  (
            <View>
                <View style={{height:50,width:50,borderRadius:10,borderWidth:1,borderColor:'#eee',margin:5}}>
                    <Image resizeMode="stretch" style={{height:50,width:50,borderRadius:10,}} source={rowData.portrait}/>
                </View>
                <View style={{justifyContent:'center',alignItems: 'center',}}>
                    <Text numberOfLines={1} style={{color:'#343434',}}>{rowData}</Text>
                </View>
            </View>
        );

    }

    navigate2ActivityPay(activity)
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'ActivityPay',
                component: ActivityPay,
                params: {
                    activity:activity
                }
            })
        }
    }

    constructor(props) {
        super(props);
        this.state={
            activity:this.props.activity,
        }
    }

    render() {

        var flag = this.props.flag;

        var activity = this.state.activity;
        var {personInfo}=this.props;

        var start = activity.startTime;


        var memberList = activity.memberList;
        if(memberList!==null&&memberList!==undefined){
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            var dataSource=ds.cloneWithRows(memberList);
        }

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>活动详情</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>分享</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:7,backgroundColor:'#fff',marginTop:5,marginBottom:5,borderBottomWidth:1,borderColor:'#ddd'}}>
                    <View style={{flex:1,padding:10,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>
                        <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                            <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:5}}>
                            <View>
                                <Text>{activity.eventManager.username}</Text>
                            </View>
                        </View>
                        <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                            {
                                (activity.group!==null&&activity.group!==undefined)?
                                    <View>
                                        <Text>{activity.group.groupName}</Text>
                                    </View>:null
                            }

                        </View>
                    </View>
                    <View style={{flex:3,padding:10}}>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                            </View>
                            <View style={{flex:7,color:'#343434'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{activity.eventName}</Text>
                            </View>
                        </View>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{activity.eventPlace.name}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{activity.eventPlace.address}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                                {activity.startTime}--{activity.endTime}
                                </Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                                {'人均费用：'+activity.cost}
                            </Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}v>{activity.eventBrief}</Text>
                        </View>
                    </View>
                    <View style={{flex:3,padding:5,borderTopWidth:1,borderColor:'#ddd'}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={{color:'#aaa',fontSize:13}}>已报名用户</Text>
                        </View>
                        <View style={{flex:4,backgroundColor:'#fff',padding:10}}>
                            <GridView
                                items={dataSource}
                                itemsPerRow={5}
                                renderItem={this.renderRow.bind(this)}
                                style={styles.listView}
                            />
                        </View>
                    </View>
                </View>


                <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                position:'absolute',bottom:8}}>


                    {
                        flag=='公开活动'?null:
                            <TouchableOpacity style={{flex:3,flexDirection:'row',backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',padding:10,
                    borderTopWidth:1,borderRightWidth:1,borderColor:'#eee'}}
                                              onPress={()=>{
                                            this.navigate2ActivityPay(activity)
                                      }}>
                                <Icon name={'comment-o'} size={14} color="#66CDAA"/>
                                <Text style={{color:'#66CDAA',}}>支付</Text>
                            </TouchableOpacity>

                    }


                    {
                        flag=='公开活动'?
                    <TouchableOpacity style={{flex:3,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',padding:10,
                    borderTopWidth:1,borderColor:'#eee'}}
                    onPress={()=>{
                        this.props.signUpActivity(this.props.activity).then((json)=>{
                             if(json.re==1){
                                Alert.alert('信息','报名成功,是否立即支付？',[{text:'是',onPress:()=>{
                                // this.setMyActivityList();
                                this.navigate2ActivityPay(activity);
                                }},
                                {text:'否',onPress:()=>{
                                this.goBack();

                            }},
                    ]);

                }else{
                    if(json.re==-100){
                        this.props.dispatch(getAccessToken(false));
                    }
                }

                        });
                    }}>
                        <Text style={{color:'#66CDAA',}}>报名</Text>
                    </TouchableOpacity>:null

                    }

                    {
                        flag=='我的活动'?
                            <TouchableOpacity style={{flex:3,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',
                            padding:10,borderTopWidth:1,borderColor:'#eee'}}
                                              onPress={()=>{this.deleteActivity(activity.eventId);}}>
                                <Text style={{color:'#66CDAA',}}>撤销</Text>
                            </TouchableOpacity>:null

                    }

                    {
                        flag=='我的报名'?
                            <TouchableOpacity style={{flex:3,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',
                            padding:10,borderTopWidth:1,borderColor:'#eee'}}
                                              onPress={()=>{this.exitActivity(activity.eventId);}}>
                                <Text style={{color:'#66CDAA',}}>退出</Text>
                            </TouchableOpacity>:null

                    }

                </View>

            </View>
        );
    }

}

var styles = StyleSheet.create({


});


module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        activityList:state.activity.activityList,
        myEvents:state.activity.myEvents,
        visibleEvents:state.activity.visibleEvents,
        activityOnFresh:state.activity.activityOnFresh,
    })
)(ActivityDetail);


