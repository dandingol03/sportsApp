/**
 * Created by youli on 2017/12/25.
 */

import React,{Component} from 'react';

import  {
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    ScrollView,
    Alert,
    TouchableOpacity,
    Dimensions,
    Animated,
    RefreshControl,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputWrapper from 'react-native-text-input-wrapper';
import DateFilter from '../../utils/DateFilter';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import {
    enableCompetitionItemOnFresh,
} from '../../action/CompetitionActions';

import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';
var {height, width} = Dimensions.get('window');
class FieldOrder extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
    close(){
        if(this.props.onClose!==undefined&&this.props.onClose!==null)
        {
            this.props.onClose();
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
        // this.props.dispatch(enableActivityOnFresh());
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState(nextProps)
    }




    confirm()
    {
        if(this.props.onConfirm)
            this.props.onConfirm(this.state.team)
    }

    doCheck()
    {
        if(this.state.team.teamName&&this.state.team.teamName!=''
            &&this.state.team.remark&&this.state.team.remark!='')
        {
            return true
        }else{
            return false
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            fadeAnim:new Animated.Value(1),
        }
    }

    render() {


        return (


            <View style={{flex:1, backgroundColor: '#fff'}}>
                <View style={{height:55,width:width,paddingTop:10,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:10,justifyContent:'center',alignItems: 'center'}}>
                        <Text style={{color:'#fff',fontSize:18}}>场地预约</Text>
                    </View>
                </View>

                <View style={{height:55,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
                    backgroundColor:'#eee'}}>
                        <TouchableOpacity style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}
                                          onPress={()=>{

                                }}
                        >
                            <Text style={{color:'#000',fontSize:16}}>周六</Text>
                            <Text style={{color:'#000',fontSize:16}}>时间</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
                    backgroundColor:'#eee'}}>
                        <TouchableOpacity style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}
                                          onPress={()=>{

                                }}
                        >
                            <Text style={{color:'#000',fontSize:16}}>周天</Text>
                            <Text style={{color:'#000',fontSize:16}}>时间</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{height:55,flexDirection:'row',marginTop:20,borderWidth:1,borderColor:'#ddd',
                        }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Icon name={'square-o'} size={25} color='#000'/>
                        <Text>  场地可选</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Icon name={'check'} size={25} color='#66CDAA'/>
                        <Text>  场地已选</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Icon name={'square'} size={25} color='#cccs'/>
                        <Text>  场地不可选</Text>
                    </View>
                </View>


                <View style={{flex:1,marginTop:20,borderWidth:2,borderColor:'#00BCD4',borderTopLeftRadius:4,borderTopRightRadius:4}}>
                    <View style={{height:65,flexDirection:'row',padding:10,alignItems:'center',
                            backgroundColor:'#00BCD4'}}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:11}}>
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:16}}>时间</Text>
                        </View>

                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#66CDAA',
                                    padding:6,paddingHorizontal:8,borderRadius:13,marginLeft:20}}
                                          onPress={()=>{

                                }}
                        >
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:16}}>场地一</Text>
                        </TouchableOpacity>
                    </View>


                    {/*内容区*/}
                    <View style={{height:200,backgroundColor:'#fff',padding:3}}>
                        <ScrollView style={{height:200,flexDirection:'row',padding:3,marginTop:4,backgroundColor:'red'}}>
                            <View style={{flexDirection:'column',}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>8：00</Text>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>|</Text>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>9：00</Text>
                            </View>

                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>|</Text>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>10：00</Text>
                            </View>

                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>|</Text>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>11：00</Text>
                            </View>
                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>|</Text>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>12：00</Text>
                            </View>
                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>|</Text>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>13：00</Text>
                            </View>
                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>|</Text>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>14：00</Text>
                            </View>
                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>|</Text>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>15：00</Text>
                            </View>
                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>|</Text>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>15：00</Text>
                            </View>
                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>|</Text>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>15：00</Text>
                            </View>
                        </ScrollView>
                    </View>


                </View>

                {/*<View style={styles.card}>*/}
                {/*<QRCode*/}
                {/*value={"您已成功支付"+this.state.team+"元"}*/}
                {/*size={200}*/}
                {/*bgColor='purple'*/}
                {/*fgColor='white'/>*/}
                {/*</View>*/}

            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        borderTopWidth:0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderTopColor:'#fff'
    },
    body:{
        padding:200
    },
    row:{
        flexDirection:'row',
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderBottomColor:'#222'
    },
});

module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        user:state.user.user,
    })
)(FieldOrder);



