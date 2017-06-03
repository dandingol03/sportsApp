
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


class AddActivity extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }


    constructor(props) {
        super(props);
        this.state={
            eventName:'',
        }
    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#ddd'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#343434"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#343434',fontSize:18}}>发布邀约</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </TouchableOpacity>
                </View>

                <View style={{flex:8,backgroundColor:'#fff',padding:5}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>活动类型：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                        borderRadius:10}}>
                            <Text style={{color:'#aaa',marginRight:30,fontSize:13}}>请选择活动类型：</Text>
                            <Icon name={'angle-right'} size={30} color="#fff"/>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>活动时间：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                        borderRadius:10}}>
                            <Text style={{color:'#aaa',marginRight:30,fontSize:13}}>请选择活动时间：</Text>
                            <Icon name={'angle-right'} size={30} color="#fff"/>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>活动地点：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                        borderRadius:10}}>
                            <Text style={{color:'#aaa',marginRight:30,fontSize:13}}>请选择活动地点：</Text>
                            <Icon name={'angle-right'} size={30} color="#fff"/>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>活动人数：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                        borderRadius:10}}>
                            <Text style={{color:'#aaa',marginRight:30}}>请选择活动人数：</Text>
                            <Icon name={'angle-right'} size={30} color="#fff"/>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>对象水平：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                        borderRadius:10}}>
                            <Text style={{color:'#aaa',marginRight:30}}>请选择对象水平：</Text>
                            <Icon name={'angle-right'} size={30} color="#fff"/>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>邀请教练：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                        borderRadius:10}}>
                            <Text style={{color:'#aaa',marginRight:30}}>是否邀请教练：</Text>
                            <Icon name={'angle-right'} size={30} color="#fff"/>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>活动说明：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',
                        borderRadius:10}}>
                            <Text style={{color:'#aaa',marginRight:30}}>请选择项目类型：</Text>
                            <Icon name={'angle-right'} size={30} color="#fff"/>
                        </View>
                    </View>


                    <View style={{flex:1,backgroundColor:'#fff',padding:10}}>
                        <Text style={{color:'#aaa',fontSize:11}}>
                            温馨提示：您发布的内容应合法、真实、健康、共创文明的网络环境
                        </Text>
                    </View>
                </View>


                <View style={{height:40,backgroundColor:'#66CDAA',margin:30,justifyContent:'center',alignItems: 'center',
                borderRadius:10,}}>
                    <Text style={{color:'#fff',fontSize:15}}>发 布</Text>
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

export default connect(mapStateToProps)(AddActivity);

