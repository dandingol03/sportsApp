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
var {height, width} = Dimensions.get('window');

class IsActivitySchedule extends Component{

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

    show(actionSheet) {
        this[actionSheet].show();
    }

    _handlePress(index) {

        if(index!==0){
            var eventWeek = this.state.Week[index];
            this.setState({eventWeek:eventWeek});
        }

    }

    constructor(props) {
        super(props);
        this.state={
            selectTime:false,

            isSchedule:null,
            eventWeek:null,
            startTime:null,
            endTime:null,

            Week:null,
        }
    }

    render() {
        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;


        const Today=new Date();

        var myDay=[];

        for(var i=0;i<7;i++){
            var millsec=Today.getTime()+i*24*60*60*1000;
            myDay[i]=millsec;
                }

        var setDay=new Array();
        setDay[0]='取消';
        for(var j=0;j<7;j++)
        {
            var day1=new Date(myDay[j]);
            setDay[j+1]=day1;
        }

        const finalShow=new Array();
        finalShow[0]='取消';
        for(var k=1;k<8;k++){
            var date=new Date(setDay[k]);
            var month=date.getMonth();
            var w=date.getDay();
            var day=date.getDate();

            switch(w){
                case 0:var  a= '星期天';break;
                case 1:a= '星期一';break;
                case 2:a= '星期二';break;
                case 3:a= '星期三';break;
                case 4:a= '星期四';break;
                case 5:a= '星期五';break;
                case 6:a= '星期六';break;

            }
            finalShow[k]=a+'   '+month+'月'+day+'日';
        }
        this.state.Week=finalShow;

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

                    {/*内容*/}
                    {
                        this.state.time.type=='单次活动'?
                            <View style={{flex:1}}>
                                <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                                    <View style={{flex:1}}>
                                        <Text>活动日期：</Text>
                                    </View>
                                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}>
                                        <TouchableOpacity style={{flex:3,height:30,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}
                                                          onPress ={()=>{this.show('actionSheet2')}}>
                                            {
                                                this.state.time.eventTime==null?
                                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                        <Text style={{color:'#888',fontSize:13}}>请选择活动日期：</Text>
                                                    </View> :
                                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                        <Text style={{color:'#444',fontSize:13}}>{this.state.time.eventTime}</Text>
                                                    </View>
                                            }


                                            <ActionSheet
                                                ref={(p)=>{this.actionSheet2=p;}}
                                                title="请选择活动日期"
                                                options={finalShow}
                                                cancelButtonIndex={CANCEL_INDEX}
                                                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                                onPress={
                                                    (data)=>{ this._handlePress2(data); }
                                                }
                                            >

                                            </ActionSheet>
                                        </TouchableOpacity>
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
                                                    <Text style={{color:'#444',fontSize:13}}>{this.state.time.endTime}</Text>
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
                                               // this.verifyendTime(tmpDate);
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
                                        <TouchableOpacity style={{flex:3,height:30,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}
                                                          onPress ={()=>{this.show('actionSheet2')}}>
                                            {
                                                this.state.time.eventTime==null?
                                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                        <Text style={{color:'#888',fontSize:13}}>请选择活动时间：</Text>
                                                    </View> :
                                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                        <Text style={{color:'#444',fontSize:13}}>{this.state.time.eventTime}</Text>
                                                    </View>
                                            }

                                            <View  style={{height:30,marginLeft:20,flexDirection:'row',alignItems: 'center',}}>
                                                <ActionSheet
                                                    ref={(p)=>{
                                this.actionSheet2=p;
                            }}
                                                    title="请选择活动时间"
                                                    options={finalShow}
                                                    cancelButtonIndex={CANCEL_INDEX}
                                                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                                    onPress={
                                        (data)=>{ this._handlePress2(data); }
                                    }
                                                >

                                                </ActionSheet>
                                            </View>
                                        </TouchableOpacity>
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
                                                    <Text style={{color:'#444',fontSize:13}}>{this.state.time.endTime}</Text>
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


                </View>


                <TouchableOpacity style={{height:40,backgroundColor:'#66CDAA',marginLeft:60,marginRight:60,justifyContent:'center',alignItems: 'center',
                borderRadius:10,}}
                                  onPress={()=>{
                                      this.sendTimetoAddActivity();
                                      }}>
                    <Text style={{color:'#fff',fontSize:15}}>确 认 时 间</Text>
                </TouchableOpacity>


                <View style={{flex:2}}>

                </View>
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

