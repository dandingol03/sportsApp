/**
 * Created by dingyiming on 2017/8/16.
 */

import React, { Component } from 'react';
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
    InteractionManager
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {Toolbar,OPTION_SHOW,OPTION_NEVER,ACTION_ADD} from 'react-native-toolbar-wrapper'
import competitionSchedule from './CompetitionSchedule';
import {
    fetchMyGames,disableActivityOnFresh,enableActivityOnFresh
} from '../../action/MyCompetationActions';
import {getAccessToken,} from '../../action/UserActions';
var { height, width } = Dimensions.get('window');



class MyCompetitionList extends Component {

    goBack() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }


    navigate2CompetitionSchedule(rowData){

                    const { navigator } = this.props;
                    if(navigator) {
                        navigator.push({
                            name: 'competitionSchedule',
                            component: competitionSchedule,
                            params: {
                                rowData:rowData,

                            }
                        })
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

    // setMyActivityList()
    // {
    //     this.props.dispatch(enableActivityOnFresh());
    // }

    constructor(props) {
        super(props);
        this.state = {

            doingFetch:false,
            isRefreshing:false,
            fadeAnim:new Animated.Value(1),
        };
    }
    fetchData(){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        this.props.dispatch(fetchMyGames()).then((json)=> {
            if(json.re==-100){
                this.props.dispatch(getAccessToken(false));
            }
            this.props.dispatch(disableActivityOnFresh());
            this.setState({doingFetch:false,isRefreshing:false})
        }).catch((e)=>{
            this.props.dispatch(disableActivityOnFresh());
            this.setState({doingFetch:false,isRefreshing:false});
            alert(e)
        });
    }


    

    renderRow(rowData,sectionId,rowId){

        var starttime=rowData.startTime;
        var endtime=rowData.endTime;
        var time=new Date(starttime);
        var year=time.getFullYear();
        var month=time.getMonth()+1;
        var day=time.getDate();
        var min=time.toTimeString().substr(0,8);
        var tt=year+'-'+month+'-'+day+' '+min;

        var time1=new Date(endtime);
        var year1=time1.getFullYear();
        var month1=time1.getMonth()+1;
        var day1=time1.getDate();
        var min1=time1.toTimeString().substr(0,8);
        var tt1=year1+'-'+month1+'-'+day1+' '+min1;

        var row=(
            <View style={{flex:1,backgroundColor:'#fff',marginTop:5,marginBottom:5,}}>
                <View style={{flex:1,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                    </View>
                    <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}
                                      onPress={()=>{
                                          this.navigate2CompetitionSchedule(rowData,'公开活动');
                                      }}>
                        <Text style={{marginRight:5,color:'#66CDAA'}}>详情</Text>
                        <Icon name={'angle-right'} size={25} color="#66CDAA"/>
                    </TouchableOpacity>
                </View>
                <View style={{flex:3,padding:10}}>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'star'} size={16} color="#66CDAA"/>
                        </View>
                        <View style={{flex:7}}>
                            <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.competitionName}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.breif}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:4,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {tt}    --
                        </Text>
                        <Text style={{flex:4,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {tt1}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'主办方：'+rowData.hostUnit}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'主办方地点：'+rowData.unitName}
                        </Text>
                    </View>
                </View>

            </View>
        );
        return row;
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
            <View style={styles.container}>
                {/*tabbar部分*/}
                <Toolbar width={width} title="我的比赛" actions={[]} navigator={this.props.navigator}>

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
                </Toolbar>

            </View>

        )
    }

    componentDidMount()
    {
        //this.setData(this.props.visibleEvents);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    popoverContent: {
        width: 100,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText: {
        color: '#ccc',
        fontSize: 14
    }
});

const mapStateToProps = (state, ownProps) => {

    const props = {

    }
    return props
}




//export default connect(mapStateToProps)(MyCompetitionList);
module.exports = connect(state=>({

        accessToken:state.user.accessToken,
        visibleEvents:state.mycompetition.competitionList,
        activityOnFresh:state.mycompetition.activityOnFresh
    })
)(MyCompetitionList);
