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

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddActivity from './AddActivity';

class Activity extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    _onRefresh() {
        this.setState({ isRefreshing: true, fadeAnim: new Animated.Value(0) });
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

    renderRow(rowData,sectionId,rowId){

        var row=(
            <View style={{flex:1,backgroundColor:'#fff',marginTop:5,marginBottom:5,}}>
                <View style={{flex:1,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:5}}>
                        <View>
                            <Text>小鱼丁</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:5}}>
                            <Icon name={'venus'} size={14} color="pink"/>
                            <Text style={{color:'#aaa',fontSize:11}}>25岁</Text>
                        </View>
                    </View>
                    <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>

                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Text>AA</Text>
                    </View>
                </View>
                <View style={{flex:3,padding:10}}>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'star'} size={16} color="#66CDAA"/>
                        </View>
                        <View style={{flex:7,color:'#343434'}}>
                            <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.type}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.eventPlace}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>{rowData.eventTime}</Text>
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
                        <Text style={{color:'#aaa',fontSize:13}}>0报名</Text>
                    </View>
                    <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                        <Text style={{color:'#aaa',fontSize:13}}>0评论</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center'}}>

                    </View>
                    <TouchableOpacity style={{flex:2,borderWidth:1,borderColor:'#66CDAA',padding:5,justifyContent:'center',alignItems:'center',borderRadius:6}}>
                        <Text style={{color:'#66CDAA',fontSize:12}}>我要报名</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
        return row;
    }

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
        }
    }

    render() {

        var activityList = [
            {eventBrief:'love sports',type:'基础练习',eventTime:'2017-06-08 10:30',eventPlace:'山大软件园',eventMaxMemNum:5,memberLevel:'业余小白',hasCoach:0,hasSparring:0},
            {eventBrief:'爱运动爱生活',type:'羽毛球单打',eventTime:'2017-06-08 10:30',eventPlace:'奥体中心羽毛球馆',eventMaxMemNum:3,memberLevel:'中级爱好者',hasCoach:0,hasSparring:0},
        ]
        var activityListView=null;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if(activityList!==undefined&&activityList!==null&&activityList.length>0)
        {
            activityListView=(

                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(activityList)}
                    renderRow={this.renderRow.bind(this)}
                />
            );
        }

        return (

            <View style={{flex:1}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>群活动</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </View>
                </View>

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
                            <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',padding:15}}>
                                <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                            </View>
                        </ScrollView>

                    </Animated.View>
                </View>

                <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                position:'absolute',bottom:3}}>
                    <View style={{flex:3,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',padding:10,borderTopWidth:1,borderColor:'#eee'}}>
                        <Text style={{color:'#66CDAA',}}>我的邀约</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',padding:5,borderWidth:1,borderColor:'#eee',borderRadius:50}}
                    onPress={()=>{this.navigate2AddActivity();}}>
                        <Icon name={'plus-circle'} size={35} color='#66CDAA'/>
                    </TouchableOpacity>
                    <View style={{flex:3,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',padding:10,borderTopWidth:1,borderColor:'#eee'}}>
                        <Text style={{color:'#66CDAA',}}>我的报名</Text>
                    </View>
                </View>

            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {

    },

});

const mapStateToProps = (state, ownProps) => {

    const props = {}
    return props
}

export default connect(mapStateToProps)(Activity);

