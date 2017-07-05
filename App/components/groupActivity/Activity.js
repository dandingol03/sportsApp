import React, {Component} from 'react';
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

import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');

import DateFilter from '../../utils/DateFilter';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddActivity from './AddActivity';
import MyActivity from './MyActivity';
import ActivityDetail from './ActivityDetail';
import {
    fetchActivityList,disableActivityOnFresh,enableActivityOnFresh,signUpActivity
} from '../../action/ActivityActions';

import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'
/**
 * 群活动
 */

class Activity extends Component {

    goBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _onRefresh() {
        this.setState({isRefreshing: true, fadeAnim: new Animated.Value(0)});
        setTimeout(function () {
            this.setState({
                isRefreshing: false,
            });
            Animated.timing(          // Uses easing functions
                this.state.fadeAnim,    // The value to drive
                {
                    toValue: 1,
                    duration: 600,
                    easing: Easing.bounce
                },           // Configuration
            ).start();
        }.bind(this), 500);
        this.props.dispatch(enableActivityOnFresh());

    }

    setMyActivityList()
    {
        this.props.dispatch(enableActivityOnFresh());
    }

    navigate2AddActivity(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'add_activity',
                component: AddActivity,
                params: {

                }
            })
        }
    }

    navigate2MyActivity(myEvents,flag){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'my_activity',
                component: MyActivity,
                params: {
                    myEvents:myEvents,
                    flag:flag
                }
            })
        }
    }

    navigate2ActivityDetail(rowData,flag){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'activity_detail',
                component: ActivityDetail,
                params: {
                    activity:rowData,
                    flag:flag,
                    signUpActivity:this.signUpActivity.bind(this)
                }
            })
        }
    }

    signUpActivity(event)
    {
        if(event.eventMaxMemNum<=event.eventNowMemNum){
            alert('该活动人数已满！');

        }else{
            this.props.dispatch(signUpActivity(event)).then((ins)=>{
                if(json.re==1){
                    alert('报名成功');
                }
            })
        }
    }

    renderRow(rowData,sectionId,rowId){

        var row=(
            <View style={{flex:1,backgroundColor:'#fff',marginTop:5,marginBottom:5,}}>
                <View style={{flex:1,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:5}}>
                        <View>
                            <Text>{rowData.eventManager.username}</Text>
                        </View>
                    </View>
                    <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                        {rowData.groupId==null?null:
                            <Text>（组活动）</Text>
                        }
                    </View>
                    <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}
                                      onPress={()=>{
                                          this.navigate2ActivityDetail(rowData,'公开活动');
                                      }}>
                        <Text style={{marginRight:5}}>详情</Text>
                        <Icon name={'angle-right'} size={25} color="#343434"/>
                    </TouchableOpacity>
                </View>
                <View style={{flex:3,padding:10}}>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'star'} size={16} color="#66CDAA"/>
                        </View>
                        <View style={{flex:7}}>
                            <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.eventName}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.eventPlace.name}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {DateFilter.filter(rowData.eventTime,'yyyy-mm-dd hh:mm')}
                            </Text>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}v>{rowData.eventBrief}</Text>
                    </View>
                </View>
                <View style={{flex:1,flexDirection:'row',padding:10,borderTopWidth:1,borderColor:'#ddd'}}>
                    <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                        <Text style={{color:'#aaa',fontSize:13}}>{rowData.memberList.length}报名</Text>
                    </View>
                    <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                        <Text style={{color:'#aaa',fontSize:13}}>0评论</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center'}}>

                    </View>
                    <TouchableOpacity style={{flex:2,borderWidth:1,borderColor:'#66CDAA',padding:5,justifyContent:'center',alignItems:'center'
                    ,borderRadius:6}}
                                      onPress={()=>{this.signUpActivity(rowData)}}>
                        <Text style={{color:'#66CDAA',fontSize:12}}>我要报名</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
        return row;
    }

    fetchData(){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        this.props.dispatch(fetchActivityList()).then(()=> {
            this.props.dispatch(disableActivityOnFresh());
            this.setState({doingFetch:false,isRefreshing:false})
        }).catch((e)=>{
            this.props.dispatch(disableActivityOnFresh());
            this.setState({doingFetch:false,isRefreshing:false});
            alert(e)
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
        }
    }

    render() {

        var activityListView=null;
        var {activityList,activityOnFresh,visibleEvents,myEvents,myTakenEvents}=this.props;

        if(activityOnFresh==true)
        {
            if(this.state.doingFetch==false)
                this.fetchData();
        }else {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (visibleEvents !== undefined && visibleEvents !== null && visibleEvents.length > 0) {

                activityListView = (
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(visibleEvents)}
                        renderRow={this.renderRow.bind(this)}
                    />
                );
            }
        }

        return (

            <View style={{flex:1}}>

                <Toolbar width={width} title="群活动" navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                         }}
                >

                    {/*内容区*/}
                    <View style={{flex:5,backgroundColor:'#eee'}}>
                        <Animated.View style={{opacity: this.state.fadeAnim,height:height-150,paddingTop:5,paddingBottom:5,}}>
                            <ScrollView
                                refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                    tintColor="#9c0c13"
                                    title="刷新..."
                                    titleColor="#9c0c13"
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                    progressBackgroundColor="#ffff00"
                                />
                            }
                            >
                                {activityListView}

                                {
                                    activityListView==null?
                                       null:
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                                        </View>
                                }

                            </ScrollView>

                        </Animated.View>
                    </View>

                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',
                            position:'absolute',bottom:3}}>
                        <TouchableOpacity style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',
                            padding:10,margin:5}} onPress={()=>{this.navigate2MyActivity(myEvents,'我的活动');}}>
                            <Text style={{color:'#66CDAA',}}>我发起的活动</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',
                            padding:10,margin:5}} onPress={()=>{this.navigate2MyActivity(myTakenEvents,'我的报名');}}>
                            <Text style={{color:'#66CDAA',}}>我报名的活动</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{height:50,width:50,borderRadius:25,position:'absolute',bottom:3,left:width*0.5-25}}>
                        <TouchableOpacity style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',padding:5,
                        borderWidth:1,borderColor:'#eee',borderRadius:50}}
                                          onPress={()=>{this.navigate2AddActivity();}}>
                            <Icon name={'plus-circle'} size={35} color='#66CDAA'/>
                        </TouchableOpacity>
                    </View>

                </Toolbar>

            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {

    },

});


module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        activityList:state.activity.activityList,
        myEvents:state.activity.myEvents,
        myTakenEvents:state.activity.myTakenEvents,
        visibleEvents:state.activity.visibleEvents,
        activityOnFresh:state.activity.activityOnFresh,
    })
)(Activity);



