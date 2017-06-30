
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
import  Popover from  'react-native-popover';
import {BoxShadow,BorderShadow} from 'react-native-shadow';
import CustomCourseDetail from './CustomCourseDetail';
import {Toolbar,OPTION_SHOW,OPTION_NEVER,ACTION_ADD} from 'react-native-toolbar-wrapper'

var {height, width} = Dimensions.get('window');

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class CustomCourse extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    navigate2MadeCustomCourseDetail(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'MadeCustomCourse',
                component: CustomCourseDetail,
                params: {

                }
            })
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

        var displayArea = {x: 6, y: 4, width:width, height: height - 25};
        const shadowOpt = {
            width:width-13,
            height:124,
            color:"#000",
            border:2,
            radius:0,
            opacity:0.2,
            x:4,
            y:1.5,
            style:{marginVertical:5}
        }


        return (
            <View style={styles.container}>
                {/*tabbar部分*/}

                <Toolbar width={width} title="我的定制" navigator={this.props.navigator}
                         actions={[
                                    {icon:ACTION_ADD,value:'',show:OPTION_SHOW},
                                      {value:'发布定制',show:OPTION_NEVER},
                                    ]}
                         onPress={(i)=>{
                         console.log(i)
                     }}
                >

                    <View style={{justifyContent:'center',padding:5}}>
                        <BoxShadow setting={shadowOpt}>
                            <TouchableOpacity style={{width:width-8,padding:4,backgroundColor:'#fff',flexDirection:'column',
                                    paddingBottom:7,borderWidth:1,borderColor:'#eee'}}
                                              onPress={()=>{
                                    this.navigate2MadeCustomCourseDetail()
                                }}
                            >
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

                            </TouchableOpacity>
                        </BoxShadow>
                    </View>

                    <View style={{width:width,position:'absolute',bottom:20,flexDirection:'row',justifyContent:'center'}}>

                        <View style={{width:width/2,padding:6,paddingHorizontal:14,backgroundColor:'#66CDAA',
                           flexDirection:'row',justifyContent:'center',}}>
                            <Text style={{color:'#fff',fontSize:15}}>
                                发布
                            </Text>
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
                            <Text style={[styles.popoverText,{color:'#444'}]}>发布定制</Text>
                        </TouchableOpacity>

                    </Popover>

                </Toolbar>

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

export default connect()(CustomCourse);
