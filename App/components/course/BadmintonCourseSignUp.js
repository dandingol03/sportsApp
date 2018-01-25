

import React, { Component } from 'react';
import {
    Alert,
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
    InteractionManager
} from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CoursePay from './CoursePay';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import PopupDialog,{ScaleAnimation,DefaultAnimation,SlideAnimation} from 'react-native-popup-dialog';
const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });

import AddRelativeModal from './AddRelativeModal';
import TextInputWrapper from 'react-native-text-input-wrapper';

var { height, width } = Dimensions.get('window');

import{
    fetchPersonRelative,
    addBadmintonClassMermberInfo,
    checkPersonIsMember

} from '../../action/CourseActions';
import {getAccessToken,wechatPay2} from '../../action/UserActions';

import{
    onRelativePersonsUpdate,
    addRelativePerson
} from '../../action/UserActions';

class BadmintonCourseSignUp extends Component {

    goBack() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            event: {},
            relative:props.relative,
            isSelfCheck:true,
            num:1 , //代表课程的数量
            total:150.0,
            pay:{payment:'',payType:'1'},
        };
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState(nextProps)
    }

    navigate2BadmintonCoursePay() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'CoursePay',
                component: CoursePay,
                params: {
                   total:this.state.total
                }
            })
        }
    }

    wechatPay(pay,courseId){

        this.props.dispatch(wechatPay2(pay,courseId)).then((json)=>{
            if(json.re==1){
                if(pay.payType=='1'){
                    var prepayId = json.data.prepayid;
                    var sign = json.data.sign;
                    var timeStamp = json.data.timestamp;
                    var noncestr = json.data.noncestr;
                    var wechatPayData=
                        {
                            partnerId: '1485755962',  // 商家向财付通申请的商家id
                            prepayId: prepayId,   // 预支付订单
                            nonceStr: noncestr,   // 随机串，防重发
                            timeStamp: timeStamp,  // 时间戳，防重发
                            package: 'Sign=WXPay',    // 商家根据财付通文档填写的数据和签名
                            sign: sign // 商家根据微信开放平台文档对数据做的签名
                        };

                    WeChat.pay(wechatPayData).then(
                        (result)=>{
                            console.log(result);
                            Alert.alert('信息','支付成功',[{text:'确认',onPress:()=>{
                                this.goBack();
                            }}]);


                        },
                        (error)=>{
                            console.log(error);
                        }
                    )
                }
                else{
                    Alert.alert('信息','支付成功',[{text:'确认',onPress:()=>{
                        this.goBack();
                    }}]);
                }


            }else{
                if(json.re==-100){
                    this.props.dispatch(getAccessToken(false));
                }
            }

        })
    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }

    render() {

        var {classInfo,username}=this.props
        var {relative}=this.state

        var persons=[]
        persons.push(
            <TouchableOpacity key={-1} style={{flexDirection:'row',padding:4,paddingHorizontal:10,marginTop:4}}
                              onPress={()=>{
                                  if(this.state.isSelfCheck==true)
                                      this.setState({isSelfCheck:false})
                                  else
                                      this.setState({isSelfCheck:true})
                    }}>

                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                    <Text>{username}</Text>
                </View>
                <View style={{flex:1}}></View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10,width:70}}>
                    {
                        this.state.isSelfCheck==true?
                            <Icon name={'check-square-o'} size={20} color="#666"/>:
                            <Icon name={'square-o'} size={20} color="#666"/>
                    }
                </View>
            </TouchableOpacity>
        )
        if(relative&&relative.length>0)
        {
            relative.map((person,i)=>{
                persons.push(
                    <TouchableOpacity key={i} style={{flexDirection:'row',padding:4,paddingHorizontal:10,marginTop:4}}
                                      onPress={()=>{
                         var _relative=_.cloneDeep(relative)
                         _relative.map((_person,j)=>{
                             if(_person.personId==person.personId)
                             {
                                 if(_person.checked==true)
                                     _person.checked=false
                                 else
                                     _person.checked=true
                             }
                         })
                         this.setState({relative:_relative})
                    }}
                    >

                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                            <Text>{person.usename}</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10,width:70}}>
                            {
                                person.checked==true?
                                    <Icon name={'check-square-o'} size={20} color="#666"/>:
                                    <Icon name={'square-o'} size={20} cogit lor="#666"/>
                            }
                        </View>
                    </TouchableOpacity>
                )
            })
        }

        return(

            <View style={styles.container}>
                <View style={{height:70,width:width,paddingTop:30,flexDirection:'row',justifyContent:'center',
                    backgroundColor:'#66CDAA'}}>
                    <TouchableOpacity style={{width:60,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Ionicons name={'md-arrow-back'} size={25} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                        <Text style={{color:'#fff',fontSize:18}}>课程详情</Text>
                    </View>
                    <TouchableOpacity ref="menu"  style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{
                      }}
                    >

                    </TouchableOpacity>
                </View>


                <View style={{justifyContent:'center',padding:5}}>

                    <View style={{width:width-8,padding:4,backgroundColor:'#fff',flexDirection:'column',
                                    paddingBottom:7,borderWidth:1,borderColor:'#eee'}}
                                      onPress={()=>{

                                }}
                    >
                        <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,alignItems:'center'}}>
                            <Text style={{fontSize:16,color:'#222',fontWeight:'bold'}}>
                                {classInfo.courseName}
                            </Text>



                            <View style={{flex:1}}></View>
                            <Text style={{fontSize:13,color:'#008B00',fontWeight:'bold'}}>
                                {classInfo.unitName}
                            </Text>

                        </View>


                        {/*{schedules}*/}

                        <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,alignItems:'center',marginTop:10}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name={'users'} size={15} color="#666"/>
                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',marginLeft:9}}>
                                <Text style={{color:'#222',fontSize:13}}>最大人数{classInfo.maxNumber}</Text>
                            </View>

                        </View>

                        <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,alignItems:'center',marginTop:10}}>
                            <View style={{flexDirection:'row',alignItems:'center',marginLeft:3}}>
                                <Icon name={'user'} size={15} color="#666"/>
                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',marginLeft:12}}>
                                <Text style={{color:'#222',fontSize:13}}>已报名人数{classInfo.signNumber}</Text>
                            </View>


                        </View>


                        <View style={{flexDirection:'row',padding:2,paddingHorizontal:10,alignItems:'center',justifyContent:'flex-end'}}>

                            <View style={{padding:4,marginLeft:10,flexDirection:'row',alignItems:'center',marginRight:5}}>
                                <CommIcon name="account-check" size={24} color="#0adc5e" style={{backgroundColor:'transparent',}}/>
                                <Text style={{ color: '#444', fontWeight: 'bold', fontSize: 13,paddingTop:-2 }}>
                                    {classInfo.creatorName}
                                </Text>
                            </View>

                            <View style={{backgroundColor:'#f00',borderRadius:3,padding:4,marginLeft:5}}>
                                <Text style={{color:'#fff',fontSize:13}}>
                                    ￥{classInfo.cost}
                                </Text>
                            </View>
                        </View>

                    </View>


                    <View style={{flexDirection:'column',marginTop:20,borderWidth:2,borderColor:'#00BCD4',
                        borderTopLeftRadius:4,borderTopRightRadius:4}}>
                        <View style={{flexDirection:'row',padding:10,alignItems:'center',
                            backgroundColor:'#00BCD4'}}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontWeight:'bold',fontSize:16}}>关联人</Text>
                            </View>
                            <View style={{flex:1}}></View>
                            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#66CDAA',
                                    padding:6,paddingHorizontal:8,borderRadius:13,marginRight:5}}
                                onPress={()=>{
                                    this.showScaleAnimationDialog()
                                }}
                            >
                                <Icon name={'plus'} size={15} color="#fff"/>
                            </TouchableOpacity>
                        </View>


                        <View style={{flexDirection:'row',padding:4,paddingHorizontal:10,marginTop:4}}>

                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>用户名</Text>
                            </View>

                            <View style={{flex:1}}>

                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10,width:70}}>
                                <Text style={{color:'#00BCD4',fontWeight:'bold'}}>
                                    勾选
                                </Text>
                            </View>

                        </View>

                        {persons}

                    </View>




                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10}}>

                    { classInfo.costType=="2"?
                          <View style={{flex:1}}>
                                <View style={{
                                    height: 30,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    margin: 5,

                                    }}>

                                    <View style={{flex: 2}}>
                                        <Text>购买数量：</Text>
                                    </View>


                                 <TouchableOpacity style={{padding:10,paddingHorizontal:12,backgroundColor:'#eee',width:10,
                                        justifyContent:'center',flexDirection:'row',flex:0.5}}
                                                      onPress={()=>{
                                                          var num= parseInt(this.state.num);
                                                          if(num>0)
                                                          {
                                                              num=num-1+'';
                                                              var total=classInfo.cost*this.state.num;
                                                              this.setState({total:total});
                                                          }
                                                          else{
                                                              num=0+''
                                                          }
                                                         this.setState({num:num});
                                                      }}
                                    >
                                     <Text style={{color:'#fff',width:10,fontWeight:'bold'}}>-</Text>
                                    </TouchableOpacity>


                                    <View style={{
                                        flex: 1.5,
                                        padding:10,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#F5F5F5',
                                        width:10

                                    }}>
                                        <TextInputWrapper
                                            textInputStyle={{marginLeft: 5, fontSize: 13, color: '#000'}}
                                            editable = {true}
                                            val={this.state.num}
                                            placeholder='1'
                                            placeholderTextColor= '#000'
                                            onChangeText={
                                                (value) => {
                                                    this.setState({num:value})
                                                }}
                                        />
                                    </View>

                                    {<TouchableOpacity style={{padding:10,paddingHorizontal:12,backgroundColor:'#eee',width:10,
                                        justifyContent:'center',flexDirection:'row',flex:0.5,marginRight:40}}
                                                      onPress={()=>{
                                                         var num= parseInt(this.state.num);
                                                          num=num+1;
                                                          this.setState({num:num+''});
                                                          var total=classInfo.cost*this.state.num;
                                                          this.setState({total:total});
                                                      }}
                                    >
                                        <Text style={{color:'#fff',width:10,fontWeight:'bold'}}>+</Text>
                                    </TouchableOpacity>
                                    }
                                    <View style={{marginRight:10}}>
                                    <Text style={{color:'#FF0000',width:50,fontWeight:'bold',flexDirection: 'row'}}> ￥{classInfo.cost*this.state.num}</Text>
                                    </View>
                                </View>

                                {/*  <view style={{flex:1}}>
                              <Text style={{color:'#fff',fontSize:13}}>
                                 总额： ￥
                              </Text>
                                  </view>*/}

                            </View>:null

                        }


                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20}}>
                    <TouchableOpacity style={{width:width/2,backgroundColor:'#00BCD4',padding:8,borderRadius:2,
                        flexDirection:'column',justifyContent:'center',alignItems: 'center'}}
                                      onPress={()=>{
                                          var {relative,isSelfCheck}=this.state
                                          var persons=[];
                                          if(relative&&relative.length>0)
                                          {
                                              relative.map((person,i)=>{
                                                  if(person.checked==true)
                                                      persons.push({personId:person.personId,username:person.username})
                                              })
                                          }

                                          //TODO:加入校验
                                          if(classInfo.signNumber+persons.length==classInfo.maxNumber){

                                              Alert.alert('信息','人数已满，请选择其他课程',[{text:'确认',onPress:()=>{
                                                  console.log();
                                              }}]);

                                          }else{
                                              var info = {
                                                  isSelfCheck:isSelfCheck,
                                                  persons:persons,
                                                  classId:classInfo.courseId,
                                                  creatorId:classInfo.creatorId,
                                                  signNumber:classInfo.signNumber,
                                                  maxNumber:classInfo.maxNumber,
                                                  classCount:classInfo.costType==1?classInfo.classCount:this.state.num,
                                              };
                                              this.props.dispatch(addBadmintonClassMermberInfo(info)).then((json)=>{
                                                  if(json.re==1){
                                                      Alert.alert('信息','报名成功,',[{text:'确认',onPress:()=>{
                                                          /*this.goBack();
                                                          this.props.setMyCourseList();*/
                                                      }}]);
                                                      //this.navigate2BadmintonCoursePay();
                                                      var pay=this.state.pay;
                                                      pay.payType = '1';
                                                      pay.payment=this.state.total;
                                                      this.setState({pay:pay});
                                                      this.wechatPay(this.state.pay,classInfo.courseId);

                                                  }else if(json.re==-1){
                                                      Alert.alert('信息',json.data,[{text:'确认',onPress:()=>{
                                                          this.goBack();
                                                          this.props.setMyCourseList();
                                                      }}]);
                                                  }else if(json.re==-100){
                                                      this.props.dispatch(getAccessToken(false));
                                                  }
                                                  console.log();
                                              })

                                          }
                                      }}
                    >
                        <Text style={{color:'#fff',fontWeight:'bold'}}>报名</Text>
                    </TouchableOpacity>
                </View>
                </View>


                <PopupDialog
                    ref={(popupDialog) => {
                        this.scaleAnimationDialog = popupDialog;
                    }}
                    dialogAnimation={scaleAnimation}
                    actions={[

                    ]}
                >
                    <View style={{flex:1,padding:10}}>
                        <AddRelativeModal
                            onClose={()=>{
                                this.scaleAnimationDialog.dismiss();
                                // this.setState({modalVisible:false});
                            }}

                            onConfirm={(payload)=>{
                                this.props.dispatch(addRelativePerson(payload)).then((json)=>{
                                    if(json.re==1)
                                    {
                                         Alert.alert('信息','关联成功,新帐号密码为000000',[{text:'确认',onPress:()=>{
                                            this.props.dispatch(fetchPersonRelative()).then((json)=>{
                                               if(json.re==1)
                                               {
                                                   this.scaleAnimationDialog.dismiss();
                                                   this.props.dispatch(onRelativePersonsUpdate(json.data))
                                               }else{
                                                         if(json.re==-100){
                                                              this.props.dispatch(getAccessToken(false));
                                                         }
                                                     }
                                            })
                                         console.log()

                                         }}]);
                                    }else{
                                        if(json.re==2){
                                            Alert.alert('信息','该用户已存在，请登录报名',[{text:'确认',onPress:()=>{
                                                 console.log();
                                            }}]);
                                        }
                                    }

                                })
                            }}

                        />
                    </View>
                </PopupDialog>

            </View>
        )
    }

    componentDidMount()
    {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(fetchPersonRelative()).then((json)=>{
                if(json.re==1)
                {
                    this.props.dispatch(onRelativePersonsUpdate(json.data))
                }else{
                    if(json.re==-100){
                        this.props.dispatch(getAccessToken(false));
                    }
                }
            })
        });
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    popoverContent: {
        width: 100,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText: {
        color: '#ccc',
        fontSize: 14
    }
});



const mapStateToProps = (state, ownProps) => {

    const props = {
        userType: parseInt(state.user.usertype),
        relative:state.user.relative,
        username:state.user.user.username,
        personInfo:state.user.personInfo,
    }
    return props
}


export default connect(mapStateToProps)(BadmintonCourseSignUp);
