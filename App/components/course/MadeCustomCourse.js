
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
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-datepicker';
import TextInputWrapper from 'react-native-text-input-wrapper'



var {height, width} = Dimensions.get('window');

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class MadeCustomCourse extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,
            event:{},
            eventTypeButtons:['取消','羽毛球单打','羽毛球双打','羽毛球混双','基础练习'],
        };
    }

    render()
    {


        return (
            <View style={styles.container}>

                <View style={{height:70,width:width,paddingTop:30,flexDirection:'row',justifyContent:'center',
                    backgroundColor:'#66CDAA'}}>
                    <TouchableOpacity style={{width:60,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Ionicons name={'md-arrow-back'} size={25} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                        <Text style={{color:'#fff',fontSize:18}}>发布定制</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </TouchableOpacity>
                </View>


                <View style={{flex:8,backgroundColor:'#fff',padding:5}}>

                    {/*活动类型*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>课程类型：</Text>
                        </View>
                        <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                                            borderRadius:10}}
                                          onPress={()=>{ this.show('actionSheet2'); }}>
                            {
                                this.state.event.type==null?
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>请选择课程类型：</Text>
                                    </View> :
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.event.type}</Text>
                                    </View>

                            }
                            <View style={{width:60,flexDirection:'row',justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                <Icon name={'angle-right'} size={30} color="#fff"/>
                            </View>
                            <ActionSheet
                                ref={(p) => {
                                        this.actionSheet2 =p;
                                    }}
                                title="请选择活动类型"
                                options={this.state.eventTypeButtons}
                                cancelButtonIndex={CANCEL_INDEX}
                                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                onPress={
                                        (data)=>{ this._handlePress2(data); }
                                    }
                            />
                        </TouchableOpacity>
                    </View>

                    {/*课程时间*/}
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>课程时间：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                                        backgroundColor:'#eee',borderRadius:10}}>
                            {
                                this.state.event.eventTime==null?
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>请选择课程时间：</Text>
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
                                    mode="datetime"
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
                                            var re=reg.exec(date);
                                            if(re)
                                            {
                                                var tmpDate=new Date(re[1],parseInt(re[2])-1,re[3],re[4],re[5])
                                                this.verifyDate(tmpDate);
                                            }
                                        }else{
                                        }

                                    }}
                                />
                            </View>
                        </View>


                    </View>


                    {/*活动地点*/}
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>上课地点：</Text>
                        </View>

                        <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                                        borderRadius:10}}
                                          onPress={
                                  ()=>{
                                      this.navigate2VenueInspect()
                                  }}
                        >
                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                <Text style={{color:'#888',fontSize:13}}>请选择上课场馆：</Text>
                            </View>
                            <View style={{width:60,justifyContent:'center',alignItems: 'center',flexDirection:'row',marginLeft:20}}>
                                <Icon name={'angle-right'} size={30} color="#fff"/>
                            </View>
                        </TouchableOpacity>
                    </View>





                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>补充说明：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                                        borderRadius:10}}>

                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入活动说明"
                                val={this.state.event.eventBrief}
                                onChangeText={
                                    (value)=>{
                                        this.setState({user:Object.assign(this.state.event,{eventBrief:value})})
                                    }}
                            />


                        </View>
                    </View>


                    <View style={{flexDirection:'row',backgroundColor:'#fff',padding:10}}>
                        <Text style={{color:'#aaa',fontSize:11}}>
                            温馨提示：您发布的内容应合法、真实、健康、共创文明的网络环境
                        </Text>
                    </View>


                    <View style={{width:width,flexDirection:'row',justifyContent:'center',marginTop:20}}>
                        <View style={{width:width/2,padding:6,backgroundColor:'#66CDAA',borderRadius:4,
                                        flexDirection:'row',justifyContent:'center'}}>
                            <Text style={{color:'#fff',fontSize:16}}>发布定制</Text>
                        </View>
                    </View>
                </View>


            </View>
        )

    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
});

export default connect()(MadeCustomCourse);
