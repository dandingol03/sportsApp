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
var Popover = require('react-native-popover');
import CreateGroup from './CreateGroup';
import GroupDetail from './GroupDetail';
import AllGroup from './AllGroup';

class MyGroup extends Component{

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

    showPopover(ref){
        this.refs[ref].measure((ox, oy, width, height, px, py) => {
            this.setState({
                menuVisible: true,
                buttonRect: {x: px+5, y: py+10, width: 200, height: height}
            });
        });
    }

    closePopover(){
        this.setState({menuVisible: false});
    }


    navigate2CreateGroup(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'create_group',
                component: CreateGroup,
                params: {

                }
            })
        }
    }

    navigate2AllGroup(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'all_group',
                component: AllGroup,
                params: {

                }
            })
        }
    }

    navigate2GroupDetail(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name:'group_detail',
                component: GroupDetail,
                params: {

                }
            })
        }
    }


    renderRow(rowData,sectionId,rowId){

        var row=(
            <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',marginBottom:5,padding:10}}>
                <View style={{flex:1,}}>
                    <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                </View>
                <View style={{flex:3,justifyContent:'center',alignItems: 'center',flexDirection:'row'}}>
                    <Text>{rowData.groupName}</Text>
                    <Text>({rowData.memberCount})</Text>
                    {
                        rowData.groupManager=='小鱼丁'?
                            <Icon name={'user'} style={{marginLeft:10}} size={18} color="pink"/>:null
                    }
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                </View>
                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',margin:10,borderWidth:1,borderColor:'#66CDAA',borderRadius:5}}
                onPress={()=>{
                    this.navigate2GroupDetail();
                }}>
                    <Text style={{color:'#66CDAA',fontSize:12,}}>详情</Text>
                </TouchableOpacity>
            </View>
        );
        return row;
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

        var displayArea = {x:5, y:10, width:width-20, height: height - 10};

        var groupListView=null;
        var groupList = this.state.groupList;

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (groupList !== undefined && groupList !== null && groupList.length > 0) {
            groupListView = (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(groupList)}
                    renderRow={this.renderRow.bind(this)}
                />
            );
        }

        return (
            <View style={{flex:1, backgroundColor:'#eee',}}>

                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',
                    backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>我的群组</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={this.showPopover.bind(this, 'menu')}  ref="menu">
                        <Ionicons name='md-add' size={26} color="#fff"/>
                    </TouchableOpacity>
                </View>

                <Animated.View style={{opacity: this.state.fadeAnim,height:height-150,borderTopWidth:1,borderColor:'#eee'}}>
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
                        {groupListView}
                    </ScrollView>
                </Animated.View>



                {/*popover part*/}
                <Popover
                    isVisible={this.state.menuVisible}
                    fromRect={this.state.buttonRect}
                    displayArea={displayArea}
                    onClose={()=>{this.closePopover()
                        }}
                    style={{backgroundColor:'transparent'}}
                    placement="bottom"
                >

                    <TouchableOpacity style={[styles.popoverContent,{borderBottomWidth:1,borderBottomColor:'#ddd',flexDirection:'row',justifyContent:'flex-start'}]}
                                      onPress={()=>{
                                              this.closePopover();
                                              setTimeout(()=>{
                                                   this.navigate2AllGroup();
                                              },300);

                                          }}>
                        <Ionicons name='md-person-add' size={20} color="#343434"/>
                        <Text style={[styles.popoverText]}>添加群</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.popoverContent,{borderBottomWidth:1,borderBottomColor:'#ddd',flexDirection:'row'}]}
                                      onPress={()=>{
                                              this.closePopover();
                                                 setTimeout(()=>{
                                                  this.navigate2CreateGroup();
                                              },300);
                                          }}>
                        <Ionicons name='md-add' size={20} color="#343434"/>
                        <Text style={[styles.popoverText]}>创建新群</Text>
                    </TouchableOpacity>

                </Popover>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    popoverContent: {
        width: 90,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText:{
        color:'#444',
        marginLeft:14,
        fontWeight:'bold'
    },

});

module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        groupList:state.activity.groupList,
        groupOnFresh:state.activity.groupOnFresh
    })
)(MyGroup);