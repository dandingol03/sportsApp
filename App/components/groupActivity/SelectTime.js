import React,{Component} from 'react';
import {
    Alert,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-datepicker';
import DateFilter from '../../utils/DateFilter';
var {height, width} = Dimensions.get('window');

class SeletTime extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    sendTimetoAddActivity(){

        var time = {
            isSchedule:this.state.isSchedule,
            eventWeek:this.state.eventWeekNum,
            startTime:this.state.startTime,
            endTime:this.state.endTime,

            startTimeView:this.state.startTimeView,
            endTimeView:this.state.endTimeView,
        }

        this.props.setScheduleTime(time);
        this.goBack();

    }

    show(actionSheet) {
        this[actionSheet].show();
    }

    _handlePress(index) {
        if(index!==0){

            var today = new Date();
            var dayNum = today.getDay();//周日-周六返回0-6
            if(dayNum==0)
                dayNum=7;

            var eventWeekNum =null;

            switch(index){
                case 1:eventWeekNum = dayNum%7; break;
                case 2:eventWeekNum = (dayNum+1)%7; break;
                case 3:eventWeekNum = (dayNum+2)%7; break;
                case 4:eventWeekNum = (dayNum+3)%7; break;
                case 5:eventWeekNum = (dayNum+4)%7; break;
                case 6:eventWeekNum = (dayNum+5)%7; break;
                case 7:eventWeekNum = (dayNum+6)%7; break;

            }
            if(eventWeekNum==0)
                eventWeekNum=7;
            var eventWeek = this.state.eventWeekButtons[index];
            this.setState({eventWeek:eventWeek,eventWeekNum:eventWeekNum});
        }

    }

    constructor(props) {
        super(props);
        this.state={
            selectStartTime:false,
            selectEndTime:false,

            isSchedule:1,
            eventWeek:null,
            startTime:null,
            endTime:null,

            startTimeView:null,
            endTimeView:null,

            eventWeekButtons:['取消',]
        }
    }

    render() {
        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;

        return (
            <View style={{flex:1}}>
                {/*标题栏*/}
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA' }}>
                    <TouchableOpacity style={{ flex:1,justifyContent:'center',alignItems:'center'
                    }} onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size= {30} color ='#fff'/>

                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>选择活动时间</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </View>
                </View>

                <View style={{flex:6,padding:10}}>

                    <View style={{flex:4}}>

                        {/*是否周期活动*/}
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', flex: 3}}>
                                <Text>是否周期活动：</Text>
                            </View>

                            <View style={{flexDirection: 'row', flex: 3, justifyContent: 'center'}}>

                                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
                                                  onPress={() => {
                                                              if (this.state.isSchedule!= 1) {
                                                                  this.setState({isSchedule:1})
                                                              }
                                                          }}
                                >
                                    {
                                        this.state.isSchedule == 1 ?
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                                <Ionicons name='md-radio-button-on' size={16} color="green"
                                                          style={{marginLeft: 4, paddingTop: 2}}/>
                                                <Text style={{fontSize: 13, color: 'green'}}>是</Text>

                                            </View> :
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                                <Ionicons name='md-radio-button-off' size={16} color="gray"
                                                          style={{marginLeft: 4, paddingTop: 2}}/>
                                                <Text style={{fontSize: 13, color: 'gray'}}>是</Text>
                                            </View>

                                    }
                                </TouchableOpacity>

                                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
                                                  onPress={() => {
                                                              if (this.state.isSchedule == 1) {
                                                                  this.setState({isSchedule:0})
                                                              }
                                                          }}
                                >
                                    {
                                        this.state.isSchedule == 0 ?
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                                <Ionicons name='md-radio-button-on' size={16} color="green"
                                                          style={{marginLeft: 4, paddingTop: 2}}/>
                                                <Text style={{fontSize: 13, color: 'green'}}>否</Text>

                                            </View> :
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                                <Ionicons name='md-radio-button-off' size={16} color="gray"
                                                          style={{marginLeft: 4, paddingTop: 2}}/>
                                                <Text style={{fontSize: 13, color: 'gray'}}>否</Text>
                                            </View>

                                    }
                                </TouchableOpacity>

                            </View>
                        </View>

                        {/*活动日期*/}
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>活动日期：</Text>
                            </View>
                            <TouchableOpacity style={{flex:3,height:30,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}
                                              onPress ={()=>{this.show('actionSheet')}}>
                                {
                                    this.state.eventWeek==null?
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#888',fontSize:13}}>请选择活动日期：</Text>
                                        </View> :
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#444',fontSize:13}}>{this.state.eventWeek}</Text>
                                        </View>
                                }

                                <ActionSheet
                                    ref={(p)=>{this.actionSheet=p;}}
                                    title="请选择活动日期"
                                    options={this.state.eventWeekButtons}
                                    cancelButtonIndex={CANCEL_INDEX}
                                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                    onPress={
                                       (data)=>{ this._handlePress(data); }
                                    }
                                >

                                </ActionSheet>
                            </TouchableOpacity>
                        </View>

                        {/*开始时间*/}
                        {
                            this.state.isSchedule == 1 ?
                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                    <View style={{flex:1,}}>
                                        <Text style={{color:'#343434'}}>开始时间:</Text>
                                    </View>
                                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                                backgroundColor:'#eee',borderRadius:10,margin:5}}>
                                        {
                                            this.state.startTime==null?
                                                <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                    <Text style={{color:'#888',fontSize:13}}>请选择：</Text>
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
                                </View>:
                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                    <View style={{flex:1,}}>
                                        <Text style={{color:'#343434'}}>开始时间:</Text>
                                    </View>
                                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                                backgroundColor:'#eee',borderRadius:10,margin:5}}>
                                        {
                                            this.state.startTime==null?
                                                <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                    <Text style={{color:'#888',fontSize:13}}>请选择：</Text>
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
                                                mode="datetime"
                                                placeholder="选择"
                                                format="YYYY-MM-DD HH:mm:ss"
                                                confirmBtnText="确认"
                                                cancelBtnText="取消"
                                                showIcon={true}
                                                iconComponent={<Icon name={'calendar'} size={20} color="#888"/>}
                                                onDateChange={(date) => {
                                        if(this.state.selectStartTime==false)
                                        {
                                            this.state.selectStartTime=true;
                                            var startTimeParam = date.split(' ');
                                            var startTimeStr =startTimeParam[1];
                                            this.setState({startTime:date,selectStartTime:false,startTimeView:startTimeStr})
                                        }else{
                                        }

                                    }}
                                            />
                                        </View>
                                    </View>
                                </View>
                        }

                        {/*结束时间*/}

                        {
                            this.state.isSchedule == 1 ?
                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                    <View style={{flex:1,}}>
                                        <Text style={{color:'#343434'}}>结束时间:</Text>
                                    </View>
                                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                                backgroundColor:'#eee',borderRadius:10,margin:5}}>
                                        {
                                            this.state.endTime==null?
                                                <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                    <Text style={{color:'#888',fontSize:13}}>请选择：</Text>
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
                                                    <Text style={{color:'#888',fontSize:13}}>请选择：</Text>
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
                                                mode="datetime"
                                                placeholder="选择"
                                                format="YYYY-MM-DD HH:mm:ss"
                                                confirmBtnText="确认"
                                                cancelBtnText="取消"
                                                showIcon={true}
                                                iconComponent={<Icon name={'calendar'} size={20} color="#888"/>}
                                                onDateChange={(date) => {
                                        if(this.state.selectEndTime==false)
                                        {
                                            this.state.selectEndTime=true;
                                            var endTimeParam = date.split(' ');
                                            var endTimeStr =endTimeParam[1];
                                            this.setState({endTime:date,selectEndTime:false,endTimeView:endTimeStr})
                                        }else{
                                        }

                                    }}
                                            />
                                        </View>
                                    </View>
                                </View>
                        }


                        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        </View>
                    </View>

                    <TouchableOpacity style={{height:30,backgroundColor:'#66CDAA',marginLeft:60,marginRight:60,marginTop:60,justifyContent:'center',alignItems: 'center',
                borderRadius:10,}}
                                      onPress={()=>{
                                      this.sendTimetoAddActivity();
                                      }}>
                        <Text style={{color:'#fff',fontSize:15}}>确 认 时 间</Text>
                    </TouchableOpacity>

                    <View style={{flex:1,padding:10}}>


                    </View>

                </View>
            </View>

        );
    }

    componentDidMount()
    {
        var eventWeekButtons = this.state.eventWeekButtons;

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
            eventWeekButtons.push(string);
            dayNum = dayNum+1;
            date = date+1;

            var d = new Date(year, month, 0);
            var dayCounts = d.getDate();

            if(date>dayCounts){
                month = month+1;
                date = date%dayCounts
            }

        }

        this.setState({eventWeekButtons:eventWeekButtons})


    }

}

var styles = StyleSheet.create({


});

const mapStateToProps = (state, ownProps) => {

    const props = {

    }
    return props
}

export default connect(mapStateToProps)(SeletTime);

