
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

                    <View style={{flexDirection:'row',flex:3,padding:10,justifyContent:'center',alignItems: 'center'}}>
                        <View style={{backgroundColor:'#66CDAA',padding:5,paddingLeft:20,paddingRight:20,borderRadius:5}}>
                            <Text style={{color:'#fff'}}>
                                确认
                            </Text>
                        </View>
                    </View>

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



