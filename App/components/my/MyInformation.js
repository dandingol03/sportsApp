
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
            memberLevelButtons:['取消','无','体育本科','国家一级运动员','国家二级运动员','国家三级运动员']
        };
    }

    render(){

        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;

        return (
            <View style={styles.container}>
                <Toolbar width={width} title="我的资料" actions={[]} navigator={this.props.navigator}>

                    <View style={{flexDirection:'row',padding:10,paddingHorizontal:20}}>
                        <Text style={{color:'#444',fontSize:13,fontWeight:'bold'}}>帐号</Text>
                    </View>

                    <View style={{backgroundColor:'#fff',padding:10}}>



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

                        {/*真实姓名*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showPerNameDialog();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    真实姓名
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
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10}}
                                          onPress={()=>{
                                                  this.showSexDialog();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    性别
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {
                                    this.props.genderCode&&this.props.genderCode!=''?
                                        <Text style={{color:'#444',fontSize:15}}>
                                            {this.props.genderCode}
                                        </Text>:
                                        <Text style={{color:'#777',fontSize:15}}>
                                            未设置
                                        </Text>
                                }
                            </View>
                        </TouchableOpacity>


                        {/*年龄*/}
                        <View style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}

                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    年龄
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


                        {/*微信号*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,}}
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


                    </View>

                    <View style={{flexDirection:'row',padding:10,paddingHorizontal:18}}>
                        <Text style={{color:'#444',fontSize:13,fontWeight:'bold'}}>验证</Text>
                    </View>

                    <View style={{backgroundColor:'#fff',padding:10}}>
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

                    {/*年龄*/}
                    <PopupDialog
                        ref={(popupDialog) => {
                        this.AgeDialog = popupDialog;
                    }}
                        dialogAnimation={scaleAnimation}
                        actions={[]}
                        width={0.8}
                        height={0.3}
                    >

                        <AgeModal
                            val={this.props.age}
                            onClose={()=>{
                                this.AgeDialog.dismiss();
                            }}
                            onConfirm={(val)=>{
                                if(val!=this.props.age)
                                {
                                    this.props.dispatch(updateWeChat(val)).then((json)=>{
                                        if(json.re==1)
                                        {
                                            this.props.dispatch(onWeChatUpdate(val))
                                        }
                                        this.AgeDialog.dismiss();
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



                </Toolbar>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eee'
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

    }

    if(trainerInfo)
        props.sportLevel=trainerInfo.sportLevel
    return props
}

export default connect(mapStateToProps)(MyInformation);


