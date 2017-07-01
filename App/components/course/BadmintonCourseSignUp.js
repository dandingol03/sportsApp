

import React, { Component } from 'react';
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
    InteractionManager
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Popover from 'react-native-popover'
import TextInputWrapper from 'react-native-text-input-wrapper'
import MadeCustomCourse from './MadeCustomCourse';
import CreateBadmintonCourse from './CreateBadmintonCourse';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import {BoxShadow,BorderShadow} from 'react-native-shadow';
var { height, width } = Dimensions.get('window');

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;
import{
    fetchPersonRelative,
} from '../../action/CourseActions';
import{
    onRelativePersonsUpdate
} from '../../action/UserActions';

class BadmintonCourseSignUp extends Component {

    goBack() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            event: {},
            menuVisible: false,
            memberLevelButtons: ['取消', '无', '体育本科', '国家一级运动员', '国家二级运动员', '国家三级运动员'],
            eventTypeButtons: ['取消', '羽毛球单打', '羽毛球双打', '羽毛球混双', '基础练习'],
            filter: {
                cost: 'ascend'
            },
            relative:props.relative
        };
    }


    render() {

        const shadowOpt = {
            width:width-10,
            height:190,
            color:"#000",
            border:2,
            radius:0,
            opacity:0.2,
            x:4,
            y:1.5,
            style:{marginVertical:5}
        }

        var {classInfo}=this.props
        var {relative}=this.state

        var schedules=[]
        classInfo.shedules.map((schedule,i)=>{

            var dayMap={
                1:'周一',
                2:'周二',
                3:'周三',
                4:'周四',
                5:'周五'
            }

            schedules.push(
                <View key={i} style={{flexDirection:'row',padding:2,paddingHorizontal:10,marginTop:10}}>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name={'clock-o'} size={15} color="#666" style={{backgroundColor:'transparent'}}/>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:9}}>
                        <Text style={{color:'#222',fontSize:13}}>{dayMap[schedule.sectionDay]} {schedule.sectionStart}~{schedule.sectionEnd}</Text>
                    </View>

                </View>)
        })

        var persons=[]
        relative.map((person,i)=>{
            persons.push(
                <TouchableOpacity key={i} style={{flexDirection:'row',padding:4,paddingHorizontal:10,marginTop:4}}
                    onPress={()=>{
                        //TODO:选中
                    }}
                >

                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                        <Text>{person.username}</Text>
                    </View>
                    <View style={{flex:1}}></View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10,width:70}}>
                        <Icon name={'square-o'} size={20} color="#666"/>
                    </View>
                </TouchableOpacity>
            )
        })

        return(
            <View style={styles.container}>
                <View style={{height:70,width:width,paddingTop:30,flexDirection:'row',justifyContent:'center',
                    backgroundColor:'#66CDAA'}}>
                    <TouchableOpacity style={{width:60,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Ionicons name={'md-arrow-back'} size={25} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                        <Text style={{color:'#fff',fontSize:18}}>课程详情</Text>
                    </View>
                    <TouchableOpacity ref="menu"  style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{
                          this.showPopover('menu')
                      }}
                    >
                        <Ionicons name={'md-more'} size={25} color="#fff"/>
                    </TouchableOpacity>
                </View>


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
                                    {classInfo.className}
                                </Text>



                                <View style={{flex:1}}></View>

                                <Text style={{fontSize:13,color:'#008B00',fontWeight:'bold'}}>
                                    {classInfo.venueName}
                                </Text>

                            </View>


                            {schedules}

                            <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,alignItems:'center',marginTop:10}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Icon name={'users'} size={15} color="#666"/>
                                </View>

                                <View style={{flexDirection:'row',alignItems:'center',marginLeft:9}}>
                                    <Text style={{color:'#222',fontSize:13}}>最大人数{classInfo.maxNumber}</Text>
                                </View>

                            </View>

                            <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,alignItems:'center',marginTop:10}}>
                                <View style={{flexDirection:'row',alignItems:'center',marginLeft:3}}>
                                    <Icon name={'user'} size={15} color="#666"/>
                                </View>

                                <View style={{flexDirection:'row',alignItems:'center',marginLeft:12}}>
                                    <Text style={{color:'#222',fontSize:13}}>已报名人数{classInfo.signNumber}</Text>
                                </View>

                            </View>


                            <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,alignItems:'center',justifyContent:'flex-end'}}>

                                <View style={{padding:4,marginLeft:10,flexDirection:'row',alignItems:'center',marginRight:5}}>
                                    <CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
                                    <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>
                                        {classInfo.perName}
                                    </Text>
                                </View>

                                <View style={{backgroundColor:'#f00',borderRadius:3,padding:4,marginLeft:5}}>
                                    <Text style={{color:'#fff',fontSize:13}}>
                                        ￥{classInfo.cost}
                                    </Text>
                                </View>
                            </View>


                        </TouchableOpacity>
                    </BoxShadow>


                    <View style={{flexDirection:'column',marginTop:20,borderWidth:2,borderColor:'#00BCD4',
                        borderTopLeftRadius:4,borderTopRightRadius:4}}>
                        <View style={{flexDirection:'row',padding:10,alignItems:'center',
                            backgroundColor:'#00BCD4'}}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontWeight:'bold'}}>关联人</Text>
                            </View>
                        </View>


                        <View style={{flexDirection:'row',padding:4,paddingHorizontal:10,marginTop:4}}>

                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>用户名</Text>
                            </View>

                            <View style={{flex:1}}>

                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10,width:70}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>
                                    勾选
                                </Text>
                            </View>

                        </View>
                        {persons}




                    </View>

                </View>


            </View>
        )
    }

    componentDidMount()
    {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(fetchPersonRelative()).then((json)=>{
                if(json.re==1)
                {
                    this.props.dispatch(onRelativePersonsUpdate(json.data))
                }
            })
        });
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    popoverContent: {
        width: 100,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText: {
        color: '#ccc',
        fontSize: 14
    }
});



const mapStateToProps = (state, ownProps) => {

    const props = {
        userType: parseInt(state.user.usertype),
        relative:state.user.relative
    }
    return props
}


export default connect(mapStateToProps)(BadmintonCourseSignUp);
