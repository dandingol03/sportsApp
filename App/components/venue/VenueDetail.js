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
class VenueDetail extends Component{

    constructor(props) {
        super(props);
        this.state={
            venueDetail:this.props.venueDetail
        }
    }

    render() {

        var venueDetail = this.state.venueDetail;
        return (
            <View style={{flex:1}}>

                <Toolbar width={width} title={this.state.venueDetail.name} navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                         }}>
                    <View style={{flex:3}}>
                        <Image style={{flex:3,width:width,position:'relative'}} source={require('../../../img/my_banner.jpeg')} >

                        </Image>
                    </View>

                    <View style={{flex:5,padding:10,marginTop:10,backgroundColor:'#fff'}}>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>地址：</Text>
                            </View>
                            <View style={{flex:5,color:'#343434',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start'}}>{venueDetail.address}</Text>
                            </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>管理人：</Text>
                            </View>
                            <View style={{flex:5,color:'#343434',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start'}}>{venueDetail.manager}</Text>
                            </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>联系电话：</Text>
                            </View>
                            <View style={{flex:5,color:'#343434',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start'}}>{venueDetail.phone}</Text>
                            </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>费用说明：</Text>
                            </View>
                            <View style={{flex:5,color:'#343434',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start'}}>{venueDetail.feeDes}</Text>
                            </View>
                        </View>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>场馆简介：</Text>
                            </View>
                            <View style={{flex:5,color:'#343434',justifyContent:'flex-start',alignItems: 'flex-start'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start'}}>{venueDetail.brief}</Text>
                            </View>
                        </View>
                        <View style={{flex:2,flexDirection:'row',marginBottom:3}}>

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
)(VenueDetail);
