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
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-datepicker';
import DateFilter from '../../utils/DateFilter';
import {
    releaseActivity
} from '../../action/ActivityActions';


class ActivityDetail extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state={
            activity:this.props.activity,
        }
    }

    render() {

        var activity = this.state.activity;
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

                <View style={{flex:5,backgroundColor:'#fff',marginTop:5,marginBottom:5,borderBottomWidth:1,borderColor:'#ddd'}}>
                    <View style={{flex:1,padding:10,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>
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
                        <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}
                                          onPress={()=>{

                                      }}>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:2,padding:10}}>
                        <View style={{flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                            </View>
                            <View style={{flex:7,color:'#343434'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{activity.type}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{activity.eventPlace}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>{activity.eventTime}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}v>{activity.eventBrief}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row',padding:5,borderTopWidth:1,borderColor:'#ddd'}}>
                        <View style={{flex:2,justifyContent:'center'}}>
                            <Text style={{color:'#aaa',fontSize:13}}>已报名用户</Text>
                        </View>
                    </View>
                </View>

                <View style={{flex:7}}>
                    <TouchableOpacity style={{flex:1,padding:5,justifyContent:'center',alignItems:'center',}}>
                        <Text style={{color:'red',fontSize:12}}>撤销活动</Text>
                    </TouchableOpacity>

                </View>

                <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                position:'absolute',bottom:3}}>
                    <View style={{flex:3,flexDirection:'row',backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',padding:10,
                    borderTopWidth:1,borderRightWidth:1,borderColor:'#eee'}}>
                        <Icon name={'comment-o'} size={14} color="#66CDAA"/>
                        <Text style={{color:'#66CDAA',}}>评论</Text>
                    </View>
                    <View style={{flex:3,backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',padding:10,borderTopWidth:1,borderColor:'#eee'}}>
                        <Text style={{color:'#66CDAA',}}>报名管理</Text>
                    </View>
                </View>

            </View>
        );
    }

}

var styles = StyleSheet.create({


});

const mapStateToProps = (state, ownProps) => {

    const props = {

    }
    return props
}

export default connect(mapStateToProps)(ActivityDetail);

