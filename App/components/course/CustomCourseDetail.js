

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
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  Popover from  'react-native-popover'

var {height, width} = Dimensions.get('window');

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class CustomCourseDetail extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    showPopover(ref){
        this.refs[ref].measure((ox, oy, width, height, px, py) => {
            this.setState({
                menuVisible: true,
                buttonRect: {x: px+20, y: py+0, width: 200, height: height}
            });
        });
    }


    closePopover(){
        this.setState({menuVisible: false});
    }


    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,
            menuVisible:false,
        };
    }

    render()
    {

        var displayArea = {x: 5, y: 20, width:width, height: height - 25};


        return (
            <View style={styles.container}>
                {/*tabbar部分*/}
                <View style={{height:70,width:width,paddingTop:30,flexDirection:'row',justifyContent:'center',
                    backgroundColor:'#66CDAA'}}>
                    <TouchableOpacity style={{width:60,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Ionicons name={'md-arrow-back'} size={25} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                        <Text style={{color:'#fff',fontSize:18}}>定制详情</Text>
                    </View>
                    <TouchableOpacity ref="menu"  style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{
                          this.showPopover('menu')
                      }}
                    >
                        <Ionicons name={'md-more'} size={25} color="#fff"/>
                    </TouchableOpacity>
                </View>


                <View style={{flex:1,backgroundColor:'#eee'}}>

                    {/*card*/}
                    <View style={{padding:4,flexDirection:'column',borderWidth:1,borderColor:'#ccc',borderStyle:'dashed',
                            paddingBottom:7,backgroundColor:'#fff'}}>
                        <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,alignItems:'center'}}>
                            <Text style={{fontSize:16,color:'#222',fontWeight:'bold'}}>
                                壁球
                            </Text>

                            <Text style={{fontSize:14,color:'#333',marginLeft:12,fontWeight:'bold'}}>
                                100元
                            </Text>

                            <View style={{backgroundColor:'#008B00',borderRadius:2,padding:2,marginLeft:5}}>
                                <Text style={{color:'#fff',fontSize:11}}>
                                    教学
                                </Text>
                            </View>

                            <View style={{flex:1}}></View>


                            <Text style={{fontSize:13,color:'#008B00',fontWeight:'bold'}}>
                                进行中
                            </Text>

                        </View>

                        <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,marginTop:10}}>

                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name={'map-marker'} size={18} color="#666" style={{backgroundColor:'transparent'}}/>
                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                                <Text style={{color:'#222',fontSize:13}}>佳兴羽毛球馆</Text>
                            </View>

                        </View>

                        <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,marginTop:10}}>

                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name={'clock-o'} size={15} color="#666" style={{backgroundColor:'transparent'}}/>
                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',marginLeft:9}}>
                                <Text style={{color:'#222',fontSize:13}}>2017-06-12 截止</Text>
                            </View>

                        </View>

                        <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,marginTop:10}}>

                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name={'bell-o'} size={14} color="#666" style={{backgroundColor:'transparent'}}/>
                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',marginLeft:8}}>
                                <Text style={{color:'#222',fontSize:13}}>4天后到期</Text>
                            </View>

                        </View>

                    </View>

                    <View style={{padding:10,backgroundColor:'#fff',minHeight:130,width:width,marginTop:10}}>

                        <View style={{flexDirection:'row',justifyContent:'center'}}>

                            <Ionicons name={'ios-filing-outline'} size={40} />
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <Text style={{color:'#aaa',fontSize:14}}>
                                暂无教练提出接单请求
                            </Text>
                        </View>

                    </View>

                </View>

                <Popover
                    isVisible={this.state.menuVisible}
                    fromRect={this.state.buttonRect}
                    displayArea={displayArea}
                    onClose={()=>{this.closePopover()
                        }}>


                    <TouchableOpacity style={[styles.popoverContent]}
                                      onPress={()=>{
                              this.closePopover();
                          }}>
                        <Text style={[styles.popoverText,{color:'#444'}]}>取消定制</Text>
                    </TouchableOpacity>

                </Popover>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
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

export default connect()(CustomCourseDetail);
