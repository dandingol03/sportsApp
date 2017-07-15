/**
 * Created by dingyiming on 2017/7/2.
 */

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
import PreferenceStore from '../../utils/PreferenceStore';
import AboutUs from './AboutUs';

class Setting extends Component{
    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    navigate2AboutUs()
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'AboutUs',
                component: AboutUs,
                params: {
                }
            })
        }
    }

    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,

        };
    }

    render(){

        return (
            <View style={styles.container}>
                <Toolbar width={width} title="设置" actions={[]} navigator={this.props.navigator}>

                    <View style={{flexDirection:'row',padding:10,paddingHorizontal:20}}>
                        <Text style={{color:'#444',fontSize:13}}>帐号</Text>
                    </View>

                    <View style={{backgroundColor:'#fff',padding:10}}>

                        {/*用户名*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,paddingTop:4,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                             this.navigate2AboutUs();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    关于我们
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/*退出*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}
                                          onPress={()=>{
                                               BackAndroid.exitApp();
                                               PreferenceStore.delete('username');
                                               PreferenceStore.delete('password');
                                              }}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    退出
                                </Text>
                            </View>
                        </TouchableOpacity>

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

export default connect(mapStateToProps)(Setting);


