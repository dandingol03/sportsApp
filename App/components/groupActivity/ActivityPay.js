
import React, {Component} from 'react';
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
    BackAndroid
} from 'react-native';
import {connect} from 'react-redux';
var WeChat = require('react-native-wechat');
import TextInputWrapper from 'react-native-text-input-wrapper';

import {
    wechatPay,
} from '../../action/UserActions';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'
var {height, width,scale} = Dimensions.get('window');

class ActivityPay extends Component{
    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    wechatPay(pay,eventId){

        this.props.dispatch(wechatPay(pay,eventId)).then((json)=>{
            if(json.re==1){
                if(pay.payType=='微信'){
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
                            Alert.alert('信息','支付成功',[{text:'确认',onPress:()=>{
                                this.goBack();
                            }}]);


                        },
                        (error)=>{
                            console.log(error);
                        }
                    )
                }
                else{
                    Alert.alert('信息','支付成功',[{text:'确认',onPress:()=>{
                        this.goBack();
                    }}]);
                }


            }

        })


    }

    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,
            activity:this.props.activity,
            pay:{payment:'',payType:'微信'},
        };
    }

    render(){
        activity = this.props.activity;

        return (
            <View style={styles.container}>
                <Toolbar width={width} title="支付" actions={[]} navigator={this.props.navigator}>

                    <ScrollView style={{height:height-200,width:width,backgroundColor:'#fff',padding:5}}>

                        <View style={{flex:4,padding:10,margin:5,backgroundColor:'#fff'}}>
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
                                    {activity.startTime}--{activity.endTime}
                                </Text>
                            </View>

                            <View style={{flex:1,paddingBottom:5,marginTop:5}}>
                                <Text style={{fontSize:13,color:'#aaa'}}>Tips:</Text>
                                <Text  style={{fontSize:13,color:'#aaa'}}>每人15元/次,不限时间,球自备。</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row',flex:1,padding:10,margin:5,backgroundColor:'#fff'}}>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                                <Text style={{color:'#343434'}}>支付费用：</Text>
                            </View>
                            <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                                <TextInputWrapper
                                    placeholderTextColor='#888'
                                    textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                    placeholder="请输入待支付费用"
                                    val={this.state.pay.payment}
                                    onChangeText={
                                    (value)=>{
                                        this.setState({pay:Object.assign(this.state.pay,{payment:value})})
                                    }}
                                    onCancel={
                                    ()=>{this.setState({pay:Object.assign(this.state.pay,{payment:null})});}
                                }
                                />
                            </View>
                        </View>

                        <View style={{flexDirection:'row',flex:2,padding:10,margin:5,backgroundColor:'#fff'}}>
                            <Text>
                                支付方式:
                            </Text>

                            {
                                this.state.pay.payType=='微信'?
                                    <TouchableOpacity style={{flexDirection:'row',marginLeft:20}}
                                                      onPress={()=>{
                                              var pay = this.state.pay;
                                              //pay.payType = null;
                                              pay.payType = '微信'
                                              this.setState({pay:pay});
                        }}>
                                        <Icon name={'dot-circle-o'} size={15} color="#66CDAA"/>
                                        <Text style={{marginLeft:10}}>微信支付</Text>
                                    </TouchableOpacity>:
                                    <TouchableOpacity style={{flexDirection:'row',marginLeft:20}}
                                                      onPress={()=>{
                                              var pay = this.state.pay;
                                              pay.payType = '微信';
                                              this.setState({pay:pay});
                        }}>
                                        <Icon name={'circle-o'} size={15} color="#66CDAA"/>
                                        <Text style={{marginLeft:10}}>微信支付</Text>
                                    </TouchableOpacity>

                            }

                            {/*{*/}
                                {/*this.state.pay.payType=='现金'?*/}
                                    {/*<TouchableOpacity style={{flexDirection:'row',marginLeft:20}}*/}
                                                      {/*onPress={()=>{*/}
                                              {/*var pay = this.state.pay;*/}
                                              {/*pay.payType = null;*/}
                                              {/*this.setState({pay:pay});*/}
                        {/*}}>*/}
                                        {/*<Icon name={'dot-circle-o'} size={15} color="#66CDAA"/>*/}
                                        {/*<Text style={{marginLeft:10}}>现金支付</Text>*/}
                                    {/*</TouchableOpacity>:*/}
                                    {/*<TouchableOpacity style={{flexDirection:'row',marginLeft:20}}*/}
                                                      {/*onPress={()=>{*/}
                                               {/*var pay = this.state.pay;*/}
                                              {/*pay.payType = '现金';*/}
                                              {/*this.setState({pay:pay});*/}
                        {/*}}>*/}
                                        {/*<Icon name={'circle-o'} size={15} color="#66CDAA"/>*/}
                                        {/*<Text style={{marginLeft:10}}>现金支付</Text>*/}
                                    {/*</TouchableOpacity>*/}

                            {/*}*/}

                        </View>

                        <TouchableOpacity style={{flexDirection:'row',flex:3,padding:10,justifyContent:'center',alignItems: 'center'}}
                                          onPress={()=>{
                                this.wechatPay(this.state.pay,this.state.activity.eventId);
                            }}>
                            <View style={{backgroundColor:'#66CDAA',padding:5,paddingLeft:20,paddingRight:20,borderRadius:5}}>
                                <Text style={{color:'#fff'}}>
                                    确认
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>

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



