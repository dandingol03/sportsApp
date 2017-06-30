
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
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'
import PopupDialog,{ScaleAnimation,DefaultAnimation,SlideAnimation} from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });

var {height, width} = Dimensions.get('window');
import TextInputWrapper from 'react-native-text-input-wrapper';

import UsernameModal from './modal/UsernameModal';
import PerNameModal from './modal/PerNameModal';
import MobilePhoneModal from './modal/MobilePhoneModal';
import WxModal from './modal/WxModal';
import IdCardModal from './modal/IdCardModal';

import{
    updateUsername,
    onUsernameUpdate,
    updatePerName,
    onPerNameUpdate,
    updateWeChat,
    onWeChatUpdate,
    updatePerIdCard,
    onPerIdCardUpdate
} from '../../action/UserActions';

class MyInformation extends Component{
    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
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

    showIdCardDialog()
    {
        this.idCardDialog.show()
    }

    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,

        };
    }

    render(){

        return (
            <View style={styles.container}>
                <Toolbar width={width} title="我的资料" actions={[]} navigator={this.props.navigator}>

                    <View style={{flexDirection:'row',padding:10,paddingHorizontal:20}}>
                        <Text style={{color:'#444',fontSize:13}}>帐号</Text>
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
                        <Text style={{color:'#444',fontSize:13}}>验证</Text>
                    </View>

                    <View style={{backgroundColor:'#fff',padding:10}}>
                        {/*手机号*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                          onPress={()=>{
                                                  this.showMobilePhoneDialog();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    手机号
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={{color:'#777',fontSize:15}}>
                                    未设置
                                </Text>

                            </View>
                        </TouchableOpacity>

                        {/*身份证*/}
                        <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10}}
                                          onPress={()=>{
                                                  this.showIdCardDialog();
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontWeight:'bold',fontSize:15}}>
                                    身份证
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
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
                    </View>


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
                        width={0.8}
                        height={0.3}
                    >

                        <MobilePhoneModal
                            onClose={()=>{
                                this.mobilePhoneDialog.dismiss();
                            }}
                            onConfirm={(val)=>{

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
    const props = {
        username:state.user.user.username,
        perName:personInfo.perName,
        wechat:personInfo.wechat,
        perIdCard:personInfo.perIdCard
    }
    return props
}

export default connect(mapStateToProps)(MyInformation);


