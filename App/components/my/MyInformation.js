
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
    Alert
} from 'react-native';
import {connect} from 'react-redux';

import DatePicker from 'react-native-datepicker';
import DateFilter from '../../utils/DateFilter';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'
import PopupDialog,{ScaleAnimation,DefaultAnimation,SlideAnimation} from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });

var {height, width} = Dimensions.get('window');
import TextInputWrapper from 'react-native-text-input-wrapper';
import ActionSheet from 'react-native-actionsheet';

import UsernameModal from './modal/UsernameModal';
import PerNameModal from './modal/PerNameModal';
import MobilePhoneModal from './modal/MobilePhoneModal';
import ValidateMobilePhoneModal from './modal/ValidateMobilePhoneModal';
import WxModal from './modal/WxModal';
import IdCardModal from './modal/IdCardModal';
import SexModal from './modal/SexModal';
import UniversityModal from './modal/UniversityModal';
import HeightWeightModal from './modal/HeightWeightModal';
import WorkCityModal from './modal/WorkCityModal';
import MajorModal from './modal/MajorModal';
import SportLevelModal from './modal/sportsLevelModal';
import CoachLevelModal from './modal/CoachLevel';
import CoachBriefModal from './modal/CoachBriefModal';
import CoachPhotoModal from './modal/CoachPhotoModal';

import{
    updateUsername,
    updateSelfLevel,
    updateSportLevel,
    onSportLevelUpdate,
    onUsernameUpdate,
    onSelfLevelUpdate,
    updatePerName,
    onPerNameUpdate,
    updateWeChat,
    onWeChatUpdate,
    updateGenderCode,
    onGenderCodeUpdate,
    updatePerBirthday,
    onPerBirthdayUpdate,
    updatePerIdCard,
    onPerIdCardUpdate,
    onMobilePhoneUpdate,
    verifyMobilePhone,
    updateMobilePhone,
    updateUniversity,
    onUniversityUpdate,
    updateHeightWeight,
    onHeightWeightUpdate,
    updateWorkCity,
    onWorkCityUpdate,
    updateMajor,
    onMajorUpdate,
    updateCoachBrief,
    onCoachBriefUpdate,
    updateCoachLevel,
    onCoachLevelUpdate,
    updateCoachPhoto0,
    updateCoachPhoto1,
    updateCoachPhoto2,
    updateCoachPhoto3,
    onCoachPhoto0Update,
    onCoachPhoto1Update,
    onCoachPhoto2Update,
    onCoachPhoto3Update,





} from '../../action/UserActions';

class MyInformation extends Component{
    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

   getDate(tm){
       var tt=new Date(parseInt(tm)*1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
       return tt;
    }

    showUserNameDialog() {
        this.usernameDialog.show();
    }

    showPerNameDialog()
    {
        this.perNameDialog.show()
    }

    showMobilePhoneDialog()
    {
        this.mobilePhoneDialog.show()
    }

    showWxDialog()
    {
        this.wxDialog.show()
    }

    showSexDialog()
    {
        this.SexDialog.show()
    }

    showIdCardDialog()
    {
        this.idCardDialog.show()
    }
    showUniversityDialog(){
       this.universityDialog.show()
    }
    showHeightWeightDialog(){
        this.HeightWeightDialog.show()
    }
    showWorkCityDialog(){
        this.WorkCityDialog.show()
    }
    showMajorDialog(){
        this.MajorDialog.show()
    }
    showWSportLevelDialog(){
        this.SportLevelDialog.show()
    }
    showCoachBriefDialog(){
        this.CoachBriefDialog.show()
    }
    showCoachPhotoDialog(){
        this.CoachPhotoDialog.show()
    }
    showCoachPhoto1Dialog(){
        this.CoachPhoto1Dialog.show()
    }
    showCoachPhoto2Dialog(){
        this.CoachPhoto2Dialog.show()
    }
    showCoachPhoto3Dialog(){
        this.CoachPhoto3Dialog.show()
    }
    showCoachLevelDialog(){
        this.CoachLevelDialog.show()
    }
    show(actionSheet) {
        this[actionSheet].show();
    }

    //个人水平设置
    _handlePress1(index) {

        if(index>1){
            var selfLevel = this.state.memberLevelButtons[index];
            var selfLevelCode = index-1;
            this.setState({selfLevel:selfLevel,selfLevelCode:selfLevelCode});
            //TODO:make a dispatch
            this.props.dispatch(updateSelfLevel(selfLevelCode)).then((json)=>{
                if(json.re==1)
                    this.props.dispatch(onSelfLevelUpdate(selfLevelCode))
            })
        }else if(index==1)
        {
            //设置'无'
            //TODO:make a dispatch
            this.setState({selfLevel:null,selfLevelCode:null});
            this.props.dispatch(updateSelfLevel(null)).then((json)=>{
                if(json.re==1)
                    this.props.dispatch(onSelfLevelUpdate(null))
            })
        }else{}

    }

    //运动水平设置
    _handlePress2(index)
    {
        if(index>1){
            var sportLevel = this.state.memberLevelButtons[index];
            var sportLevelCode = index-1;
            this.setState({sportLevel:sportLevel,selfLevelCode:sportLevelCode});
            //TODO:make a dispatch
            this.props.dispatch(updateSportLevel(sportLevelCode)).then((json)=>{
                if(json.re==1)
                    this.props.dispatch(onSportLevelUpdate(sportLevelCode))
            })
        }else if(index==1)
        {
            //设置'无'
            //TODO:make a dispatch
            this.setState({selfLevel:null,selfLevelCode:null});
            this.props.dispatch(updateSportLevel(null)).then((json)=>{
                if(json.re==1)
                    this.props.dispatch(onSportLevelUpdate(null))
            })
        }else{}
    }


    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,
            selectBirthday:false,
            memberLevelButtons:['取消','无','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'],
            showPersoninfo:true,
            showCoachinfo:false,
            photo:{photo0:false,photo1:false,photo2:false,photo3:false,photo4:false},
            portrait0:null,
            portrait1:null,
            portrait2:null,
            portrait3:null,
        };

    }

    render(){

        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;

        return (
            <View style={styles.container}>
                <Toolbar width={width} title="我的资料" actions={[]} navigator={this.props.navigator}>



                    {/*<View style={{flexDirection:'row',borderBottomWidth:1,alignItems:"center",justifyContent:"center",padding:8}}>*/}
                        {/*<View style={{flexDirection:'row',justifyContent:"center",alignItems:"center",marginRight:20,borderBottomLeftRadius:2}}>*/}
                        {/*<TouchableOpacity style={{flexDirection:'row',backgroundColor:'#eee',}}*/}
                                          {/*onPress={()=>{*/}
                                                  {/*this.setState({showPersoninfo:true});*/}
                                                  {/*this.setState({showCoachinfo:false});*/}
                                              {/*}}*/}
                        {/*>*/}
                            {/*<View style={{flexDirection:'row',alignItems:'center'}}>*/}
                                {/*<Text style={{color:'#555',fontWeight:'bold',fontSize:18}}>*/}
                                    {/*基本信息资料*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                        {/*<View style={{flexDirection:'row',justifyContent:"center",alignItems:"center",marginLeft:20}}>*/}
                            {/*<TouchableOpacity style={{flexDirection:'row',backgroundColor:'#eee',}}*/}
                                              {/*onPress={()=>{*/}
                                                  {/*this.setState({showPersoninfo:false});*/}
                                                  {/*this.setState({showCoachinfo:true});*/}
                                              {/*}}*/}
                            {/*>*/}
                                {/*<View style={{flexDirection:'row',alignItems:'center'}}>*/}
                                    {/*<Text style={{color:'#555',fontWeight:'bold',fontSize:18}}>*/}
                                        {/*专业技能资料*/}
                                    {/*</Text>*/}
                                {/*</View>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                    {
                        this.state.showPersoninfo==true?

                    <View style={{flexDirection:'column'}}>
                    <View style={{backgroundColor:'#fff',padding:10}}>
                        <ScrollView style={{padding:3,marginTop:4,height:height*0.7,backgroundColor:'white'}}>

                        {/*用户名*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,paddingTop:4,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showUserNameDialog();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    用户名
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.username&&this.props.username!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.username}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }

                            </View>
                        </TouchableOpacity>


                        {/*微信号*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showWxDialog();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    微信号
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.wechat&&this.props.wechat!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.wechat}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }
                            </View>
                        </TouchableOpacity>

                        {/*手机号*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:8,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showMobilePhoneDialog();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    手机号
                                </Text>
                            </View>
                            <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.mobilePhone&&this.props.mobilePhone!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.mobilePhone}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }

                            </View>

                        </TouchableOpacity>


                        {/*教练姓名*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showPerNameDialog();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    教练姓名
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>

                                {
                                    this.props.perName&&this.props.perName!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.perName}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }

                            </View>
                        </TouchableOpacity>


                        {/*性别*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showSexDialog();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    教练性别
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.genderCode&&this.props.genderCode!=''?
                                    <View>{
                                        this.props.genderCode==1?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                男
                                            </Text>:                                        <Text style={{color:'#444',fontSize:15}}>
                                           女
                                        </Text>
                                    }

                                    </View>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }
                            </View>
                        </TouchableOpacity>


                        {/*年龄*/}
                        <View style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}

                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    出生日期
                                </Text>
                            </View>
                            <View style={{flex:2,marginLeft:30,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.perBirthday&&this.props.perBirthday!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.perBirthday}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置{this.props.perBirthday}
                                        </Text>
                                }
                            </View>

                            <View style={{height:35,marginRight:0,flexDirection:'row',alignItems:'center'}}>
                                <DatePicker
                                    style={{width:60,marginLeft:0,borderWidth:0}}
                                    customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:0,height:25,borderWidth:0},
                                    }}
                                    mode="date"
                                    placeholder="选择"
                                    format="YYYY-MM-DD"
                                    minDate={"1957-00-00"}
                                    confirmBtnText="确认"
                                    cancelBtnText="取消"
                                    showIcon={true}
                                    iconComponent={<Icon name={'calendar'} size={30} color="#888"/>}
                                    onDateChange={(date) => {
                                        if(this.state.selectBirthday==false)
                                        {
                                            this.state.selectBirthday=true;
                                            this.setState({selectBirthday:false});


                                            this.props.dispatch(updatePerBirthday(date)).then((json)=>{
                                                if(json.re==1){
                                                    this.props.dispatch(onPerBirthdayUpdate(date))
                                                }
                                            })

                                        }

                                    }}
                                />
                            </View>
                        </View>

                            {/*身高体重*/}
                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                              onPress={()=>{
                                                  this.showHeightWeightDialog();
                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        身高体重
                                    </Text>
                                </View>
                                <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    {
                                        this.props.heightweight&&this.props.heightweight!=''?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                {this.props.heightweight}
                                            </Text>:
                                            <Text style={{color:'#777',fontSize:15}}>
                                                未设置
                                            </Text>
                                    }

                                </View>
                            </TouchableOpacity>

                            {/*服务城市*/}
                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                              onPress={()=>{
                                                  this.showWorkCityDialog();

                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        服务城市
                                    </Text>
                                </View>
                                <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    {
                                        this.props.workcity&&this.props.workcity!=''?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                {this.props.workcity}
                                            </Text>:
                                            <Text style={{color:'#777',fontSize:15}}>
                                                未设置
                                            </Text>
                                    }

                                </View>
                            </TouchableOpacity>

                        {/*毕业院校*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showUniversityDialog();

                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    毕业院校
                                </Text>
                            </View>
                            <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.university&&this.props.university!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.university}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }

                            </View>
                        </TouchableOpacity>

                        {/*毕业专业*/}
                        {/*<TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}*/}
                                          {/*onPress={()=>{*/}
                                                  {/*this.showMajorDialog();*/}

                                              {/*}}*/}
                        {/*>*/}
                            {/*<View style={{flex:1,flexDirection:'row',alignItems:'center'}}>*/}
                                {/*<Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>*/}
                                    {/*毕业专业*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                            {/*<View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>*/}
                                {/*{*/}
                                    {/*this.props.major&&this.props.major!=''?*/}
                                        {/*<Text style={{color:'#444',fontSize:15}}>*/}
                                            {/*{this.props.major}*/}
                                        {/*</Text>:*/}
                                        {/*<Text style={{color:'#777',fontSize:15}}>*/}
                                            {/*未设置*/}
                                        {/*</Text>*/}
                                {/*}*/}

                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}

                        {/*教练资质*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showWSportLevelDialog();

                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    教练资质
                                </Text>
                            </View>
                            <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.sportLevel&&this.props.sportLevel!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.sportLevel}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }

                            </View>
                        </TouchableOpacity>

                        {/*教练星级*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showCoachLevelDialog();

                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    教练星级
                                </Text>
                            </View>
                            <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.coachLevel&&this.props.coachLevel!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.coachLevel}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }

                            </View>
                        </TouchableOpacity>

                        {/*身份证*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showIdCardDialog();

                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    身份证
                                </Text>
                            </View>
                            <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.perIdCard&&this.props.perIdCard!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.perIdCard}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }

                            </View>
                        </TouchableOpacity>

                        {/*教练简介*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showCoachBriefDialog();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    教练简介
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.coachBrief&&this.props.coachBrief!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.coachBrief}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }
                            </View>
                        </TouchableOpacity>

                            {/*上传教练图片*/}
                            <View style={{flexDirection:'column'}}>
                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderColor:'#eee'}}
                                              onPress={()=>{

                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        上传教练图片
                                    </Text>
                                    <Icon />
                                </View>
                            </TouchableOpacity>


                             <View style={{flexDirection:'row',borderBottomWidth:1}}>
                                 <TouchableOpacity style={{flexDirection:'row',padding:2,paddingHorizontal:0,borderColor:'#eee'}}
                                                   onPress={()=>{
                                                        this.showCoachPhotoDialog();
                                              }}
                                 >
                                     <View style={{flexDirection:'row',alignItems:'center'}}>
                                         {this.props.coachPhoto==null||this.props.coachPhoto==''||this.props.coachPhoto==undefined?

                                         <Image  resizeMode="stretch" style={{width:width*0.22,height:width*0.25}}
                                                 source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516790705842&di=fa9dbc85e6ad5f3a56ffca077dbcf8fa&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg"}}
                                         />:
                                             <Image  resizeMode="stretch" style={{width:width*0.22,height:width*0.25}}
                                                    source={{uri:this.props.coachPhoto}}
                                         />

                                         }
                                     </View>
                                 </TouchableOpacity>

                                 <TouchableOpacity style={{flexDirection:'row',padding:2,paddingHorizontal:0,borderColor:'#eee'}}
                                                   onPress={()=>{
                                                        this.showCoachPhoto1Dialog();
                                              }}
                                 >
                                     <View style={{flexDirection:'row',alignItems:'center'}}>
                                         {this.props.coachPhoto1==null||this.props.coachPhoto1==''||this.props.coachPhoto1==undefined?

                                             <Image  resizeMode="stretch" style={{width:width*0.22,height:width*0.25}}
                                                     source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516790705842&di=fa9dbc85e6ad5f3a56ffca077dbcf8fa&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg"}}
                                             />:
                                             <Image  resizeMode="stretch" style={{width:width*0.22,height:width*0.25}}
                                                     source={{uri:this.props.coachPhoto1}}
                                             />

                                         }
                                     </View>
                                 </TouchableOpacity>

                                 <TouchableOpacity style={{flexDirection:'row',padding:2,paddingHorizontal:0,borderColor:'#eee'}}
                                                   onPress={()=>{
                                                        this.showCoachPhoto2Dialog();
                                              }}
                                 >
                                     <View style={{flexDirection:'row',alignItems:'center'}}>
                                         {this.props.coachPhoto2==null||this.props.coachPhoto2==''||this.props.coachPhoto2==undefined?

                                             <Image  resizeMode="stretch" style={{width:width*0.22,height:width*0.25}}
                                                     source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516790705842&di=fa9dbc85e6ad5f3a56ffca077dbcf8fa&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg"}}
                                             />:
                                             <Image  resizeMode="stretch" style={{width:width*0.22,height:width*0.25}}
                                                     source={{uri:this.props.coachPhoto2}}
                                             />

                                         }
                                     </View>
                                 </TouchableOpacity>

                                 <TouchableOpacity style={{flexDirection:'row',padding:2,paddingHorizontal:0,borderColor:'#eee'}}
                                                   onPress={()=>{
                                                        this.showCoachPhoto3Dialog();
                                              }}
                                 >
                                     <View style={{flexDirection:'row',alignItems:'center'}}>
                                         {this.props.coachPhoto3==null||this.props.coachPhoto3==''||this.props.coachPhoto3==undefined?

                                             <Image  resizeMode="stretch" style={{width:width*0.22,height:width*0.25}}
                                                     source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516790705842&di=fa9dbc85e6ad5f3a56ffca077dbcf8fa&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg"}}
                                             />:
                                             <Image  resizeMode="stretch" style={{width:width*0.22,height:width*0.25}}
                                                     source={{uri:this.props.coachPhoto3}}
                                             />

                                         }
                                     </View>
                                 </TouchableOpacity>

                             </View>
                            </View>

                        </ScrollView>

                    </View>

                    <View style={{backgroundColor:'#fff',padding:10}}>


                        {/*自身水平*/}
                        {
                            this.props.userType==0?
                                <View style={{flexDirection:'row',alignItems: 'center',paddingHorizontal:10,padding:12,paddingBottom:4}}>
                                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                        <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>自身水平</Text>
                                    </View>
                                    <TouchableOpacity style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                                        borderRadius:10}}
                                                      onPress={()=>{ this.show('actionSheet1'); }}>

                                        {
                                            this.props.selfLevel==null?
                                                <View style={{flex:3,marginLeft:15,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                    <Text style={{color:'#888',fontSize:13}}>请选择自身水平：</Text>
                                                </View> :
                                                <View style={{flex:3,marginLeft:15,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                    <Text style={{color:'#444',fontSize:13,fontWeight:'bold'}}>
                                                        {this.state.memberLevelButtons[parseInt(this.props.selfLevel)+1]}
                                                    </Text>
                                                </View>
                                        }
                                        <View style={{width:40,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                            <Icon name={'angle-down'} size={30} color="#fff"/>
                                        </View>
                                        <ActionSheet
                                            ref={(o) => {
                                        this.actionSheet1 = o;
                                    }}
                                            title="请选择自身水平"
                                            options={this.state.memberLevelButtons}
                                            cancelButtonIndex={CANCEL_INDEX}
                                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                            onPress={
                                        (data)=>{ this._handlePress1(data); }
                                    }
                                        />
                                    </TouchableOpacity>
                                </View>:null
                        }

                        {/*运动水平*/}
                        {
                            this.props.userType==1?
                                <View style={{flexDirection:'row',alignItems: 'center',paddingHorizontal:10,padding:12,paddingBottom:4}}>
                                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                        <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>运动水平</Text>
                                    </View>
                                    <TouchableOpacity style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                                        borderRadius:10}}
                                                      onPress={()=>{ this.show('actionSheet1'); }}>

                                        {
                                            this.props.sportLevel==null?
                                                <View style={{flex:3,marginLeft:15,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                    <Text style={{color:'#888',fontSize:13}}>请选择运动水平：</Text>
                                                </View> :
                                                <View style={{flex:3,marginLeft:15,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                                    <Text style={{color:'#444',fontSize:13,fontWeight:'bold'}}>
                                                        {this.state.memberLevelButtons[parseInt(this.props.sportLevel)+1]}
                                                    </Text>
                                                </View>
                                        }
                                        <View style={{width:40,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                            <Icon name={'angle-down'} size={30} color="#fff"/>
                                        </View>
                                        <ActionSheet
                                            ref={(o) => {
                                                this.actionSheet1 = o;
                                            }}
                                            title="请选择运动水平"
                                            options={this.state.memberLevelButtons}
                                            cancelButtonIndex={CANCEL_INDEX}
                                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                            onPress={
                                                (data)=>{ this._handlePress2(data); }
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>:null
                        }


                    </View>

                    </View>:

                    <View style={{flexDirection:'column'}}>

                        <View style={{flexDirection:'column',padding:8}}>
                            {/*微信号*/}
                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}
                                              onPress={()=>{
                                                  this.showWxDialog();
                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        教练姓名
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    {
                                        this.props.wechat&&this.props.wechat!=''?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                {this.props.wechat}
                                            </Text>:
                                            <Text style={{color:'#777',fontSize:15}}>
                                                未设置
                                            </Text>
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}
                                              onPress={()=>{
                                                  this.showWxDialog();
                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        教练性别
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    {
                                        this.props.wechat&&this.props.wechat!=''?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                {this.props.wechat}
                                            </Text>:
                                            <Text style={{color:'#777',fontSize:15}}>
                                                未设置
                                            </Text>
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}
                                              onPress={()=>{
                                                  this.showWxDialog();
                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        教练年龄
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    {
                                        this.props.wechat&&this.props.wechat!=''?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                {this.props.wechat}
                                            </Text>:
                                            <Text style={{color:'#777',fontSize:15}}>
                                                未设置
                                            </Text>


                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}
                                              onPress={()=>{
                                                  this.showWxDialog();
                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        毕业院校
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    {
                                        this.props.wechat&&this.props.wechat!=''?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                {this.props.wechat}
                                            </Text>:
                                            <Text style={{color:'#777',fontSize:15}}>
                                                未设置
                                            </Text>
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}
                                              onPress={()=>{
                                                  this.showWxDialog();
                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        教练等级
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    {
                                        this.props.wechat&&this.props.wechat!=''?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                {this.props.wechat}
                                            </Text>:
                                            <Text style={{color:'#777',fontSize:15}}>
                                                未设置
                                            </Text>
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}
                                              onPress={()=>{
                                                  this.showWxDialog();
                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        从业年限
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    {
                                        this.props.wechat&&this.props.wechat!=''?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                {this.props.wechat}
                                            </Text>:
                                            <Text style={{color:'#777',fontSize:15}}>
                                                未设置
                                            </Text>
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}
                                              onPress={()=>{
                                                  this.showWxDialog();
                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        身份证号
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    {
                                        this.props.wechat&&this.props.wechat!=''?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                {this.props.wechat}
                                            </Text>:
                                            <Text style={{color:'#777',fontSize:15}}>
                                                未设置
                                            </Text>
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}
                                              onPress={()=>{
                                                  this.showWxDialog();
                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                        教练姓名
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    {
                                        this.props.wechat&&this.props.wechat!=''?
                                            <Text style={{color:'#444',fontSize:15}}>
                                                {this.props.wechat}
                                            </Text>:
                                            <Text style={{color:'#777',fontSize:15}}>
                                                未设置
                                            </Text>
                                    }
                                </View>
                            </TouchableOpacity>


                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:15}}>
                                <TouchableOpacity style={{flexDirection:'row',padding:12,backgroundColor:'#00BCD4',borderRadius:10,marginRight:10}}
                                                  onPress={()=>{
                                                  this.showWxDialog();
                                              }}
                                >
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                            上传教练图片
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>


                    </View>
                    }





                    {/*保存用户名*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.usernameDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <UsernameModal
                            val={this.props.username}
                            onClose={()=>{
                                this.usernameDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.username)
                                {
                                    //TODO:进行用户名的保存
                                    this.props.dispatch(updateUsername(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onUsernameUpdate(val))
                                        }
                                        this.usernameDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    {/*保存真实姓名*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.perNameDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <PerNameModal
                            val={this.props.perName}
                            onClose={()=>{
                                this.perNameDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.perName)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updatePerName(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onPerNameUpdate(val))
                                        }
                                        this.perNameDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    <PopupDialog
                        ref={(popupDialog) => {
                        this.mobilePhoneDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.85}
                        height={0.4}
                    >

                        <ValidateMobilePhoneModal
                            val={this.props.mobilePhone}
                            onVerify={(data)=>{
                                this.props.dispatch(verifyMobilePhone(data))
                                .then((json)=>{
                                    if(json.re==1)
                                    {
                                        this.state.verifyCode=json.data
                                    }
                                })
                            }}
                            onClose={()=>{
                                this.mobilePhoneDialog.dismiss();
                            }}
                            onConfirm={(data)=>{
                                var {mobilePhone,verifyCode}=data
                                if(this.state.verifyCode!==null&&this.state.verifyCode!==undefined&&this.state.verifyCode==verifyCode)
                                {
                                      this.props.dispatch(updateMobilePhone(mobilePhone)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onMobilePhoneUpdate(mobilePhone))
                                        }
                                        this.mobilePhoneDialog.dismiss();
                                        Alert.alert('信息','手机号验证通过',[{text:'确认',onPress:()=>{
                                             console.log();
                                        }}]);
                                    })
                                }else{
                                    Alert.alert('信息','验证码输入错误',[{text:'确认',onPress:()=>{
                                             console.log();
                                        }}]);
                                }

                            }}
                        />

                    </PopupDialog>

                    <PopupDialog
                        ref={(popupDialog) => {
                        this.wxDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <WxModal
                            val={this.props.wechat}
                            onClose={()=>{
                                this.wxDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.wechat)
                                {
                                    this.props.dispatch(updateWeChat(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onWeChatUpdate(val))
                                        }
                                        this.wxDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    {/*性别*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.SexDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <SexModal
                            val={this.props.genderCode}
                            onClose={()=>{
                                this.SexDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.genderCode)
                                {
                                    this.props.dispatch(updateGenderCode(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onGenderCodeUpdate(val))
                                        }
                                        this.SexDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    <PopupDialog
                        ref={(popupDialog) => {
                        this.idCardDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <IdCardModal
                            val={this.props.perIdCard}
                            onClose={()=>{
                                this.idCardDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.perIdCard)
                                {
                                    this.props.dispatch(updatePerIdCard(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onPerIdCardUpdate(val))
                                        }
                                        this.idCardDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    <PopupDialog
                        ref={(popupDialog) => {
                        this.universityDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <UniversityModal
                            val={this.props.university}
                            onClose={()=>{
                                this.universityDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.university)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateUniversity(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onUniversityUpdate(val))
                                        }
                                        this.universityDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    {/*身高体重*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.HeightWeightDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <HeightWeightModal
                            val={this.props.heightweight}
                            onClose={()=>{
                                this.HeightWeightDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.heightweight)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateHeightWeight(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onHeightWeightUpdate(val))
                                        }
                                        this.HeightWeightDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    {/*服务城市*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.WorkCityDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <WorkCityModal
                            val={this.props.workcity}
                            onClose={()=>{
                                this.WorkCityDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.workcity)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateWorkCity(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onWorkCityUpdate(val))
                                        }
                                        this.WorkCityDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    {/*毕业专业*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.MajorDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <MajorModal
                            val={this.props.major}
                            onClose={()=>{
                                this.MajorDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.major)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateMajor(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onMajorUpdate(val))
                                        }
                                        this.MajorDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    {/*教练资质*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.SportLevelDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.55}
                    >

                        <SportLevelModal
                            val={this.props.sportlevel}
                            onClose={()=>{
                                this.SportLevelDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.sportlevel)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateSportLevel(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onSportLevelUpdate(val))
                                        }
                                        this.SportLevelDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    {/*教练星级*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.CoachLevelDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.5}
                    >

                        <CoachLevelModal
                            val={this.props.coachlevel}
                            onClose={()=>{
                                this.CoachLevelDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.coachlevel)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateCoachLevel(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onCoachLevelUpdate(val))
                                        }
                                        this.CoachLevelDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    {/*教练简介*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.CoachBriefDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <CoachBriefModal
                            val={this.props.coachBrief}
                            onClose={()=>{
                                this.CoachBriefDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.coachBrief)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateCoachBrief(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onCoachBriefUpdate(val))
                                        }
                                        this.CoachBriefDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    {/*上传教练图片*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.CoachPhotoDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.45}
                    >

                        <CoachPhotoModal
                            val={this.props.major}
                            onClose={()=>{
                                this.CoachPhotoDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.coachphoto)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateCoachPhoto0(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onCoachPhoto0Update(val))
                                        }
                                        this.CoachPhotoDialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    <PopupDialog
                        ref={(popupDialog) => {
                        this.CoachPhoto1Dialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.45}
                    >

                        <CoachPhotoModal
                            val={this.props.major}
                            onClose={()=>{
                                this.CoachPhoto1Dialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.coachphoto)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateCoachPhoto1(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onCoachPhoto1Update(val))
                                        }
                                        this.CoachPhoto1Dialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    <PopupDialog
                        ref={(popupDialog) => {
                        this.CoachPhoto2Dialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.45}
                    >

                        <CoachPhotoModal
                            val={this.props.major}
                            onClose={()=>{
                                this.CoachPhoto2Dialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.coachphoto)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateCoachPhoto2(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onCoachPhoto2Update(val))
                                        }
                                        this.CoachPhoto2Dialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

                    <PopupDialog
                        ref={(popupDialog) => {
                        this.CoachPhoto3Dialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.45}
                    >

                        <CoachPhotoModal
                            val={this.props.major}
                            onClose={()=>{
                                this.CoachPhoto3Dialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.coachphoto)
                                {
                                    //TODO:进行真实姓名的保存
                                    this.props.dispatch(updateCoachPhoto3(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onCoachPhoto3Update(val))
                                        }
                                        this.CoachPhoto3Dialog.dismiss();
                                    })
                                }
                            }}
                        />

                    </PopupDialog>

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


const mapStateToProps = (state, ownProps) => {

    var personInfo=state.user.personInfo
    var trainerInfo=state.user.trainer
    var personInfoAuxiliary=state.user.personInfoAuxiliary
    var chuo=personInfo.perBirthday;
    var time=new Date(chuo);
    var year=time.getFullYear();
    var month=time.getMonth()+1;
    var day=time.getDate();
    var tt1=year+'-'+month+'-'+day;

    const props = {
        username:state.user.user.username,
        perName:personInfo.perName,
        mobilePhone:personInfo.mobilePhone,
        wechat:personInfo.wechat,
        perIdCard:personInfo.perIdCard,
        selfLevel:personInfoAuxiliary.selfLevel,
        userType:parseInt(state.user.usertype),
        checkedMobile:personInfoAuxiliary.checkedMobile,
        genderCode:personInfo.genderCode,
        perBirthday:tt1,
        sportLevel:trainerInfo.sportLevel,
        heightweight:trainerInfo.heightweight,
        workcity:trainerInfo.workcity,
        major:trainerInfo.major,
        university:trainerInfo.university,
        coachLevel:trainerInfo.coachLevel,
        coachBrief:trainerInfo.brief,
        coachPhoto:trainerInfo.attachId,
        coachPhoto1:trainerInfo.attachId1,
        coachPhoto2:trainerInfo.attachId2,
        coachPhoto3:trainerInfo.attachId3,

    }

    if(trainerInfo)
        props.sportLevel=trainerInfo.sportLevel
    return props
}

export default connect(mapStateToProps)(MyInformation);


