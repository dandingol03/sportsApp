/**
 * Created by dingyiming on 2017/8/16.
 */
/**
 * Created by dingyiming on 2017/8/16.
 */

import React, { Component } from 'react';
import {
    Alert,
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
import {
    fetchGamesItem,disableCompetitionItemOnFresh,enableCompetitionItemOnFresh,signUpCompetition
,cancelCompetition
} from '../../action/CompetitionActions';
import { connect } from 'react-redux';
import {getAccessToken,} from '../../action/UserActions';
import {Toolbar,OPTION_SHOW,OPTION_NEVER,ACTION_ADD} from 'react-native-toolbar-wrapper'
var { height, width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import PopupDialog,{ScaleAnimation,DefaultAnimation,SlideAnimation} from 'react-native-popup-dialog';
const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });
import CreateTeamModel from './CreateTeamModel';
import InviteFriend from './InviteFriend';
import InviteFriends from './InviteFriends';
class CompetitionSignUp extends Component {

    goBack() {
        const { navigator } = this.props;
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
        this.props.dispatch(enableCompetitionItemOnFresh());

    }







    signUpCompetition1(competitionItem)          //单打
    {
        if(competitionItem.maxTeamNum<=competitionItem.nowTeamNum){
            alert('该队员人数已满！');
        }else{
            var {personId,personName}=this.props;
            /*var projectType=competitionItem.projectType;
            var projectId=competitionItem.projectId;*/
            var personIdA=personId;
            var personIdB=null;
            var teamName=personName;
            var remark=null;
            this.props.dispatch(signUpCompetition(competitionItem,personIdA,personIdB,teamName,remark)).then((json)=>{
                if(json.re==1){
                    Alert.alert('信息','报名成功',[{text:'是',onPress:()=>{
                        this.props.dispatch(enableCompetitionItemOnFresh());
                        //this.goBack();
                        //this.navigate2ActivityPay(event);
                    }},

                    ]);

                }else{
                    if(json.re==-100){
                        this.props.dispatch(getAccessToken(false));
                    }
                    else{
                        alert("取消报名失败！");
                    }

                }
            })
        }
    }




    renderRow(rowData,sectionId,rowId){
        var row=(
            <View style={{flex:1,backgroundColor:'#fff',marginTop:5,marginBottom:5,borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                <View style={{flex:1,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                    </View>

                   {/* <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}
                                      onPress={()=>{
                                          this.navigateCompetitionSignUp(rowData,'公开活动');
                                      }}>
                        <Text style={{marginRight:5,color:'#66CDAA'}}>报名</Text>
                        <Icon name={'angle-right'} size={25
                        } color="#66CDAA"/>
                    </TouchableOpacity>*/}
                </View>

                <View style={{flex:3,padding:10}}>

                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'项目编号：'+rowData.projectId}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'项目名称：'+rowData.projectName}；
                        </Text>
                    </View>




                    {rowData.maxTeamNum!==undefined&&rowData.maxTeamNum!==null?
                        <View style={{flexDirection:'row',marginBottom:3}}>
                          <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                          </View>
                          <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'最大队数：'+rowData.maxTeamNum}；
                          </Text>
                       </View>:null
                    }

                    {rowData.nowTeamNum !== undefined && rowData.nowTeamNum !== null ?
                        <View style={{flexDirection: 'row', marginBottom: 3}}>
                            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>

                            <Text style={{
                                flex: 7,
                                fontSize: 13,
                                color: '#343434',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {'已报名队数：' + rowData.nowTeamNum}；
                            </Text>
                        </View>:null
                    }
                    {this.props.memberList !== undefined && this.props.memberList !== null ?
                        <View style={{flexDirection: 'row', marginBottom: 3}}>
                            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>

                            <Text style={{
                                flex: 7,
                                fontSize: 13,
                                color: '#343434',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {/*{'队员：' + this.props.memberList.}；*/}
                            </Text>
                        </View>:null
                    }

                </View>

                <View style={{flex:1,flexDirection:'row',padding:10,borderTopWidth:1,borderColor:'#ddd'}}>
                    {/*<View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                        <Text style={{color:'#aaa',fontSize:13}}>已报名:{rowData.eventNowMemNum}</Text>
                    </View>*/}
                    {rowData.joinMark == 1 && rowData.projectType == 6 ?
                        <TouchableOpacity style={{
                            flex: 2,
                            borderWidth: 1,
                            borderColor: '#66CDAA',
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                            ,
                            borderRadius: 6
                        }}


                                          onPress={() => {
                                              this.navigate2InviteFriends(rowData);
                                          }
                                          }>
                            <Text style={{color: '#66CDAA', fontSize: 12}}>编辑队伍</Text>
                        </TouchableOpacity>:
                        <View style={{flex:2,justifyContent:'center',alignItems: 'center'}}>
                            <Text style={{color:'#aaa',fontSize:13}}></Text>
                        </View>
                    }
                    {<View style={{flex:3,justifyContent:'center',alignItems: 'center'}}>

                    </View>}
                    {rowData.joinMark ==0 ?
                        <TouchableOpacity style={{
                            flex: 2,
                            borderWidth: 1,
                            borderColor: '#66CDAA',
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                            ,
                            borderRadius: 6
                        }}


                                          onPress={() => {
                                             if(rowData.projectType==1||rowData.projectType==2)
                                              {
                                                  this.signUpCompetition1(rowData)
                                              }
                                              else if(rowData.projectType==6){
                                                 this.setState({rowData:rowData});
                                                  this.showScaleAnimationDialog();
                                              }
                                              else {
                                                   this.navigate2InviteFriend(rowData);
                                             }


                                          }

                                          }>
                            <Text style={{color: '#66CDAA', fontSize: 12}}>我要报名</Text>
                        </TouchableOpacity>:

                        <TouchableOpacity style={{
                            flex: 2,
                            borderWidth: 1,
                            borderColor: '#66CDAA',
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                            ,
                            borderRadius: 6
                        }}


                                          onPress={() => {
                                              this.props.dispatch(cancelCompetition(rowData)).then((json)=>{
                                                  if(json.re==1){
                                                      Alert.alert('信息','取消报名成功',[{text:'确认',onPress:()=>{
                                                          this.props.dispatch(enableCompetitionItemOnFresh());
                                                      }}]);

                                                  }else{
                                                      if(json.re==-100){
                                                          this.props.dispatch(getAccessToken(false));
                                                      }
                                                      else{
                                                          alert("取消报名失败")
                                                      }
                                                  }
                                              });
                                          }}>
                            <Text style={{color: '#66CDAA', fontSize: 12}}>取消报名</Text>
                        </TouchableOpacity>
                    }

                </View>



            </View>
        );
        return row;
    }

    fetchData(){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        var competitionId=this.props.rowData.competitionId;
        this.props.dispatch(fetchGamesItem(competitionId)).then((json)=> {
            if(json.re==-100) {
                this.props.dispatch(getAccessToken(false));
            }
            this.props.dispatch(disableCompetitionItemOnFresh());
            this.setState({doingFetch:false,isRefreshing:false})
        }).catch((e)=>{
            this.props.dispatch(disableCompetitionItemOnFresh());
            this.setState({doingFetch:false,isRefreshing:false});
            alert(e)
        });
    }

    navigate2InviteFriend(rowData)
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'InviteFriend',
                component: InviteFriend,
                params: {
                    rowData:rowData
                }
            })
        }
    }


    navigate2InviteFriends(rowData)
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'InviteFriends',
                component: InviteFriends,
                params: {
                    rowData:rowData
                }
            })
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            doingFetch:false,
            isRefreshing:false,
            fadeAnim:new Animated.Value(1),
            rewData:null,
        };
    }


    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }

    render() {
        var competitionItemListView=null;
        var {competitionItemList,competitionItemFresh}=this.props;
        if(competitionItemFresh==true)
        {
            if(this.state.doingFetch==false)
                this.fetchData();
        }else{
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (competitionItemList !== undefined && competitionItemList !== null && competitionItemList.length > 0)
            {
                competitionItemListView = (
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(competitionItemList)}
                        renderRow={this.renderRow.bind(this)}
                    />
                );
            }
        }


        return (
            <View style={styles.container}>
                <Toolbar width={width} title="比赛项目" actions={[]} navigator={this.props.navigator}>

                    {<View style={{flex:5,backgroundColor:'#eee'}}>
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
                                {competitionItemListView}
                                {
                                    competitionItemListView==null?
                                        null:
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                                        </View>
                                }

                            </ScrollView>

                        </Animated.View>
                        <PopupDialog
                            ref={(popupDialog) => {
                                this.scaleAnimationDialog = popupDialog;
                            }}
                            dialogAnimation={scaleAnimation}
                            actions={[]}
                        >
                            <View style={{flex:1,padding:10}}>
                                <CreateTeamModel
                                    onClose={()=>{
                                        this.scaleAnimationDialog.dismiss();
                                        // this.setState({modalVisible:false});
                                    }}

                                    onConfirm={(payload)=>{
                                        var rowData=this.state.rowData;
                                        var {personId}=this.props;
                                        var personIdA=personId;
                                        var personIdB=null;
                                        var teamName=payload.teamName;
                                        var remark=payload.remark;
                                        this.props.dispatch(signUpCompetition(rowData,personIdA,personIdB,teamName,remark)).then((json)=>{
                                            if(json.json.re==1)
                                            {
                                                alert('报名成功',[{text:'确认',onPress:()=>{
                                                    this.scaleAnimationDialog.dismiss();
                                                }},
                                                ]);


                                            }else if(json.json.re==-1){
                                                alert("团队名已存在，不能报名！");
                                                this.scaleAnimationDialog.dismiss();
                                            }else{
                                                alert("报名失败，请重新报名！");
                                            }

                                        })
                                    }}
                                />
                            </View>
                        </PopupDialog>
                    </View>}



                </Toolbar>

            </View>
        )
    }


    componentDidMount()
    {

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
        userType: state.user.usertype.perTypeCode,
    }
    return props
}


//export default connect(mapStateToProps)(CompetitionSignUp);
module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        competitionItemList:state.competitions.competitionItemList,
        competitionItemFresh:state.competitions.competitionItemFresh,
        personId:state.user.personInfo.personId,
        personName:state.user.personInfo.perName,
    })
)(CompetitionSignUp);
