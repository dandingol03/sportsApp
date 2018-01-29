
import React, {Component} from 'react';
import {
    Alert,
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
import {Toolbar,OPTION_SHOW,OPTION_NEVER,ACTION_ADD} from 'react-native-toolbar-wrapper'

var {height, width} = Dimensions.get('window');
import DateFilter from '../../utils/DateFilter';
import{
    fetchCustomCourse,
    enableMyCustomCoursesOnFresh,
    disableMyCustomCoursesOnFresh,
    finishCustomCourse,
    cancleCustomCourse

} from '../../action/CourseActions';

import {getAccessToken,} from '../../action/UserActions';

class CustomCourse extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    _onRefresh() {
        this.setState({isRefreshing: true, fadeAnim: new Animated.Value(0)});
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
        }.bind(this), 500);
        this.props.dispatch(enableMyCustomCoursesOnFresh());

    }

    renderRow(rowData, sectionId, rowId) {
        var row=(
            <View style={{padding:4,margin:5,backgroundColor:'#fff',flexDirection:'column',paddingBottom:7,borderWidth:1,borderColor:'#eee'}}>

                <View style={{flex:1,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                    </View>
                    <View style={{flex:2,justifyContent:'center',alignItems: 'flex-start',marginLeft:5}}>
                        <View>
                            <Text>{rowData.demandManagerName}</Text>
                        </View>
                    </View>

                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-end',alignItems: 'center'}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'phone'} size={13} color="#aaa"/>
                        </View>
                        <View style={{flex:7}}>
                            <Text style={{color:'#343434',justifyContent:'flex-start',alignItems: 'center'}}>{rowData.demandManagerPhone}</Text>
                        </View>
                    </View>
                </View>

                <View style={{padding:2,paddingHorizontal:10,alignItems:'flex-start'}}>

                    <View style={{margin:15}}>
                        <Text style={{fontSize:14,color:'#222',}}>
                            {rowData.demandBrief}
                        </Text>
                    </View>

                </View>

                <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,marginTop:10}}>
                    <View style={{flex:1}}></View>

                    {
                        rowData.courseId==null?
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                                <TouchableOpacity style={{padding:5,borderWidth:1,borderColor:'red',borderRadius:5,justifyContent:'center',alignItems: 'center',marginRight:20}}
                                                  onPress={()=>{
                                                       this.props.dispatch(cancleCustomCourse(rowData.demandId)).then((json)=> {
                                                           if(json.re==1){
                                                             Alert.alert('信息','取消成功',[{text:'确认',onPress:()=>{
                                                             this.props.dispatch(enableMyCustomCoursesOnFresh());
                                                                }}]);
                                                           }else{
                                                                if(json.re==-100){
                                                                    this.props.dispatch(getAccessToken(false));
                                                                }
                                                            }
                                                               })

                                }}>
                                    <Text style={{color:'red',}}>取消</Text>
                                </TouchableOpacity>
                            </View>:
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                                <View style={{padding:5,borderWidth:1,borderColor:'#66CDAA',borderRadius:5,justifyContent:'center',alignItems: 'center',marginRight:20}}>
                                    <Text style={{color:'red',}}>已报名课程：{rowData.courseName}</Text>
                                </View>
                            </View>


                    }


                </View>

            </View>
        );
        return row;

    }


    fetchData(){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        this.props.dispatch(fetchCustomCourse()).then((json)=> {
            if(json.re==-100){
                this.props.dispatch(getAccessToken(false));
            }else{
                this.props.dispatch(disableMyCustomCoursesOnFresh());
                this.setState({doingFetch:false,isRefreshing:false})
            }
        }).catch((e)=>{
            this.props.dispatch(disableMyCustomCoursesOnFresh());
            this.setState({doingFetch:false,isRefreshing:false});
            alert(e)
        });
    }

    constructor(props) {
        super(props);
        this.state={
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
        };
    }

    render()
    {
        var myCustomCoursesList=null;
        var {myCustomCourses,myCustomCourseOnFresh,}=this.props;

        if(myCustomCourseOnFresh==true)
        {
            if(this.state.doingFetch==false)
                this.fetchData();
        }else {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (myCustomCourses !== undefined && myCustomCourses !== null && myCustomCourses.length > 0) {

                myCustomCoursesList = (
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(myCustomCourses)}
                        renderRow={this.renderRow.bind(this)}
                    />
                );
            }
        }


        return (
            <View style={styles.container}>
                {/*tabbar部分*/}

                <Toolbar width={width} title="我的定制" navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                         }}
                >

                    {/*内容区*/}
                    <View style={{flex:5,backgroundColor:'#eee'}}>
                        <Animated.View style={{opacity: this.state.fadeAnim,height:height-150,paddingTop:5,paddingBottom:5,}}>
                            <ScrollView
                                refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                    tintColor="#9c0c13"
                                    title="刷新..."
                                    titleColor="#9c0c13"
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                    progressBackgroundColor="#ffff00"
                                />
                            }
                            >
                                {myCustomCoursesList}

                                {
                                    myCustomCoursesList==null?
                                        null:
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                                        </View>
                                }

                            </ScrollView>

                        </Animated.View>
                    </View>

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



module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        myCustomCourses:state.course.myCustomCourses,
        myCustomCourseOnFresh:state.course.myCustomCourseOnFresh,

    })
)(CustomCourse);

