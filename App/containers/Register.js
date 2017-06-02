

import React,{Component} from 'react';
import {
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


class Register extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }


    constructor(props) {
        super(props);
        this.state={
           phoneNum:'',

        }
    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#008B00',borderBottomWidth:1,borderColor:'#ddd'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>手机号码注册</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:15}}>下一步</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:4,backgroundColor:'#eee',paddingTop:15,paddingBottom:10}}>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',padding:5,
                    backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#ddd'}}>
                        <View style={{flex:1,paddingLeft:5}}>
                            <Text style={{color:'#aaa'}}>+86：</Text>
                        </View>
                        <View style={{flex:6,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'}}>
                            <TextInput
                                style={{height:35*height/736,justifyContent:'center',alignItems: 'center',width:width*0.8,
                                paddingLeft:10,paddingRight:10,paddingTop:4,paddingBottom:4,fontSize:13}}
                                onChangeText={(eventName) => {
                                      this.setState({eventName:this.state.eventName});
                                    }}
                                value={this.state.goodName}
                                placeholder=' 请输入手机号码'
                                placeholderTextColor="#aaa"
                                underlineColorAndroid="transparent"
                                autoCapitalize="characters"
                            />

                        </View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',padding:5,}}>
                        <TextInput
                            style={{height:35*height/736,justifyContent:'center',alignItems: 'center',width:width,
                               paddingLeft:10,paddingRight:10,paddingTop:4,paddingBottom:4,fontSize:13}}
                            onChangeText={(eventName) => {
                                     this.setState({eventName:this.state.eventName});
                            }}
                            value={this.state.goodName}
                            placeholder=' 请输入验证码'
                            placeholderTextColor="#aaa"
                            underlineColorAndroid="transparent"
                            autoCapitalize="characters"
                        />
                    </View>

                    <TouchableOpacity style={{height:30,width:width*0.4,marginLeft:width*0.3,marginTop:20,justifyContent:'center',alignItems: 'center',
                borderRadius:10,borderWidth:1,borderColor:'#66CDAA'}}
                    onPress={()=>{

                    }}>
                        <Text style={{color:'#66CDAA',fontSize:13}}>发送验证码</Text>
                    </TouchableOpacity>

                    <View style={{marginTop:5,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#aaa',fontSize:11}}>无法获取验证码？</Text>
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

export default connect(mapStateToProps)(Register);

