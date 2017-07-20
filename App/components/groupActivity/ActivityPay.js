
import React, {Component} from 'react';
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
    BackAndroid
} from 'react-native';
import {connect} from 'react-redux';
var WeChat = require('react-native-wechat');

import {
    wechatPay,
} from '../../action/UserActions';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'
var {height, width} = Dimensions.get('window');
import DateFilter from '../../utils/DateFilter';

class ActivityPay extends Component{
    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    wechatPay(){

        this.props.dispatch(wechatPay()).then((json)=>{
            if(json.re==1){
                var prepayId = json.data.prepayid;
                var sign = json.data.sign;
                var timeStamp = json.data.timestamp;
                var noncestr = json.data.noncestr;

                var wechatPayData=
                    {
                        partnerId: '1485755962',  // 商家向财付通申请的商家id
                        prepayId: prepayId,   // 预支付订单
                        nonceStr: noncestr,   // 随机串，防重发
                        timeStamp: timeStamp,  // 时间戳，防重发
                        package: 'Sign=WXPay',    // 商家根据财付通文档填写的数据和签名
                        sign: sign // 商家根据微信开放平台文档对数据做的签名
                    };

                WeChat.pay(wechatPayData).then(
                    (result)=>{
                        console.log(result);

                    },
                    (error)=>{
                        console.log(error);
                    }
                )

            }

        })


    }

    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,
            activity:this.props.activity,
        };
    }

    render(){
        activity = this.props.activity;

        return (
            <View style={styles.container}>
                <Toolbar width={width} title="支付" actions={[]} navigator={this.props.navigator}>

                    <View style={{flex:3,padding:10}}>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                            </View>
                            <View style={{flex:7,color:'#343434'}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{activity.eventName}</Text>
                            </View>
                        </View>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{activity.eventPlace.name}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{activity.eventPlace.address}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'circle'} size={10} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                                {DateFilter.filter(activity.eventTime,'yyyy-mm-dd hh:mm')}
                            </Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',flex:3,padding:10}}>
                        <Text>
                            支付方式:
                        </Text>
                        <View style={{flexDirection:'row',marginLeft:20}}>
                            <Icon name={'dot-circle-o'} size={15} color="#343434"/>
                            <Text style={{marginLeft:10}}>微信支付</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{flexDirection:'row',flex:3,padding:10,justifyContent:'center',alignItems: 'center'}}
                                      onPress={()=>{
                                this.wechatPay();
                            }}>
                        <View style={{backgroundColor:'#66CDAA',padding:5,paddingLeft:20,paddingRight:20,borderRadius:5}}>
                            <Text style={{color:'#fff'}}>
                                确认
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{flexDirection:'row',flex:3,padding:10}}>

                    </View>
                </Toolbar>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eee'
    },
    popoverContent: {
        width: 100,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText: {
        color: '#ccc',
        fontSize:14
    }
});


const mapStateToProps = (state, ownProps) => {

    var personInfo=state.user.personInfo
    const props = {
        username:state.user.user.username,
        perName:personInfo.perName,
        wechat:personInfo.wechat,
        perIdCard:personInfo.perIdCard
    }
    return props
}

export default connect(mapStateToProps)(ActivityPay);



