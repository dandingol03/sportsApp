import React,{Component} from 'react';
import {
    Alert,
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
    Modal,
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputWrapper from 'react-native-text-input-wrapper';
import InviteFriendModel from './InviteFriendModel.js';
import {
    createGroup,searchMember,
    enableMyGroupOnFresh,
    enableCompetitionItemOnFresh,
    signUpCompetition,
    addPersonsToCompetitionTeam,
} from '../../action/CompetitionActions';
import {getAccessToken,} from '../../action/UserActions';
import CompetitionSignUp from './CompetitionSignUp';
class InviteFriends extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    searchMember(info){
        this.props.dispatch(searchMember(info)).then((json)=>{
            if(json.re==1){
                this.setState({member:json.data});
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }else{
                    alert('该用户未注册，是否邀请');
                    //TODO:微信分享邀请好友
                }
            }
        });
    }

    removeMember(memberList,rowData) {
        var index=null;
        memberList.map((member, i) => {
            if(member.mobilePhone==rowData.mobilePhone){
                index = i;
            }else{
                index=-1;
            }
        });
        if(index!==-1){
            memberList.splice(index, 1);
            this.setState({memberList:memberList});
        }
    }

    inviteFriend(info){
        this.props.dispatch(inviteFriend(info)).then((json)=>{
            if(json.re==1){
                Alert.alert('信息','创建成功',[{text:'确认',onPress:()=>{
                    this.props.dispatch(enableMyGroupOnFresh());
                    this.goBack()
                }}]);
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }else{
                    alert('创建失败');
                }

            }
        });
    }



    renderRow(rowData,sectionId,rowId){
        var row=(
            <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',marginBottom:5,padding:5,borderBottomWidth:1,
                borderColor:'#eee',borderRadius:8}}>
                <View style={{flex:1,}}>
                    <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={rowData.portrait}/>
                </View>
                <View style={{flex:3,marginLeft:5}}>
                    <View style={{flexDirection:'row',marginLeft:10}}>
                        <Icon name={'user'} size={15} color="pink"/>
                        <Text style={{marginLeft:10,color:'#343434'}}>{rowData}</Text>
                    </View>
                    {/*<View  style={{flexDirection:'row',marginLeft:10,marginTop:5}}>
                        <Icon name={'mobile'} size={15} color="#87CEFF"/>
                        <Text style={{marginLeft:10,color:'#aaa'}}>{rowData.mobilePhone}</Text>
                    </View>*/}
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                </View>
                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',margin:10,borderWidth:1,borderColor:'#FF4040',borderRadius:5}}
                                  onPress={()=>{
                                      this.removeMember(this.state.memberList,rowData);
                                  }}>
                    <Text style={{color:'#FF4040',fontSize:12,}}>删除</Text>
                </TouchableOpacity>
            </View>
        );
        return row;
    }

    navigateCompetitionSignUp(memberList)
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'CompetitionSignUp',
                component: CompetitionSignUp,
                params: {
                    memberList:memberList
                }
            })
        }
    }
    constructor(props) {
        super(props);
        this.state={
            modalVisible:false,
            doingFetch: false,
            isRefreshing: false,
            member:null,
            memberList:this.props.rowData.personList,
        }
        if(this.state.memberList.length==0){
            var person = this.props.personInfo;
            person.username = this.props.user.username;
            this.state.memberList.push(person.username);
        }

    }

    render() {

        var memberList = this.state.memberList;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if(memberList!==undefined&&memberList!==null&&memberList.length>0)
        {
            memberListView=(
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(memberList)}
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
                        <Text style={{color:'#fff',fontSize:18}}>编辑队员</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </View>
                </View>

                <View style={{flex:5,backgroundColor:'#fff'}}>

                    {/*添加队员*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',
                        margin:10,marginTop:5,marginBottom:10}}>
                        <View style={{flex:1,justifyContent:'center',alignItems: 'flex-start',}}>
                            <Text style={{color:'#343434'}}>添加队员：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-end',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TouchableOpacity style={{marginRight:15}}
                                              onPress={()=>{
                                                  this.setState({modalVisible:true});
                                              }}>
                                <Ionicons name='md-add-circle'  size={26} color="#66CDAA"/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        (this.state.memberList==null||this.state.memberList==undefined||this.state.memberList.length==0)?
                            null:
                            <View style={{height:height*0.4,padding:5,borderWidth:1,borderColor:'#eee',backgroundColor:'#eee'}}>
                                <ScrollView style={{height:height*0.4}}>
                                    {memberListView}
                                </ScrollView>
                            </View>
                    }


                    <View style={{flex:1,backgroundColor:'#fff',padding:10}}>
                        <Text style={{color:'#aaa',fontSize:11}}>
                            温馨提示：您发布的内容应合法、真实、健康、共创文明的网络环境
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={{height:35,backgroundColor:'#66CDAA',margin:20,justifyContent:'center',alignItems: 'center',borderRadius:10,}}
                                  onPress={()=>{
                                      //var info ={group:this.state.group,memberList:this.state.memberList};
                                      //this.createGroup(info);
                                      //var rowData=this.props.rowData;
                                      var memberList=this.state.memberList
                                      var personNameStr='';
                                      memberList.map((member,i)=>{

                                          personNameStr=personNameStr+member+","
                                          }

                                      );
                                      var length=personNameStr.length
                                      personNameStr=personNameStr.substring(0,length-1)
                                      var rowData=this.props.rowData;
                                     this.props.dispatch(addPersonsToCompetitionTeam(rowData,personNameStr)).then((json)=>{
                                      if(json.re==1){
                                          alert('编辑队伍成功',[{text:'是',onPress:()=>{
                                             this.props.dispatch(enableCompetitionItemOnFresh());
                                              this.navigateCompetitionSignUp(this.state.memberList);
                                          }},

                                          ]);

                                      }else{
                                          if(json.re==-100){
                                              this.props.dispatch(getAccessToken(false));
                                          }
                                          else{
                                              alert("编辑队伍失败！");
                                          }

                                      }
                                  }).then(()=>{
                                         this.props.dispatch(enableCompetitionItemOnFresh());
                                         this.navigateCompetitionSignUp(this.state.memberList);
                                     });


                                  }}>
                    <Text style={{color:'#fff',fontSize:15}}>确 认</Text>
                </TouchableOpacity>


                {/* Add GroupMember Modal*/}
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log("Modal has been closed.");
                    }}
                >

                    <InviteFriendModel
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
                                memberList.push(this.state.member.perNum);
                                this.setState({memberList:memberList});
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
        user:state.user.user,
        myGroupList:state.activity.myGroupList,
        groupOnFresh:state.activity.groupOnFresh
    })
)(InviteFriends);


