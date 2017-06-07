
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

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';


var {height, width} = Dimensions.get('window');

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class BadmintonCourse extends Component{

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



    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,
            event:{},
            memberLevelButtons:['取消','无','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'],
            eventTypeButtons:['取消','羽毛球单打','羽毛球双打','羽毛球混双','基础练习'],
            courses:[
                {
                    className:'羽毛球新手班',detail:'带初学者迅速学会羽毛球',cost:'500',classCount:8,venue:'山东省体育中心-羽毛球俱乐部'
                },
                {
                    className:'羽毛球发球训练班',detail:'带初学者迅速学会羽毛球',cost:'1000',classCount:4,venue:'山东大学东区新校-羽毛球馆'
                },

                {
                    className:'羽毛球高阶训练班',detail:'带初学者迅速学会羽毛球',cost:'700',classCount:5,venue:'爱菲特羽毛球馆'
                },
                {
                    className:'羽毛球双打训练班',detail:'带初学者迅速学会羽毛球',cost:'1200',classCount:8,venue:'章丘李宁羽毛球馆'
                },
                {
                    className:'羽毛球',detail:'带初学者迅速学会羽毛球',cost:'300',classCount:2,venue:'鑫立华羽毛球俱乐部'
                },

            ]
        };
    }

    render(){

        const shadowOpt = {
            width:224*width/320,
            height:25*height/568,
            color:"#000",
            border:0.5,
            radius:1,
            opacity:0.2,
            x:-0.5,
            y:1,
            style:{marginVertical:8},
        }


        var courseList=null
        if(this.state.courses&&this.state.courses.length>0)
        {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
                        dataSource={ds.cloneWithRows(this.state.courses)}
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
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </TouchableOpacity>
                </View>


                <View style={{flex:1,width:width,backgroundColor:'#66CDAA'}}>
                    <ScrollableTabView
                        renderTabBar={() => <DefaultTabBar  style={{borderBottomColor:0,}}/>}
                        ref={(tabView) => { this.tabView = tabView; }}
                        tabBarActiveTextColor='#fff'
                        tabBarInactiveTextColor="#eee"
                        tabBarUnderlineStyle={{backgroundColor:'#fff'}}

                    >
                        <View tabLabel='浏览' style={{backgroundColor:'#fff',flex:1}}>

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
                            <View style={{height:45*height/736,flexDirection:'row',justifyContent:'center',alignItems: 'center',padding:8,borderTopWidth:1,borderBottomWidth:1,borderColor:'#ddd'}}>
                                <View style={{flexDirection:'row',flex:1}}>
                                    <View style={{flex:3,justifyContent:'center',alignItems: 'flex-start',paddingLeft:15}}>
                                        <Text style={{fontSize:13,color:'#008B00'}}>默认</Text>
                                    </View>
                                    <View style={{flexDirection:'row',flex:2,justifyContent:'center',alignItems: 'center',}}>
                                        <Text style={{fontSize:13}}>花销</Text>
                                        <View style={{marginLeft:5}}>
                                            <Icon name={'caret-up'} size={15} color="#008B00"/>
                                            <Icon name={'caret-down'} size={15} color="#aaa"/>
                                        </View>
                                    </View>
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

                            <Animated.View style={{ flex:1,padding:4,opacity: this.state.fadeAnim }}>
                                {courseList}
                            </Animated.View>






                        </View>
                        <View tabLabel='定制' style={{backgroundColor:'#fff',flex:1}}>



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

                                        {/*<TextInput*/}
                                        {/*style={{flex:10,height:35*height/736,justifyContent:'center',alignItems: 'center',marginLeft:5,*/}
                                        {/*paddingTop:4,paddingBottom:4,fontSize:13,color:'#aaa'}}*/}
                                        {/*onChangeText={(eventBrief) => {*/}
                                        {/*this.setState({event:Object.assign(this.state.event,{eventBrief:eventBrief})});*/}
                                        {/*if( eventBrief==''){*/}
                                        {/*Animated.timing(          // Uses easing functions*/}
                                        {/*this.state.fadeAnim1,    // The value to drive*/}
                                        {/*{toValue: 0},           // Configuration*/}
                                        {/*).start();*/}
                                        {/*}else{*/}
                                        {/*Animated.timing(          // Uses easing functions*/}
                                        {/*this.state.fadeAnim1,    // The value to drive*/}
                                        {/*{toValue: 1},           // Configuration*/}
                                        {/*).start();*/}
                                        {/*}*/}
                                        {/*}}*/}
                                        {/*value={this.state.event.eventBrief}*/}
                                        {/*placeholder='         请输入活动说明'*/}
                                        {/*placeholderTextColor="#aaa"*/}
                                        {/*underlineColorAndroid="transparent"*/}
                                        {/*/>*/}
                                        {/*<Animated.View style={{flex:1,opacity: this.state.fadeAnim1,backgroundColor:'transparent',padding:4}}>*/}
                                        {/*<TouchableOpacity onPress={()=>{*/}
                                        {/*var event = this.state.event;*/}
                                        {/*event.eventBrief = '';*/}
                                        {/*this.setState({event:event});}}>*/}
                                        {/*<Ionicons name='md-close-circle' size={18} color="red"/>*/}
                                        {/*</TouchableOpacity>*/}
                                        {/*</Animated.View>*/}
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

                    </ScrollableTabView>

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



export default connect()(BadmintonCourse);

