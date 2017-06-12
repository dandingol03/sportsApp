
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
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import  Popover from  'react-native-popover'
import TextInputWrapper from 'react-native-text-input-wrapper'
import {BoxShadow} from 'react-native-shadow';
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-datepicker';
import MadeCustomCourse from './MadeCustomCourse'


import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';


var {height, width} = Dimensions.get('window');

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class BadmintonCourse extends Component{

    navigate2MadeCustomCourse(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'MadeCustomCourse',
                component: MadeCustomCourse,
                params: {

                }
            })
        }
    }


    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }


    renderRow(rowData,sectionId,rowId){




        return(
            <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#ddd',marginTop:4}}>
                <View style={{flex:1,flexDirection:'column',alignItems:'flex-start'}}>
                    <View style={{padding:4,paddingHorizontal:12}}>

                        <Text style={{color:'#222',fontWeight:'bold',fontSize:15}}>
                            {rowData.className}
                        </Text>
                    </View>

                    <View style={{padding:3,paddingHorizontal:12}}>
                        <Text style={{color:'#444',fontSize:13}}>
                            {rowData.detail}
                        </Text>
                    </View>

                    <View style={{paddingTop:12,paddingBottom:4,paddingHorizontal:12,flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#f00',fontSize:12,width:50}}>
                            ￥{rowData.cost}
                        </Text>

                        <View style={{backgroundColor:'#66CDAA',borderRadius:6,padding:4,paddingHorizontal:6,marginLeft:10}}>
                            <Text style={{color:'#fff',fontSize:12}}>
                                {rowData.classCount}课次
                            </Text>
                        </View>

                        <View style={{backgroundColor:'#ff4730',borderRadius:6,padding:4,paddingHorizontal:6,marginLeft:10}}>
                            <Text style={{color:'#fff',fontSize:12}}>
                                {rowData.venue}
                            </Text>
                        </View>


                    </View>
                </View>

                <View style={{width:70,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Icon name={'angle-right'} size={34} color="#444" style={{backgroundColor:'transparent',marginTop:-10}}/>
                </View>
            </View>)

    }


    _onRefresh() {
        this.setState({ isRefreshing: true, fadeAnim: new Animated.Value(0) });
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
        }.bind(this), 2000);
    }

    _handlePress2(index) {

        if(index!==0){
            var eventType = this.state.eventTypeButtons[index];
            var eventTypeCode = index;
            this.setState({event:Object.assign(this.state.event,{type:eventType})});
        }

    }

    show(actionSheet) {
        this[actionSheet].show();
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

    /**
     * ascend,descend
     * @param props
     */


    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,
            event:{},
            menuVisible:false,
            memberLevelButtons:['取消','无','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'],
            eventTypeButtons:['取消','羽毛球单打','羽毛球双打','羽毛球混双','基础练习'],
            courses:[
                {
                    className:'羽毛球新手班',detail:'带初学者迅速学会羽毛球',cost:500,classCount:8,venue:'山东省体育中心-羽毛球俱乐部'
                },
                {
                    className:'羽毛球发球训练班',detail:'带初学者迅速学会羽毛球',cost:1000,classCount:4,venue:'山东大学东区新校-羽毛球馆'
                },

                {
                    className:'羽毛球高阶训练班',detail:'带初学者迅速学会羽毛球',cost:700,classCount:5,venue:'爱菲特羽毛球馆'
                },
                {
                    className:'羽毛球双打训练班',detail:'带初学者迅速学会羽毛球',cost:1200,classCount:8,venue:'章丘李宁羽毛球馆'
                },
                {
                    className:'羽毛球',detail:'带初学者迅速学会羽毛球',cost:300,classCount:2,venue:'鑫立华羽毛球俱乐部'
                },

            ],
            filter:{
                cost:'ascend'
            }
        };
    }

    render(){


        var displayArea = {x: 5, y: 20, width:width, height: height - 25};


        var courseList=null
        if(this.state.courses&&this.state.courses.length>0)
        {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            var sortedCourses = null;
            //升序
            if(this.state.filter.cost=='ascend')
            {
                sortedCourses= this.state.courses.sort((a, b) => {
                    if(a.cost>b.cost)
                        return 1;
                    else
                        return -1;
                });
            }else if(this.state.filter.cost=='descend'){
                sortedCourses= this.state.courses.sort((a, b) => {
                    if(a.cost>b.cost)
                        return -1;
                    else
                        return 1;
                });
            }


            courseList=(
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="拉取课程..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                >
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(sortedCourses)}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>
            );
        }


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
                        <Text style={{color:'#fff',fontSize:18}}>课程制定</Text>
                    </View>
                    <TouchableOpacity ref="menu"  style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                      onPress={()=>{
                          this.showPopover('menu')
                      }}
                    >
                        <Ionicons name={'md-more'} size={25} color="#fff"/>
                    </TouchableOpacity>
                </View>


                <View style={{flex:1,width:width,backgroundColor:'#66CDAA'}}>


                    {/*搜索框*/}
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',padding:8}}>
                        <View style={{flexDirection:'row',width:width*7/8,justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',borderRadius:8}}>

                            <TextInputWrapper
                                search={true}
                                textInputStyle={{marginLeft:15,fontSize:14,color:'#222',}}
                                iconStyle={{size:22}}
                                placeholder="按教练名进行搜索"
                                val={this.state.coachName}
                                onChangeText={(coachName)=>{
                                            this.setState({coachName:coachName})
                                        }}
                                onConfirm={()=>{
                                            alert('dw')
                                        }}
                            />

                        </View>

                    </View>

                    {/*筛选*/}
                    <View style={{height:45*height/736,flexDirection:'row',justifyContent:'center',alignItems: 'center',padding:8,
                            borderTopWidth:1,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'#fff'}}>
                        <View style={{flexDirection:'row',flex:1}}>
                            <View style={{flex:3,justifyContent:'center',alignItems: 'flex-start',paddingLeft:15}}>
                                <Text style={{fontSize:13,color:'#008B00'}}>默认</Text>
                            </View>
                            <TouchableOpacity  style={{flexDirection:'row',flex:2,justifyContent:'center',alignItems: 'center',}}
                              onPress={()=>{
                                    if(this.state.filter.cost=='ascend')//升序
                                    {
                                        this.setState({filter:Object.assign(this.state.filter,{cost:'descend'})})
                                    }else{
                                        //降序
                                        this.setState({filter:Object.assign(this.state.filter,{cost:'ascend'})})
                                    }
                                  }}
                            >
                                <Text style={{fontSize:13}}>花销</Text>
                                {
                                    this.state.filter.cost=='ascend'?
                                        <View style={{marginLeft:5}}>
                                            <Icon name={'caret-up'} size={15} color="#008B00"/>
                                            <Icon name={'caret-down'} size={15} color="#aaa"/>
                                        </View>:
                                        <View style={{marginLeft:5}}>
                                            <Icon name={'caret-up'} size={15} color="#aaa"/>
                                            <Icon name={'caret-down'} size={15} color="#008B00"/>
                                        </View>
                                }
                            </TouchableOpacity>
                            <View style={{flexDirection:'row',flex:2,justifyContent:'center',alignItems: 'center',}}>
                                <Text style={{fontSize:13}}>距离</Text>
                                <View style={{marginLeft:5}}>
                                    <Icon name={'caret-up'} size={15} color="#aaa"/>
                                    <Icon name={'caret-down'} size={15} color="#008B00"/>
                                </View>
                            </View>
                        </View>
                        <View style={{width:10}}></View>
                    </View>

                    {/*课程列表*/}

                    <Animated.View style={{ flex:1,padding:4,opacity: this.state.fadeAnim,backgroundColor:'#fff' }}>
                        {courseList}
                    </Animated.View>


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
                              this.navigate2MadeCustomCourse();
                          }}>
                        <Text style={[styles.popoverText,{color:'#444'}]}>课程定制</Text>
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



export default connect()(BadmintonCourse);

