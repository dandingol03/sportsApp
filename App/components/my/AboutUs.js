
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

class AboutUs extends Component{
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

        };
    }

    render(){

        return (
            <View style={styles.container}>
                <Toolbar width={width} title="关于我们" actions={[]} navigator={this.props.navigator}>

                    <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                        <Image resizeMode="stretch" style={{height:50,width:50,borderRadius:10}} source={require('../../../img/logo.png')}/>
                       <Text style={{marginLeft:10}}>山东运动热科技有限公司</Text>
                    </View>

                    <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#aaa',fontSize:13}}>

                        </Text>
                    </View>

                    <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#aaa',fontSize:13}}>Copyright©2016-2017</Text>
                        <Text style={{color:'#aaa',fontSize:13}}>山东运动热科技有限公司</Text>
                    </View >


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

export default connect(mapStateToProps)(AboutUs);


