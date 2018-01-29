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
import DateFilter from '../../utils/DateFilter';
const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });
import{
    editClass
} from '../../action/CourseActions';
import DatePicker from 'react-native-datepicker';
import {getAccessToken,} from '../../action/UserActions';

class EditClass extends Component{

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

    setScheduleTime(time){
        var class1 = this.state.class;
        class1.startTime= time;
        this.setState({class:class1});
    }

/*    setScheduleTime2(time){
        var class1 = this.state.class;
        class1.endTimes= time;
        this.setState({class:class1});

    }*/

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

   /* navigate2ClassSchedule()
    {
        const { navigator} =this.props;
        if(navigator){
            navigator.push({
                name:'course_schedule',
                component:SelectTime,
                params: {
                    setScheduleTime: this.setScheduleTime.bind(this),
                   // setScheduleTime2: this.setScheduleTime2.bind(this)
                }
            })
        }
    }*/

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
    verifyTime(date){

        var endhour = date.substring(0,2);
        var inthour=parseInt(endhour);
        var hourminutes=inthour*60;
        var min=date.substring(3,5);
        var intmin=parseInt(min);
        var endmintotal=hourminutes+intmin;

        var startTime= this.state.startTimeView;
        var starthour=startTime.substring(0,2);
        var inthour1=parseInt(starthour);
        var hourminutes1=inthour1*60;
        var min1=startTime.substring(3,5);
        var intmin1=parseInt(min1);
        var startinttotal=hourminutes1+intmin1;

        if((endmintotal-startinttotal)<60){
            alert("结束时间必须在开始时间之后一小时");
        }else{
            if(this.state.selectEndTime==false)
            {
                this.state.selectEndTime=true;
                var endTime = date+':00';
                var day = new Date();
                var today = DateFilter.filter(day, 'yyyy-mm-dd');
                var endTimeStr = today+' '+endTime;
                this.setState({endTime:endTimeStr,selectEndTime:false,endTimeView:date})
            }
        }
    }

    _handlePress(index) {
        if(index!==0){

            var today = new Date();
            var dayNum = today.getDay();//周日-周六返回0-6
            if(dayNum==0)
                dayNum=7;

            var classWeekNum =null;

            switch(index){
                case 1:classWeekNum = dayNum%7; break;
                case 2:classWeekNum = (dayNum+1)%7; break;
                case 3:classWeekNum = (dayNum+2)%7; break;
                case 4:classWeekNum = (dayNum+3)%7; break;
                case 5:classWeekNum = (dayNum+4)%7; break;
                case 6:classWeekNum = (dayNum+5)%7; break;
                case 7:classWeekNum = (dayNum+6)%7; break;

            }
            if(classWeekNum==0)
                classWeekNum=7;
            var classWeek = this.state.classWeekButtons[index];
            this.setState({classWeek:classWeek,classWeekNum:classWeekNum});
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
            selectStartTime:false,
            selectEndTime:false,
            dialogShow: false,
            modalVisible:false,
            //class:{content:null,unitId:null,yard:null,startTime:null,endTime:null,joinCount:null,remark:null},
            yard:null,
            doingFetch: false,
            isRefreshing: false,
            time:null,
            timeList:[],
            classWeek:null,
            startTime:null,
            endTime:null,
            startTimeView:null,
            endTimeView:null,
            classWeekButtons:['取消',],
            content:null
        }
        //this.showScaleAnimationDialog = this.showScaleAnimationDialog.bind(this);
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

      /*  var time=(new Date(rowData.startTime)).toLocaleTimeString();
        var date=new Date(rowData.startTime);
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var startTime=year+'年'+month+'月'+day+'日'+' '+time;
        //var time=time.toLocaleDateString()+" "+time.toLocaleTimeString();
        var time1=(new Date(rowData.endTime)).toLocaleTimeString();
        var date1=new Date(rowData.endTime);
        var year1=date1.getFullYear();
        var month1=date1.getMonth()+1;
        var day1=date1.getDate();
        var endTime=year1+'年'+month1+'月'+day1+'日'+' '+time1;*/

            <View style={{flex:1}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                    backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>编辑课程</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </View>
                </View>

                <View style={{flex:5,backgroundColor:'#fff'}}>







                    {/*场地*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>场地：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder={this.props.class.yards}
                                val={this.state.yard}
                                onChangeText={
                                    (value)=>{
                                        this.setState({yard:value})
                                    }}
                                onCancel={
                                    ()=>{this.setState({yard:null })
                                }}
                            />
                        </View>
                    </View>

                    {/*上课日期*/}
                 {   <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>上课日期：</Text>
                        </View>
                        <TouchableOpacity style={{flex:3,height:30,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}
                                          onPress ={()=>{this.show('actionSheet')}}>

                            {
                                this.state.classWeek==null?
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>{this.props.classWeek}</Text>
                                    </View> :
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.classWeek}</Text>
                                    </View>
                            }


                            <ActionSheet
                                ref={(p)=>{this.actionSheet=p;}}
                                title={this.props.classWeek}
                                options={this.state.classWeekButtons}
                                cancelButtonIndex={CANCEL_INDEX}
                                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                onPress={
                                    (data)=>{ this._handlePress(data); }
                                }
                            >

                            </ActionSheet>
                        </TouchableOpacity>
                    </View>}

                    {/*开始时间*/}
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1,}}>
                            <Text style={{color:'#343434'}}>开始时间:</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10,margin:5}}>
                            {
                                //var time=(new Date)
                                this.state.startTime==null?
                                    <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>{this.props.startTime}</Text>
                                    </View> :
                                    <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.startTimeView}</Text>
                                    </View>
                            }
                            <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                <DatePicker
                                    style={{width:50,marginLeft:0,borderWidth:0}}
                                    customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:25,height:22,borderWidth:0},
                                    }}
                                    mode="time"
                                    placeholder="选择"
                                    format="HH:mm"
                                    confirmBtnText="确认"
                                    cancelBtnText="取消"
                                    showIcon={true}
                                    iconComponent={<Icon name={'calendar'} size={20} color="#888"/>}
                                    onDateChange={(date) => {
                                        if(this.state.selectStartTime==false)
                                        {

                                            this.state.selectStartTime=true;
                                            var startTime = date+':00';
                                            var day = new Date();
                                            var today = DateFilter.filter(day, 'yyyy-mm-dd');
                                            var startTimeStr = today+' '+startTime;
                                            this.setState({startTime:startTimeStr,selectStartTime:false,startTimeView:date})
                                        }else{
                                        }

                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    {/*结束时间*/}

                  {this.state.isSchedule == 1 ?
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1,}}>
                            <Text style={{color:'#343434'}}>结束时间:</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10,margin:5}}>
                            {
                                this.state.endTime==null?
                                    <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>{this.props.endTime.substring(0,5)}</Text>
                                    </View> :
                                    <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.endTimeView}</Text>
                                    </View>
                            }
                            <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                <DatePicker
                                    style={{width:50,marginLeft:0,borderWidth:0}}
                                    customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:25,height:22,borderWidth:0},
                                    }}
                                    mode="time"
                                    placeholder="选择"
                                    format="HH:mm"
                                    confirmBtnText="确认"
                                    cancelBtnText="取消"
                                    showIcon={true}
                                    iconComponent={<Icon name={'calendar'} size={20} color="#888"/>}
                                    onDateChange={(date) => {
                                        this.verifyTime(date);
                                        if(this.state.selectEndTime==false)
                                        {
                                        this.state.selectEndTime=true;
                                        var endTime = date+':00';
                                        var day = new Date();
                                        var today = DateFilter.filter(day, 'yyyy-mm-dd');
                                        var endTimeStr = today+' '+endTime;

                                        this.setState({endTime:endTimeStr,selectEndTime:false,endTimeView:date})
                                        }else{
                                        }

                                    }}
                                />
                            </View>
                        </View>
                    </View>:
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1,}}>
                            <Text style={{color:'#343434'}}>结束时间:</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10,margin:5}}>
                            {
                                this.state.endTime==null?
                                    <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>{this.props.endTime}</Text>
                                    </View> :
                                    <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.endTimeView}</Text>
                                    </View>
                            }
                            <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                <DatePicker
                                    style={{width:50,marginLeft:0,borderWidth:0}}
                                    customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:25,height:22,borderWidth:0},
                                    }}
                                    mode="time"
                                    placeholder="选择"
                                    format="HH:mm"
                                    confirmBtnText="确认"
                                    cancelBtnText="取消"
                                    showIcon={true}
                                    iconComponent={<Icon name={'calendar'} size={20} color="#888"/>}
                                    onDateChange={(date) => {

                                        this.verifyTime(date);
                                        if(this.state.selectEndTime==false)
                                        {
                                        this.state.selectEndTime=true;
                                        var endTime = date+':00';
                                        var day = new Date();
                                        var today = DateFilter.filter(day, 'yyyy-mm-dd');
                                        var endTimeStr = today+' '+endTime;


                                        this.setState({endTime:endTimeStr,selectEndTime:false,endTimeView:date})
                                        }else{
                                        }

                                    }}
                                />
                            </View>
                        </View>
                    </View>}

                    {/*授课内容*/}
                    <View style={{flex:3,margin:10,marginTop:5,marginBottom:5}}>
                        <Text>授课内容:</Text>
                        <TextInput
                            style={{height:height*120/736,padding:8,fontSize:13,marginTop:5,borderRadius:5,backgroundColor:'#eee'}}
                            onChangeText={(text) =>
                            {
                                this.setState({content:text});
                            }}
                            value={this.state.content}
                            placeholder={this.props.content}
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

                                              this.props.dispatch(editClass(this.props.class.classId,this.props.course.courseId,this.state.yard,this.props.course.unitId,this.state.classWeek,this.state.startTime,this.state.endTime,this.state.content))
                                                  .then((json)=>{
                                                      if(json.re==1){
                                                          Alert.alert('信息','编辑成功',[{text:'确认',onPress:()=>{
                                                              this.goBack();
                                                              this.props.setClassRecord(this.props.courseId);
                                                          }}]);
                                                      }else{
                                                          if(json.re==-100){
                                                              this.props.dispatch(getAccessToken(false));
                                                          }
                                                      }
                                                  })
                                        /*  else{
                                              this.props.dispatch(addClass(this.state.course,this.state.venue,null))
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
                                          }*/

                                      }}>
                        <Text style={{color:'#fff',fontSize:15}}>确定编辑</Text>
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
        var classWeekButtons = this.state.classWeekButtons;

        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();//月份，一月--十二月返回0-11
        var date = today.getDate();//月份中的一天1-31
        var dayNum = today.getDay();//周日-周六返回0-6
        var day = null;

        for (let i=0; i<8; i++)
        {
            switch(dayNum%7){
                case 0:day= '星期天';break;
                case 1:day= '星期一';break;
                case 2:day= '星期二';break;
                case 3:day= '星期三';break;
                case 4:day= '星期四';break;
                case 5:day= '星期五';break;
                case 6:day= '星期六';break;

            }
            let string = day+'  '+(month+1)+'月'+date+'日';
            classWeekButtons.push(string);
            dayNum = dayNum+1;
            date = date+1;

            var d = new Date(year, month, 0);
            var dayCounts = d.getDate();

            if(date>dayCounts){
                month = month+1;
                date = date%dayCounts
            }
        }
        this.setState({classWeekButtons:classWeekButtons})
    }

    componentWillUnmount()
    {




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
)(EditClass);


