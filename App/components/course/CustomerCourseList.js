/**
 * Created by dingyiming on 2017/7/4.
 */

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
import TextInputWrapper from 'react-native-text-input-wrapper'
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
var { height, width } = Dimensions.get('window');
import{
    fetchCustomCourse,
    onCustomCourseUpdate,
    fetchCourses,
    onCoursesUpdate,
} from '../../action/CourseActions';
import CreateBadmintonCourse from './CreateBadmintonCourse';

class CustomerCourseList extends Component {

    goBack() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    navigate2BadmintonCourseForCoach(memberId) {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'CreateBadmintonCourse',
                component: CreateBadmintonCourse,
                params: {
                    setMyCourseList:()=>{
                        this.props.dispatch(fetchCourses()).then((json)=>{
                            if(json.re==1)
                            {
                                this.props.dispatch(onCoursesUpdate(json.data))
                            }
                        })
                    },
                    memberId:memberId,
                }
            })
        }
    }

    setMyCourseList()
    {
        this.props.dispatch(fetchCourses()).then((json)=>{
            if(json.re==1)
            {
                this.props.dispatch(onCoursesUpdate(json.data))
            }
        })
    }

    renderRow(rowData, sectionId, rowId) {
        var row=(
            <View style={{flex:1,backgroundColor:'#fff',marginTop:5,marginBottom:5,}}>
                <View style={{flex:1,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                    </View>
                    <View style={{flex:2,justifyContent:'center',alignItems: 'flex-start',marginLeft:5}}>
                        <View>
                            <Text>{rowData.creator.username}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-end',alignItems: 'center'}}
                                      onPress={()=>{

                                      }}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'phone'} size={13} color="#aaa"/>
                        </View>
                        <View style={{flex:7}}>
                            <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.creator.mobilePhone}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:3,padding:10,flexDirection:'row',}}>

                    <View style={{flex:3}}>
                        <View style={{flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'star'} size={16} color="#66CDAA"/>
                            </View>
                            <View style={{flex:7}}>
                                <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.courseName}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'map-marker'} size={13} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.venue.name}</Text>
                        </View>

                        <View style={{flexDirection:'row',marginBottom:3}}>
                            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                                <Icon name={'calendar'} size={13} color="#aaa"/>
                            </View>
                            <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                                {rowData.courseTime}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{flex:1,justifyContent:'flex-end',alignItems: 'center'}}
                                      onPress={()=>{this.navigate2BadmintonCourseForCoach(rowData.courseManager)}}>
                        <View style={{borderWidth:1,borderColor:'#66CDAA',borderRadius:5,padding:3}}>
                            <Text style={{color:'#66CDAA',}}>为Ta建课</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
        return row;

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

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            menuVisible: false,
            filter: {
                cost: 'ascend'
            }
        };
    }

    render() {

        var customCourseList = null
        if (this.props.customCourse && this.props.customCourse.length > 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

            customCourseList = (
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
                        dataSource={ds.cloneWithRows(this.props.customCourse)}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>
            );
        }

        return (
            <View style={styles.container}>
                {/*tabbar部分*/}

                <Toolbar width={width} title="定制列表" navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                         }}>
                    <View style={{ flex: 1, width: width, backgroundColor: '#66CDAA' }}>


                        {/*搜索框*/}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
                            <View style={{ flexDirection: 'row', width: width * 7 / 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', borderRadius: 8 }}>

                                <TextInputWrapper
                                    search={true}
                                    textInputStyle={{ marginLeft: 15, fontSize: 14, color: '#222', }}
                                    iconStyle={{ size: 22 }}
                                    placeholder="按教练名进行搜索"
                                    val={this.state.coachName}
                                    onChangeText={(coachName) => {
                                    this.setState({ coachName: coachName })
                                }}
                                    onConfirm={() => {
                                    alert('dw')
                                }}
                                />

                            </View>

                        </View>

                        {/*课程列表*/}
                        <Animated.View style={{ flex: 1, padding: 4, opacity: this.state.fadeAnim, backgroundColor: '#eee' }}>
                            {customCourseList}
                        </Animated.View>

                    </View>
                </Toolbar>

            </View>
        )
    }

    componentDidMount()
    {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(fetchCustomCourse()).then((json)=>{
                if(json.re==1)
                {
                    this.props.dispatch(onCustomCourseUpdate(json.data))
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
        courses:state.course.courses,
        customCourse:state.course.customCourse,
    }
    return props
}


export default connect(mapStateToProps)(CustomerCourseList);

