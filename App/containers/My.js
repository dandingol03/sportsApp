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
import MyGroup from './groupActivity/MyGroup';
import CustomCourse from '../components/course/CustomCourse';

class Home extends Component{

    navigate2MyGroup(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'my_group',
                component: MyGroup,
                params: {

                }
            })
        }
    }

    navigate2CustomCourse(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'CustomCourse',
                component: CustomCourse,
                params: {

                }
            })
        }
    }

    constructor(props) {
        super(props);
        this.state={
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1)
        }
    }

    render() {

        return (
            <View style={{flex:1}}>
                <View style={{flex:2}}>
                    <Image style={{flex:2,width:width,position:'relative'}} source={require('../../img/my_banner.jpeg')} >
                        <View style={{marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Image resizeMode="stretch" style={{height:height*90/736,width:height*90/736,
                            borderRadius:height*45/736}} source={require('../../img/portrait.jpg')}/>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:15}}>
                            <Text style={{color:'#fff',fontSize:18}}>小鱼丁</Text>
                        </View>
                    </Image>
                </View>
                <View style={{flex:5,backgroundColor:'#eee'}}>
                    <View style={{flex:12,backgroundColor:'#eee'}}>
                        <TouchableOpacity style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                        onPress={()=>{
                            this.navigate2MyGroup();
                        }}>

                            <View style={{flex:1,backgroundColor:'#FF69B4',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                            justifyContent:'center',alignItems: 'center'}}>
                                <Icon name={'group'} size={18} color="#fff"/>
                            </View>
                            <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                                <Text>我的群</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}>
                            <View style={{flex:1,backgroundColor:'#FFEC8B',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                            justifyContent:'center',alignItems: 'center'}}>
                                <Icon name={'user'} size={20} color="#fff"/>
                            </View>
                            <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                                <Text>我的资料</Text>
                            </View>

                        </View>
                        <TouchableOpacity style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                            onPress={()=>{
                                this.navigate2CustomCourse()
                            }}
                        >
                            <View style={{flex:1,backgroundColor:'#98FB98',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                            justifyContent:'center',alignItems: 'center'}}>
                                <Icon name={'edit'} size={20} color="#fff"/>
                            </View>
                            <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                                <Text>我的课程定制</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}>
                            <View style={{flex:1,backgroundColor:'#63B8FF',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                            justifyContent:'center',alignItems: 'center'}}>
                                <Icon name={'gear'} size={20} color="#fff"/>
                            </View>
                            <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                                <Text>设置</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex:1,backgroundColor:'#eee'}}>

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

export default connect(mapStateToProps)(Home);
