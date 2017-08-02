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
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-datepicker';
import DateFilter from '../../utils/DateFilter';
import AddActivity from './AddActivity';
var {height, width} = Dimensions.get('window');

class IsActivitySchedule extends Component{

    constructor(props) {
        super(props);
        this.state={
            selectTime:false,
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
            eventTime:null,
            startTime:null,
            endTime:null,
            time:{eventTime:null,type:'单次活动',startTime:null,endTime:null,eventWeek:null},
            eventTypeButtons:['取消','单次活动','周期活动'],
        }
    }

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
    sendTimetoAddActivity(){

        this.props.setScheduleTime(this.state.time);
        const {navigator} = this.props;
        if(navigator){
            navigator.pop();
        }

    }


    _handlePress1(index) {

        if(index!==0){
            var eventType = this.state.eventTypeButtons[index];
            var eventTypeCode = index;
            this.setState({time:Object.assign(this.state.time,{type:eventType})});
        }

    }

    show(actionSheet) {
        this[actionSheet].show();
    }

    whichWeek(time){
        var date = DateFilter.filter(time,'yyyy-mm-dd');

        var Fullyear=time.getFullYear();
        var month =Number(date.substring(5,7));
        var day=Number(date.substring(8,10));

        var year=Fullyear % 1000;
        var century=(Fullyear-year)/100;

        if(month == 1||month ==2){
            month+=12;
            year-=1;
        }

        var week=year+parseInt(year/4)+parseInt(century/4)-2*century+parseInt((26*(month+1))/10)+day-1;

        while (week<0){
            week+=7;
        }
        var w =week%7;
        switch (w)
        {
            case 0: this.setState({time:Object.assign(this.state.time,{eventWeek:'星期日'})});break;
            case 1: this.setState({time:Object.assign(this.state.time,{eventWeek:'星期一'})});break;
            case 2: this.setState({time:Object.assign(this.state.time,{eventWeek:'星期二'})});break;
            case 3: this.setState({time:Object.assign(this.state.time,{eventWeek:'星期三'})});break;
            case 4: this.setState({time:Object.assign(this.state.time,{eventWeek:'星期四'})});break;
            case 5: this.setState({time:Object.assign(this.state.time,{eventWeek:'星期五'})});break;
            case 6: this.setState({time:Object.assign(this.state.time,{eventWeek:'星期六'})});break;
        }


    }
    verifyDate(date)
    {
        this.state.selectTime=true;

        var curDay=new Date();
        var hour=date.getHours();
        var day=date.getDay();

        var eventTime = DateFilter.filter(date,'yyyy-mm-dd');
        this.setState({time:Object.assign(this.state.time,{eventTime:date}),selectTime:false,eventTime,eventTime});

    }

    verifystartTime(date)
    {
        this.state.selectTime=true;

        var curDay=new Date();
        var hour=date.getHours();
        var day=date.getDay();

        var startTime = DateFilter.filter(date,'hh:mm');
        this.setState({time:Object.assign(this.state.time,{startTime:startTime}),selectTime:false,startTime,startTime});

        // if(((date-curDay)>0&&curDay.getDate()!=date.getDate())||(curDay.getDate()==date.getDate()&&(hour-curDay.getHours()>1)))
        // {
        //     var startTime = DateFilter.filter(date,'hh:mm');
        //     this.setState({time:Object.assign(this.state.time,{startTime:startTime}),selectTime:false,startTime,startTime});
        //
        // }else{
        //
        //     setTimeout(()=>{
        //         Alert.alert('错误','您所选的日期必须在两小时之后,请重新选择',[{text:'确认',onPress:()=>{
        //         }}]);
        //     },800)
        //     this.setState({selectTime:false});
        // }

    }


    verifyendTime(date)
    {
        this.state.selectTime=true;

        var curDay=new Date();
        var hour=date.getHours();
        var day=date.getDay();


        if(((date-curDay)>0&&curDay.getDate()!=date.getDate())||(curDay.getDate()==date.getDate()&&(hour-curDay.getHours()>2)))
        {
            var endTime = DateFilter.filter(date,'hh:mm');
            this.setState({time:Object.assign(this.state.time,{endTime:endTime}),selectTime:false,endTime,endTime});

        }else{

            setTimeout(()=>{
                Alert.alert('错误','您所选的日期必须在两小时之后,请重新选择',[{text:'确认',onPress:()=>{
                }}]);
            },800)
            this.setState({selectTime:false});
        }

    }

    render() {
        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 2;
        const eventTypeButtons=['取消','单次活动','周期活动'];

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


                    {/*选择是否是周期活动*/}
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5,paddingTop:15}}>
                        <View style={{flex:1}}>
                            <Text>活动类型：</Text>
                        </View>
                        <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}
                                             onPress ={()=>{this.show('actionSheet1')}}>

                            {
                            this.state.time.type==null?
                                //this.props.event.type==null?

                                <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{color:'#444',fontSize:13}}>请选择活动时间：</Text>
                                </View> :
                                <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{color:'#444',fontSize:13}}>{this.state.time.type}</Text>
                                </View>

                        }
                        <View style={{paddingRight:25 }}>
                            <Icon name ='angle-right' size={30} color="#fff" />
                        </View>
                        <ActionSheet
                            ref={(p)=>{
                                this.actionSheet1=p;
                            }}
                            title="请选择活动类型"
                            options={eventTypeButtons}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={
                                        (data)=>{ this._handlePress1(data); }
                                    }
                        >

                        </ActionSheet>
                        </TouchableOpacity>
                    </View>

                {/*活动内容*/}
                {
                    this.state.time.type=='单次活动'?
                        <View style={{flex:1}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                            <View style={{flex:1}}>
                                <Text>活动日期：</Text>
                            </View>
                            <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}>
                                {
                                    this.state.time.eventTime==null?
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#888',fontSize:13}}>请选择活动时间：</Text>
                                        </View> :
                                        <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#444',fontSize:13}}>{this.state.eventTime}</Text>
                                        </View>
                                }

                                <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                    <DatePicker
                                        style={{width:60,marginLeft:0,borderWidth:0}}
                                        customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:25,height:22,borderWidth:0},
                                    }}
                                        mode="date"
                                        placeholder="选择"
                                        format="YYYY-MM-DD HH:mm"
                                        minDate={new Date()}
                                        confirmBtnText="确认"
                                        cancelBtnText="取消"
                                        showIcon={true}
                                        iconComponent={<Icon name={'angle-right'} size={30} color="#fff"/>}
                                        onDateChange={(date) => {
                                        if(this.state.selectTime==false)
                                        {
                                            //TODO:校检date的合法性
                                            var reg=/([\d]{4})-([\d]{2})-([\d]{2})\s([\d]{2})\:([\d]{2})/;
                                            //var  reg=/([\d]{4})-([\d]{2})-([\d]{2})\s/;
                                            var re=reg.exec(date);
                                            if(re)
                                            {
                                                var tmpDate=new Date(re[1],parseInt(re[2])-1,re[3],re[4],re[5])
                                                this.verifyDate(tmpDate);
                                                this.whichWeek(tmpDate);
                                            }
                                        }else{
                                        }

                                    }}
                                    />
                                </View>
                            </View>
                        </View>

                            {/*开始时间*/}
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                <View style={{flex:1}}>
                                    <Text>开始时间：</Text>
                                </View>
                                <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}>
                                    {
                                        this.state.time.startTime==null?
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#888',fontSize:13}}>请选择开始时间：</Text>
                                            </View> :
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#444',fontSize:13}}>{this.state.startTime}</Text>
                                            </View>
                                    }

                                    <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                        <DatePicker
                                            style={{width:60,marginLeft:0,borderWidth:0}}
                                            customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:25,height:22,borderWidth:0},
                                    }}
                                            mode="time"
                                            placeholder="选择"
                                            format="YYYY-MM-DD HH:mm"
                                            minDate={new Date()}
                                            confirmBtnText="确认"
                                            cancelBtnText="取消"
                                            showIcon={true}
                                            iconComponent={<Icon name={'angle-right'} size={30} color="#fff"/>}
                                            onDateChange={(date) => {
                                        if(this.state.selectTime==false)
                                        {
                                            //TODO:校检date的合法性
                                            var reg=/([\d]{4})-([\d]{2})-([\d]{2})\s([\d]{2})\:([\d]{2})/;
                                            //var  reg=/([\d]{4})-([\d]{2})-([\d]{2})\s/;
                                            var re=reg.exec(date);
                                            if(re)
                                            {
                                                var tmpDate=new Date(re[1],parseInt(re[2])-1,re[3],re[4],re[5])
                                                this.verifystartTime(tmpDate);
                                            }
                                        }else{
                                        }

                                    }}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/*结束时间*/}
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                <View style={{flex:1}}>
                                    <Text>结束时间：</Text>
                                </View>
                                <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}>
                                    {
                                        this.state.time.endTime==null?
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#888',fontSize:13}}>请选择结束时间：</Text>
                                            </View> :
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#444',fontSize:13}}>{this.state.endTime}</Text>
                                            </View>
                                    }

                                    <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                        <DatePicker
                                            style={{width:60,marginLeft:0,borderWidth:0}}
                                            customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:25,height:22,borderWidth:0},
                                    }}
                                            mode="time"
                                            placeholder="选择"
                                            format="YYYY-MM-DD HH:mm"
                                            minDate={new Date()}
                                            confirmBtnText="确认"
                                            cancelBtnText="取消"
                                            showIcon={true}
                                            iconComponent={<Icon name={'angle-right'} size={30} color="#fff"/>}
                                            onDateChange={(date) => {
                                        if(this.state.selectTime==false)
                                        {
                                            //TODO:校检date的合法性
                                            var reg=/([\d]{4})-([\d]{2})-([\d]{2})\s([\d]{2})\:([\d]{2})/;
                                            //var  reg=/([\d]{4})-([\d]{2})-([\d]{2})\s/;
                                            var re=reg.exec(date);
                                            if(re)
                                            {
                                                var tmpDate=new Date(re[1],parseInt(re[2])-1,re[3],re[4],re[5])
                                                this.verifyendTime(tmpDate);
                                            }
                                        }else{
                                        }

                                    }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>:
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                <View style={{flex:1}}>
                                    <Text>开始日期：</Text>
                                </View>
                                <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}>
                                    {
                                        this.state.time.eventTime==null?
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#888',fontSize:13}}>请选择活动时间：</Text>
                                            </View> :
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#444',fontSize:13}}>{this.state.eventTime}</Text>
                                            </View>
                                    }

                                    <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                        <DatePicker
                                            style={{width:60,marginLeft:0,borderWidth:0}}
                                            customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:25,height:22,borderWidth:0},
                                    }}
                                            mode="date"
                                            placeholder="选择"
                                            format="YYYY-MM-DD HH:mm"
                                            minDate={new Date()}
                                            confirmBtnText="确认"
                                            cancelBtnText="取消"
                                            showIcon={true}
                                            iconComponent={<Icon name={'angle-right'} size={30} color="#fff"/>}
                                            onDateChange={(date) => {
                                        if(this.state.selectTime==false)
                                        {
                                            //TODO:校检date的合法性
                                            var reg=/([\d]{4})-([\d]{2})-([\d]{2})\s([\d]{2})\:([\d]{2})/;
                                            //var  reg=/([\d]{4})-([\d]{2})-([\d]{2})\s/;
                                            var re=reg.exec(date);
                                            if(re)
                                            {
                                                var tmpDate=new Date(re[1],parseInt(re[2])-1,re[3],re[4],re[5])
                                                this.verifyDate(tmpDate);
                                                this.whichWeek(tmpDate);
                                            }
                                        }else{
                                        }

                                    }}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/*开始时间*/}
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                <View style={{flex:1}}>
                                    <Text>开始时间：</Text>
                                </View>
                                <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}>
                                    {
                                        this.state.time.startTime==null?
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#888',fontSize:13}}>请选择开始时间：</Text>
                                            </View> :
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#444',fontSize:13}}>{this.state.startTime}</Text>
                                            </View>
                                    }

                                    <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                        <DatePicker
                                            style={{width:60,marginLeft:0,borderWidth:0}}
                                            customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:25,height:22,borderWidth:0},
                                    }}
                                            mode="time"
                                            placeholder="选择"
                                            format="YYYY-MM-DD HH:mm"
                                            minDate={new Date()}
                                            confirmBtnText="确认"
                                            cancelBtnText="取消"
                                            showIcon={true}
                                            iconComponent={<Icon name={'angle-right'} size={30} color="#fff"/>}
                                            onDateChange={(date) => {
                                        if(this.state.selectTime==false)
                                        {
                                            //TODO:校检date的合法性
                                            var reg=/([\d]{4})-([\d]{2})-([\d]{2})\s([\d]{2})\:([\d]{2})/;
                                            //var  reg=/([\d]{4})-([\d]{2})-([\d]{2})\s/;
                                            var re=reg.exec(date);
                                            if(re)
                                            {
                                                var tmpDate=new Date(re[1],parseInt(re[2])-1,re[3],re[4],re[5])
                                                this.verifystartTime(tmpDate);
                                            }
                                        }else{
                                        }

                                    }}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/*结束时间*/}
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                <View style={{flex:1}}>
                                    <Text>结束时间：</Text>
                                </View>
                                <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}>
                                    {
                                        this.state.time.eventWeek==null?
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#888',fontSize:13}}>请选择结束时间：</Text>
                                            </View> :
                                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                <Text style={{color:'#444',fontSize:13}}>{this.state.time.eventWeek}</Text>
                                            </View>
                                    }

                                    <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                        <DatePicker
                                            style={{width:60,marginLeft:0,borderWidth:0}}
                                            customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:25,height:22,borderWidth:0},
                                    }}
                                            mode="time"
                                            placeholder="选择"
                                            format="YYYY-MM-DD HH:mm"
                                            minDate={new Date()}
                                            confirmBtnText="确认"
                                            cancelBtnText="取消"
                                            showIcon={true}
                                            iconComponent={<Icon name={'angle-right'} size={30} color="#fff"/>}
                                            onDateChange={(date) => {
                                        if(this.state.selectTime==false)
                                        {
                                            //TODO:校检date的合法性
                                            var reg=/([\d]{4})-([\d]{2})-([\d]{2})\s([\d]{2})\:([\d]{2})/;
                                            //var  reg=/([\d]{4})-([\d]{2})-([\d]{2})\s/;
                                            var re=reg.exec(date);
                                            if(re)
                                            {
                                                var tmpDate=new Date(re[1],parseInt(re[2])-1,re[3],re[4],re[5])
                                                this.verifyendTime(tmpDate);
                                            }
                                        }else{
                                        }
                                    }}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/*周几循环*/}
                        </View>
                }



                <TouchableOpacity style={{height:30,width:width*0.6,marginLeft:width*0.2,backgroundColor:'#66CDAA',margin:10,
                marginBottom:280,justifyContent:'center',alignItems: 'center',borderRadius:10,}}
                                  onPress={()=>{
                                      this.sendTimetoAddActivity();
                                      }}>
                    <Text style={{color:'#fff',fontSize:15}}>确 认 时 间</Text>
                </TouchableOpacity>

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

export default connect(mapStateToProps)(IsActivitySchedule);

