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
    Easing,
    Modal
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GridView from 'react-native-grid-view';
import GroupMemberModal from './GroupMemberModal';
import {
   searchMember,deleteGroup,exitGroup
} from '../../action/ActivityActions';

class GroupDetail extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    renderRow(rowData)
    {

        if(rowData.addNewOne==true)
        {
            return  (
                <View>
                    <TouchableOpacity style={{height:50,width:50,borderRadius:10,borderWidth:1,borderColor:'#ddd',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                      onPress={()=>{
                        this.setState({modalVisible:true});
                }}>
                        <Ionicons name='md-add' size={26} color="#ddd"/>
                    </TouchableOpacity>
                    <View>
                        <Text> </Text>
                    </View>
                </View>

            );
        }else{
            return  (
                <View>
                    <View style={{height:50,width:50,borderRadius:10,borderWidth:1,borderColor:'#eee',margin:5}}>
                        <Image resizeMode="stretch" style={{height:50,width:50,borderRadius:10,}} source={rowData.portrait}/>
                    </View>
                    <View>
                        <Text numberOfLines={1}>{rowData.username}</Text>
                    </View>
                </View>
            );
        }
    }

    searchMember(info){
        this.props.dispatch(searchMember(info)).then((json)=>{
            if(json.re==1){
                this.setState({member:json.data});
            }else{
                alert('该用户未注册，是否邀请');
                //TODO:微信分享邀请好友
            }
        });
    }

    deleteGroup(groupId)
    {
        this.props.dispatch(deleteGroup(groupId)).then((json)=>{
            if(json.re==1){
                alert('删除成功');
                this.props.setMyGroupList();
                this.goBack();
            }
        });

    }

    exitGroup(group)
    {
        this.props.dispatch(exitGroup(group)).then((json)=>{
            if(json.re==1){
                alert('退群成功');
                this.props.setMyGroupList();
                this.goBack();
            }
        });
    }

    constructor(props) {
        super(props);
        var memberList = this.props.memberList;
        this.state={
            modalVisible:false,
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
            groupInfo:this.props.groupInfo,
            member:null,
            memberList:memberList,
        }
    }

    render() {

        var memberList = this.state.memberList;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var dataSource=ds.cloneWithRows(memberList);
        var flag = this.props.flag;
        var {personInfo}=this.props;

        return (
            <View style={{flex:1, backgroundColor:'#eee',}}>

                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',
                    backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>{this.state.groupInfo.groupName}</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width:width,height:height,backgroundColor:'#eee',}}>
                    <View style={{flex:1,backgroundColor:'#eee',marginBottom:5}}>
                        <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',padding:10}}>
                            <View style={{justifyContent:'center',alignItems: 'center',}}>
                                <Text>群成员</Text>
                            </View>
                            <TouchableOpacity style={{marginLeft:10,justifyContent:'center',alignItems: 'center',}}
                                              onPress={()=>{this.setState({ modalVisible:true,})}}>
                                <Icon name={'plus-square-o'} size={20} color="#888"/>
                            </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor:'#fff',padding:10}}>
                            <GridView
                                items={dataSource}
                                itemsPerRow={5}
                                renderItem={this.renderRow.bind(this)}
                                style={styles.listView}
                            />
                        </View>
                    </View>

                    <View style={{flex:1,backgroundColor:'#fff',padding:5,paddingBottom:0}}>
                        <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',padding:5,justifyContent:'center',alignItems: 'center',
                                      borderBottomWidth:1,borderColor:'#eee'}}>
                            <View style={{flex:2}}>
                                <Text>群组名称:</Text>
                            </View>
                            <View style={{flex:4,}}>
                                <Text>{this.state.groupInfo.groupName}</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <Icon name={'angle-right'} size={25} color="#aaa"/>
                            </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',padding:5,justifyContent:'center',alignItems: 'center',
                                      borderBottomWidth:1,borderColor:'#eee'}}>
                            <View style={{flex:2}}>
                                <Text>群号:</Text>
                            </View>
                            <View style={{flex:4,}}>
                                <Text>{this.state.groupInfo.groupNum}</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <Icon name={'angle-right'} size={25} color="#aaa"/>
                            </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',padding:5,justifyContent:'center',alignItems: 'center',
                         borderBottomWidth:1,borderColor:'#eee'}}>
                            <View style={{flex:2}}>
                                <Text>群简介:</Text>
                            </View>
                            <View style={{flex:4,}}>
                                <Text>{this.state.groupInfo.groupBrief}</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <Icon name={'angle-right'} size={25} color="#aaa"/>
                            </View>
                        </View>
                    </View>

                    {

                        (flag=='我的组详情'&&this.props.groupInfo.groupManager==personInfo.personId)?
                    <TouchableOpacity style={{height:30,backgroundColor:'#EE6A50',margin:20,justifyContent:'center',alignItems: 'center',borderRadius:10,}}
                                      onPress={()=>{
                                            this.deleteGroup(this.props.groupInfo.groupId);
                                      }}>
                        <Text style={{color:'#fff',fontSize:15}}>删除并退出</Text>
                    </TouchableOpacity>:null

                    }

                    {
                        (flag=='我的组详情'&&this.props.groupInfo.groupManager!==personInfo.personId)?
                            <TouchableOpacity style={{height:30,backgroundColor:'#EE6A50',margin:20,justifyContent:'center',alignItems: 'center',borderRadius:10,}}
                                              onPress={()=>{
                                                  this.exitGroup(this.props.groupInfo);
                                      }}>
                                <Text style={{color:'#fff',fontSize:15}}>退出</Text>
                            </TouchableOpacity>:null

                    }


                </ScrollView>

                {/* Add GroupMember Modal*/}
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log("Modal has been closed.");
                    }}
                >

                    <GroupMemberModal
                        onClose={()=>{
                            this.setState({modalVisible:false});
                        }}
                        searchMember={(info)=>{
                            this.searchMember(info);
                        }}
                        member={this.state.member}
                        accessToken={this.props.accessToken}
                        setMemberList={()=>{
                            if(this.state.member!==null&&this.state.member!==undefined){
                                var memberList = this.state.memberList;
                                memberList.push(this.state.member);
                                this.setState({memberList:memberList});
                                //TODO:把新加入的成员添到数据库
                            }
                        }}
                    />

                </Modal>


            </View>
        );
    }

}

var styles = StyleSheet.create({


});

module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        groupList:state.activity.groupList,
        groupOnFresh:state.activity.groupOnFresh
    })
)(GroupDetail);
