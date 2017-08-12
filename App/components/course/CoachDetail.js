/**
 * Created by dingyiming on 2017/8/1.
 */
/**
 * Created by dingyiming on 2017/7/31.
 */

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
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper';

class CoachDetail extends Component{

    constructor(props) {
        super(props);
        this.state={
            coachDetail:this.props.coachDetail
        }
    }

    render() {

        var sportLevelList = ['','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'];
        var coachLevelList = ['','金牌教练','银牌教练','铜牌教练'];

        var coachDetail = this.state.coachDetail;
        return (
            <View style={{flex:1}}>

                <Toolbar width={width} title={coachDetail.perName} navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                         }}>
                    <View style={{flex:2,width:width,position:'relative'}} >
                        <View style={{marginTop:20,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                            {
                                this.state.portrait!==undefined&&this.state.portrait!==null?

                                    <TouchableOpacity style={{height:height*90/736,width:height*90/736,borderRadius:height*45/736}}
                                                      onPress={()=>{
                                         this.showPortraitDialog();
                                    }}>
                                        <Image resizeMode="stretch" style={{height:height*90/736,width:height*90/736,
                            borderRadius:height*45/736}} source={{uri:this.state.portrait}}/>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={{height:height*90/736,width:height*90/736,borderRadius:height*45/736}}
                                                      onPress={()=>{
                                         this.showPortraitDialog();
                                    }}>
                                        <Image resizeMode="stretch" style={{height:height*90/736,width:height*90/736,borderRadius:height*45/736}}
                                               source={require('../../../img/portrait.jpg')}/>
                                    </TouchableOpacity>
                            }
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:15}}>
                            <Text style={{color:'#343434',fontSize:15,marginRight:5}}>{coachDetail.perName}</Text>
                            {
                                coachDetail.genderCode==1?
                                    <Icon name={'mars'} size={16} color="#66CDAA"/>:
                                    <Icon name={'venus'} size={16} color="pink"/>
                            }
                        </View>
                    </View>

                    <View style={{flex:5,padding:10,paddingTop:20,marginTop:15,backgroundColor:'#fff',borderTopWidth:1,borderColor:'#eee'}}>

                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>姓名：</Text>
                            </View>
                            <View style={{flex:5,color:'#343434',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start'}}>{coachDetail.perName}</Text>
                            </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>联系方式：</Text>
                            </View>
                            <View style={{flex:5,color:'#343434',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start'}}>{coachDetail.mobilePhone}</Text>
                            </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>教练等级：</Text>
                            </View>
                            <View style={{flex:5,color:'#343434',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start'}}>{coachLevelList[coachDetail.coachLevel]}</Text>
                            </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>运动水平：</Text>
                            </View>
                            <View style={{flex:5,color:'#343434',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start'}}>{sportLevelList[coachDetail.sportLevel]}</Text>
                            </View>
                        </View>

                        <View style={{flex:3,flexDirection:'row',marginBottom:3}}>

                        </View>
                    </View>

                </Toolbar>

            </View>
        );
    }

}

var styles = StyleSheet.create({


});

module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        coaches:state.coach.coaches,
    })
)(CoachDetail);
