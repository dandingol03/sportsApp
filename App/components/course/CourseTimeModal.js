
import React,{Component} from 'react';

import  {
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    Alert,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputWrapper from 'react-native-text-input-wrapper';
import DateFilter from '../../utils/DateFilter';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import GridView from 'react-native-grid-view';

var {height, width} = Dimensions.get('window');


class CourseTimeModal extends Component{

    close(){
        if(this.props.onClose!==undefined&&this.props.onClose!==null)
        {
            this.props.onClose();
        }
    }

    setTime(){
        var dayMap=['周一','周二','周三','周四','周五','周六','周日']
        var day=null
        dayMap.map((item,i)=>{
            if(item==this.state.selectDay)
                day=i
        })
        var time = {id:this.props.timeListLength+1,day:day+1,startTime:this.state.startTime,endTime:this.state.endTime}
        this.close();
        if(this.props.setTime!==undefined&&this.props.setTime!==null)
        {
            this.props.setTime(time);
        }
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState(nextProps)
    }

    renderRow(rowData)
    {
        if(this.state.selectDay!==rowData){
            return  (
                <TouchableOpacity style={{height:25,width:50,borderRadius:10,borderWidth:1,borderColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                  onPress={()=>{this.setState({selectDay:rowData});}}>
                    <Text style={{color:'#66CDAA',fontSize:13}}>{rowData}</Text>
                </TouchableOpacity>

            );
        }else{
            return  (
                <TouchableOpacity style={{height:25,width:50,borderRadius:10,backgroundColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                  onPress={()=>{this.setState({selectDay:rowData});}}>
                    <Text style={{color:'#fff',fontSize:13}}>{rowData}</Text>
                </TouchableOpacity>

            );
        }

    }


    constructor(props)
    {
        super(props);
        this.state={
            searchInfo:null,
            weekList:['周一','周二','周三','周四','周五','周六','周日',],
            startTime:null,
            endTime:null,
            selectStartTime:false,
            selectEndTime:false,
            selectDay:'周一',
        }
    }

    render(){
        var weekList = this.state.weekList;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var dataSource=ds.cloneWithRows(weekList);

        return (

                <View style={{flex:1,backgroundColor:'#fff',borderRadius:6}}>

                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <View style={{flex:2,margin:5,marginTop:20}}>
                            <View style={{flexDirection:'row',}}>
                                {
                                    this.state.selectDay!=='周一'?
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,borderWidth:1,borderColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周一'});}}>
                                            <Text style={{color:'#66CDAA',fontSize:13}}>周一</Text>
                                        </TouchableOpacity>:
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,backgroundColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周一'});}}>
                                            <Text style={{color:'#fff',fontSize:13}}>周一</Text>
                                        </TouchableOpacity>

                                }
                                {
                                    this.state.selectDay!=='周二'?
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,borderWidth:1,borderColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周二'});}}>
                                            <Text style={{color:'#66CDAA',fontSize:13}}>周二</Text>
                                        </TouchableOpacity>:
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,backgroundColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周二'});}}>
                                            <Text style={{color:'#fff',fontSize:13}}>周二</Text>
                                        </TouchableOpacity>

                                }
                                {
                                    this.state.selectDay!=='周三'?
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,borderWidth:1,borderColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周三'});}}>
                                            <Text style={{color:'#66CDAA',fontSize:13}}>周三</Text>
                                        </TouchableOpacity>:
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,backgroundColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周三'});}}>
                                            <Text style={{color:'#fff',fontSize:13}}>周三</Text>
                                        </TouchableOpacity>

                                }
                                {
                                    this.state.selectDay!=='周四'?
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,borderWidth:1,borderColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周四'});}}>
                                            <Text style={{color:'#66CDAA',fontSize:13}}>周四</Text>
                                        </TouchableOpacity>:
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,backgroundColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周四'});}}>
                                            <Text style={{color:'#fff',fontSize:13}}>周四</Text>
                                        </TouchableOpacity>

                                }

                            </View>
                            <View style={{flexDirection:'row',}}>

                                {
                                    this.state.selectDay!=='周五'?
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,borderWidth:1,borderColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周五'});}}>
                                            <Text style={{color:'#66CDAA',fontSize:13}}>周五</Text>
                                        </TouchableOpacity>:
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,backgroundColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周五'});}}>
                                            <Text style={{color:'#fff',fontSize:13}}>周五</Text>
                                        </TouchableOpacity>

                                }
                                {
                                    this.state.selectDay!=='周六'?
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,borderWidth:1,borderColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周六'});}}>
                                            <Text style={{color:'#66CDAA',fontSize:13}}>周六</Text>
                                        </TouchableOpacity>:
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,backgroundColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周六'});}}>
                                            <Text style={{color:'#fff',fontSize:13}}>周六</Text>
                                        </TouchableOpacity>

                                }
                                {
                                    this.state.selectDay!=='周日'?
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,borderWidth:1,borderColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周日'});}}>
                                            <Text style={{color:'#66CDAA',fontSize:13}}>周日</Text>
                                        </TouchableOpacity>:
                                        <TouchableOpacity style={{height:25,width:50,borderRadius:10,backgroundColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                                          onPress={()=>{this.setState({selectDay:'周日'});}}>
                                            <Text style={{color:'#fff',fontSize:13}}>周日</Text>
                                        </TouchableOpacity>

                                }
                            </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',padding:5,paddingTop:0}}>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',margin:5}}>
                                <Text style={{color:'#343434'}}>开始时间:</Text>
                            </View>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                                backgroundColor:'#eee',borderRadius:10,margin:5}}>
                                {
                                    this.state.startTime==null?
                                        <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#888',fontSize:13}}>请选择：</Text>
                                        </View> :
                                        <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#444',fontSize:13}}>{this.state.startTime}</Text>
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
                                            var startTime = date
                                            //var startTime = date.getHours().toString()+':'+date.getMinutes()().toString();
                                            this.setState({startTime:startTime,selectStartTime:false})
                                        }else{
                                        }

                                    }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',padding:5,paddingTop:0}}>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',margin:5}}>
                                <Text style={{color:'#343434'}}>结束时间:</Text>
                            </View>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10,margin:5}}>
                                {
                                    this.state.endTime==null?
                                        <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#888',fontSize:13}}>请选择：</Text>
                                        </View> :
                                        <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                            <Text style={{color:'#444',fontSize:13}}>{this.state.endTime}</Text>
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
                                            var endTime = date
                                            //var startTime = date.getHours().toString()+':'+date.getMinutes()().toString();
                                            this.setState({endTime:endTime,selectEndTime:false})
                                        }else{
                                        }

                                    }}
                                    />
                                </View>
                            </View>
                        </View>



                    </View>

                    <View style={{flex:1,padding:2,margin:4,flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
                        <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                    backgroundColor:'#fff',borderRadius:6,borderWidth:1,borderColor:'#66CDAA'}}
                                          onPress={()=>{ this.close(); }}>
                            <Text style={{color:'#66CDAA',padding:5}}>取消</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                    backgroundColor:'#66CDAA',borderRadius:6}}
                                          onPress={()=>{this.setTime()}}>
                            <Text style={{color:'#fff',padding:5}}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        );
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderTopWidth:0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderTopColor:'#fff'
    },
    body:{
        padding:10
    },
    row:{
        flexDirection:'row',
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderBottomColor:'#222'
    },
});


module.exports = CourseTimeModal;

