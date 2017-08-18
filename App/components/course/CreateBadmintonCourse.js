import React,{Component} from 'react';
import {
    Dimensions,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    Modal,
    DeviceEventEmitter,
    Alert
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputWrapper from 'react-native-text-input-wrapper';
import CourseTimeModal from './CourseTimeModal';
import VenueInspect from '../../components/venue/VenueInspect';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper';
import PopupDialog,{ScaleAnimation,DefaultAnimation,SlideAnimation} from 'react-native-popup-dialog';
import ActionSheet from 'react-native-actionsheet';
import SelectVenue from '../../components/venue/SelectVenue';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });

import{
    distributeCourse
} from '../../action/CourseActions';

import {getAccessToken,} from '../../action/UserActions';

class CreateBadmintonCourse extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    //选类型
    _handlePress(index) {

        if(index!==0){
            var costTypeStr = this.state.costTypeButtons[index];
            var costType = index;
            this.setState({course:Object.assign(this.state.course,{costType:costType.toString(),costTypeStr:costTypeStr})});
        }

    }

    show(actionSheet) {
        this[actionSheet].show();
    }


    setCoursePlace(coursePlace)
    {
        var place = coursePlace;
        place.unitId = parseInt(coursePlace.unitId);

        this.setState({venue:place});

    }

    navigate2VenueInspect()
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'VenueInspect',
                component: VenueInspect,
                params: {
                    setPlace:this.setCoursePlace.bind(this)
                }
            })
        }
    }

    searchMember(info){
        this.props.dispatch(searchMember(info)).then((json)=>{
            if(json.re==1){
                this.setState({member:json.data});
            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }else{
                    alert('该用户未注册，是否邀请');
                    //TODO:微信分享邀请好友
                }
            }
        });
    }

    removeMember(timeList,rowData) {

        var index=-1;
        timeList.map((time, i) => {
            if(time.id==rowData.id){
                index = i;
            }
        });
        if(index!==-1){
            timeList.splice(index, 1);
            this.setState({timeList:timeList});
        }
    }

    renderRow(rowData,sectionId,rowId){

        var dayMap=['周一','周二','周三','周四','周五','周六','周日']
        var dayStr=dayMap[rowData.day-1]

        var row=(
            <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',marginBottom:5,padding:5,borderBottomWidth:1,
            borderColor:'#eee',borderRadius:8,margin:5}}>

                <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                    <View style={{flex:1}}>
                        <Text style={{color:'#888'}}>{rowData.id}.</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{color:'#888'}}>{dayStr}</Text>
                    </View>
                    <View style={{flex:2,}}>
                        <Text style={{color:'#aaa'}}>{rowData.startTime}   -</Text>
                    </View>
                    <View style={{flex:2,marginLeft:5}}>
                        <Text style={{color:'#aaa'}}>{rowData.endTime}</Text>
                    </View>
                </View>

                <TouchableOpacity style={{flex:1}}
                                  onPress={()=>{
                                        this.removeMember(this.state.timeList,rowData);
                }}>
                    <Icon name={'minus-circle'} size={20} color="#FF4040"/>
                </TouchableOpacity>
            </View>
        );
        return row;
    }

    constructor(props) {
        super(props);
        this.state={
            dialogShow: false,
            modalVisible:false,
            course:{courseName:null,maxNumber:null,classCount:null,cost:null,costType:null,detail:null,coursePlace:null,unitId:null,scheduleDes:''},
            doingFetch: false,
            isRefreshing: false,
            time:null,
            timeList:[],
            costTypeButtons:['取消','按人支付','按小时支付','按班支付'],
        }
        this.showScaleAnimationDialog = this.showScaleAnimationDialog.bind(this);
    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }


    render() {

        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;

        const costTypeButtons=['取消','按人支付','按小时支付','按班支付'];

        var timeList = this.state.timeList;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if(timeList!==undefined&&timeList!==null&&timeList.length>0)
        {
            timeList=(
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(timeList)}
                    renderRow={this.renderRow.bind(this)}
                />
            );
        }


        return (
            <View style={{flex:1}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>创建课程</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </View>
                </View>

                <View style={{flex:5,backgroundColor:'#fff'}}>

                    {/*课程名称*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:10,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>课程名称：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入课程名"
                                val={this.state.course.className}
                                onChangeText={
                                    (value)=>{
                                        this.setState({course:Object.assign(this.state.course,{courseName:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({course:Object.assign(this.state.course,{courseName:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*课程人数*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>课程人数：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入课程人数"
                                val={this.state.course.maxNumber}
                                onChangeText={
                                    (value)=>{
                                        this.setState({course:Object.assign(this.state.course,{maxNumber:parseInt(value)})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({course:Object.assign(this.state.course,{maxNumber:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*支付方式*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text>收费类型：</Text>
                        </View>
                        <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                          onPress={()=>{ this.show('actionSheet'); }}>
                            {
                                this.state.course.costTypeStr==null?
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>请选择支付方式：</Text>
                                    </View> :
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.course.costTypeStr}</Text>
                                    </View>

                            }
                            <View style={{width:60,flexDirection:'row',justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                <Icon name={'angle-right'} size={30} color="#fff"/>
                            </View>
                            <ActionSheet
                                ref={(p) => {
                                        this.actionSheet =p;
                                    }}
                                title="请选择支付方式"
                                options={costTypeButtons}
                                cancelButtonIndex={CANCEL_INDEX}
                                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                onPress={
                                        (data)=>{ this._handlePress(data); }
                                    }
                            />
                        </TouchableOpacity>
                    </View>

                    {/*课程花费*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>课程花费：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入课程花费"
                                val={this.state.course.cost}
                                onChangeText={
                                    (value)=>{
                                        this.setState({course:Object.assign(this.state.course,{cost:parseInt(value)})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({course:Object.assign(this.state.course,{cost:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*课次*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>课次：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入课次"
                                val={this.state.course.classCount}
                                onChangeText={
                                    (value)=>{
                                        this.setState({course:Object.assign(this.state.course,{classCount:parseInt(value)})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({course:Object.assign(this.state.course,{classCount:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*课程说明*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>课程说明：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入课程说明"
                                val={this.state.course.detail}
                                onChangeText={
                                    (value)=>{
                                        this.setState({course:Object.assign(this.state.course,{detail:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({course:Object.assign(this.state.course,{detail:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*课程场馆*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>课程场馆：</Text>
                        </View>

                        {
                            this.state.venue==null?
                                <TouchableOpacity style={{flex:3,height:28,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                                  onPress={()=>{
                                this.navigate2VenueInspect();
                            }}>
                                    <Text style={{marginLeft:20,fontSize:13,color:'#888'}}>
                                        请选择课程场馆
                                    </Text>
                                </TouchableOpacity>:
                                <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                                  onPress={()=>{
                                this.navigate2VenueInspect();
                            }}>
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#222',fontSize:13}}>{this.state.venue.name}</Text>
                                    </View>

                                    <TouchableOpacity style={{width:60,justifyContent:'center',alignItems: 'center',flexDirection:'row',marginLeft:20,padding:5}}
                                                      onPress={()=>{
                                                              var venue = null;
                                                              this.setState({venue:venue});
                                                          }}>
                                        <Ionicons name={'md-close-circle'} size={20} color={'red'}/>
                                    </TouchableOpacity>

                                </TouchableOpacity>

                        }

                    </View>

                    {/*上课时间描述*/}
                    <View style={{flex:3,margin:10,marginTop:5,marginBottom:5}}>
                        <Text>上课时间:</Text>
                        <TextInput
                            style={{height:height*120/736,padding:8,fontSize:13,marginTop:5,borderRadius:5,backgroundColor:'#eee'}}
                            onChangeText={(text) =>
                                        {
                                          this.setState({course:Object.assign(this.state.course,{scheduleDes:text})});
                                        }}
                            value={this.state.course.scheduleDes}
                            placeholder='请描述上课时间...'
                            placeholderTextColor="#aaa"
                            underlineColorAndroid="transparent"
                            multiline={true}
                        />
                    </View>

                    <View style={{backgroundColor:'#fff',padding:10}}>
                        <Text style={{color:'#aaa',fontSize:11}}>
                            温馨提示：您发布的内容应合法、真实、健康、共创文明的网络环境
                        </Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',height:60,justifyContent:'center',alignItems:'center',width:width}}>
                    <TouchableOpacity style={{width:width*2/3,backgroundColor:'#66CDAA',borderRadius:10,padding:10,flexDirection:'row',
                        justifyContent:'center'}}
                                      onPress={()=>{
                                          if(this.props.memberId!==null&&this.props.memberId!==undefined){
                                                this.props.dispatch(distributeCourse(this.state.course,this.state.venue,parseInt(this.props.memberId),parseInt(this.props.demandId)))
                                                .then((json)=>{
                                                     if(json.re==1){
                                                         Alert.alert('信息','课程已发布成功',[{text:'确认',onPress:()=>{
                                                            this.goBack();
                                                            this.props.setMyCourseList();
                                                            }}]);
                                                     }else{
                                                         if(json.re==-100){
                                                              this.props.dispatch(getAccessToken(false));
                                                         }
                                                     }
                                                })
                                          }else{
                                              this.props.dispatch(distributeCourse(this.state.course,this.state.venue,null))
                                                .then((json)=>{
                                                     if(json.re==1){
                                                         Alert.alert('信息','课程已发布成功',[{text:'确认',onPress:()=>{
                                                            this.goBack();
                                                            this.props.setMyCourseList();
                                                            }}]);
                                                     }else{
                                                         if(json.re==-100){
                                                              this.props.dispatch(getAccessToken(false));
                                                         }
                                                     }
                                                })
                                          }

                      }}>
                        <Text style={{color:'#fff',fontSize:15}}>发布</Text>
                    </TouchableOpacity>
                </View>


                {/* Add CourseTime Modal*/}
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log("Modal has been closed.");
                    }}
                >
                    <CourseTimeModal
                        onClose={()=>{
                            this.setState({modalVisible:false});
                        }}
                        accessToken={this.props.accessToken}
                        setTime={(time)=>{
                            if(this.state.timeList!==null&&this.state.timeList!==undefined){
                                var timeList = this.state.timeList;
                                timeList.push(time);
                                this.setState({timeList:timeList});
                            }
                        }}
                        timeListLength={(this.state.timeList!==null&&this.state.timeList!==undefined)?this.state.timeList.length:0}

                    />
                </Modal>

                <PopupDialog
                    ref={(popupDialog) => {
                        this.scaleAnimationDialog = popupDialog;
                    }}
                    dialogAnimation={scaleAnimation}
                    actions={[

                    ]}
                >
                    <View style={styles.dialogContentView}>
                        <CourseTimeModal
                            onClose={()=>{
                                this.scaleAnimationDialog.dismiss();
                           // this.setState({modalVisible:false});
                        }}
                            accessToken={this.props.accessToken}
                            setTime={(time)=>{
                            if(this.state.timeList!==null&&this.state.timeList!==undefined){
                                var timeList = this.state.timeList;
                                timeList.push(time);
                                this.setState({timeList:timeList});
                                this.scaleAnimationDialog.dismiss();
                            }
                        }}
                            timeListLength={(this.state.timeList!==null&&this.state.timeList!==undefined)?this.state.timeList.length:0}

                        />
                    </View>
                </PopupDialog>

            </View>
        );
    }
    componentDidMount()
    {
        this.venueListener=DeviceEventEmitter.addListener('on_venue_confirm', (data)=>{
            if(data)
                this.setState({venue:data})
        });
    }

    componentWillUnmount()
    {
        if(this.venueListener)
            this.venueListener.remove();
    }

}

var styles = StyleSheet.create({
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});


module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        myGroupList:state.activity.myGroupList,
        groupOnFresh:state.activity.groupOnFresh
    })
)(CreateBadmintonCourse);


