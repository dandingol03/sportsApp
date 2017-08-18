import React, {Component} from 'react';
import {
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
    Easing,
    Alert,
    InteractionManager,
    Linking
} from 'react-native';

import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');

import ViewPager from 'react-native-viewpager';

import BadmintonCourse from '../components/course/BadmintonCourse';
import Mall from './mall/FirstPage';
import Activity from '../components/groupActivity/Activity';
import Competition from '../components/competition/CompetitionList';

import PopupDialog,{ScaleAnimation} from 'react-native-popup-dialog';
const scaleAnimation = new ScaleAnimation();

import MobilePhoneModal from '../components/my/modal/ValidateMobilePhoneModal';
import ValidateMyInformationModal from '../components/my/modal/ValidateMyInformationModal';

import {
    fetchNewsInfo,
    updateNewsInfo
} from '../action/NewsActions';

import {
    updateMobilePhone,
    onMobilePhoneUpdate,
    verifyMobilePhone,
    getAccessToken
} from '../action/UserActions';

import {
   fetchCompetition,
} from '../action/CompetationActions';

var IMGS = [
    require('../../img/tt1@2x.png'),
    require('../../img/tt2@2x.jpeg'),
    require('../../img/tt3@2x.jpeg'),
    require('../../img/tt4@2x.jpeg'),
];

class Home extends Component {

    navigate2Activity(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'activity',
                component: Activity,
                params: {

                }
            })
        }
    }

    navigate2Competition(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'competition',
                component: Competition,
                params: {

                }
            })
        }
    }




    navigate2Mall(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'mall',
                component: Mall,
                params: {

                }
            })
        }
    }

    //课程定制
    navigate2BadmintonCourse()
    {
        const {navigator} =this.props;
        if(navigator) {
            navigator.push({
                name: 'BadmintonCourse',
                component: BadmintonCourse,
                params: {

                }
            })
        }
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

    dateFormat(date)
    {
        //object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    }

    renderRow(rowData,sectionId,rowId){
        return(
            <TouchableOpacity style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#ddd',marginTop:4,padding:5}}
                onPress={()=>{
                    {/*this.props.dispatch(getNewsContentUrl(rowData.themeId)).then((json)=>{*/}
                        {/*if(json.re==1)*/}
                        {/*{*/}
                            {/*var url=json.data*/}
                            {/*this.navigate2NewsContentDetail(url)*/}
                        {/*}*/}
                    {/*})*/}

                    Linking.openURL("http://114.215.99.2:8880/news/"+rowData.newsNum+"/index.html").catch(err => console.error('An error occurred', err));

                }}
            >

                <View style={{flexDirection:'column',width:70,justifyContent:'center',alignItems:'center'}}>
                    <Image  resizeMode="stretch" style={{width:65,height:65}}
                        source={{uri: rowData.img}}
                    />

                </View>

                <View style={{flex:1,flexDirection:'column',alignItems:'flex-start'}}>
                    <View style={{padding:4,paddingHorizontal:12}}>
                        <Text style={{color:'#646464',fontWeight:'bold',fontSize:15}}>
                            {rowData.title}
                        </Text>
                    </View>

                    <View style={{padding:4,paddingHorizontal:12}}>
                        <Text style={{color:'#646464',fontSize:13}}>
                            {rowData.brief}
                        </Text>
                    </View>

                    <View style={{paddingTop:12,paddingBottom:4,paddingHorizontal:12,flexDirection:'row',alignItems:'center'}}>
                        <View style={{padding:4,paddingHorizontal:6,}}>
                            <Text style={{color:'#323232',fontSize:13}}>
                                阅读：{rowData.readCount}
                            </Text>
                        </View>

                        <View style={{padding:4,paddingHorizontal:6,}}>
                            <Text style={{color:'#323232',fontSize:13}}>
                                {this.dateFormat(rowData.createTime)}
                            </Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>)
    }

    constructor(props) {
        super(props);
        var ds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});
        this.state = {
            dataSource: ds.cloneWithPages(IMGS),
            isRefreshing:false,
        }
    }


    render() {

        //针对教练,需要完成手机号，运动水平、真实姓名、身份证的验证
        if(this.props.userType==1){
            if(this.props.mobilePhoneValidateFailed==true&&this.mobilePhoneDialog&&this.validateMyInformationDialog)
            {
                this.validateMyInformationDialog.show()
            }
            else if((this.props.sportLevelValidateFailed==true||this.props.perNameValidateFailed==true||this.props.perIdCardValidateFailed==true)&&
                this.validateMyInformationDialog)
            {
                this.validateMyInformationDialog.show()
            }
        }

        //针对用户,需要完成手机号的验证
        if(this.props.userType==0){
            if(this.props.mobilePhoneValidateFailed==true&&this.mobilePhoneDialog&&this.validateMyInformationDialog)
            {
                this.mobilePhoneDialog.show()
            }
        }

        var newsList=null
        if(this.props.news&&this.props.news.length>0)
        {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            newsList=(
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="拉取球讯..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                    onScrollEndDrag={(event)=>{
                       var offsetY=event.nativeEvent.contentOffset.y
                       var limitY=event.nativeEvent.layoutMeasurement.height
                       console.log(offsetY+' , '+limitY)
                    }}
                >
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(this.props.news)}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>
            );
        }

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>

                    <View style={{flex:1}}>

                        <View style={{width:width,flex:2}}>
                            <Image
                                source={ require('../../img/tt1@2x.png')}
                                style={{width:width,flex:3}}
                                resizeMode={"stretch"}
                            >
                            <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'transparent',borderBottomWidth:1,borderColor:'transparent',}}>
                                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>

                                </TouchableOpacity>
                                <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                                    <Text style={{color:'#fff',fontSize:18}}>羽毛球热</Text>
                                </View>
                                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                                  onPress={()=>{ _scrollView.scrollToEnd({animated: true});}}>

                                    {/*<Text> 底部</Text>*/}
                                </TouchableOpacity>
                            </View>

                            </Image>
                        </View>

                        {/*内容区*/}
                        <View style={{flex:5,justifyContent:'center',backgroundColor:'#eee'}}>

                            <View style={{flex:2,backgroundColor:'#fff',padding:0,marginBottom:10}}>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>

                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                                      onPress={ ()=>{
                                             this.navigate2BadmintonCourse();
                                             //this.navigate2BadmintonCourseForCoach();

                                          }}>
                                        {/*<CommIcon name="tag-plus" size={32} color="#0adc5e" style={{backgroundColor:'transparent'}}/>*/}
                                        <Image resizeMode="stretch" source={require('../../img/dingzhi@2x.png')} />
                                        <View style={{marginTop:0,paddingTop:15}}>
                                            <Text style={{fontSize:13,color:'#646464'}}>课程制定</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:5}}
                                                      onPress={ ()=>{
                                        this.navigate2Activity();
                                      }}>
                                        {/*<Icon name="group" size={30} color="#66CDAA" />*/}
                                        <Image resizeMode="stretch" source={require('../../img/dd@2x.png')} />
                                        <View style={{marginTop:0,paddingTop:15}}>
                                            <Text style={{fontSize:13,color:'#646464'}}>群活动</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:5}}
                                                      onPress={ ()=>{
                                          this.navigate2Competition();
                                      }}>

                                        {/*<Icon name="shopping-cart" size={36} color="#EEAD0E" style={{backgroundColor:'transparent'}}/>*/}
                                        <Image resizeMode="stretch" source={require('../../img/shangc-@2x.png')} />
                                        <View style={{marginTop:0,paddingTop:15}}>
                                            <Text style={{fontSize:13,color:'#646464'}}>比赛</Text>
                                        </View>
                                    </TouchableOpacity>


                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:5}}
                                                      onPress={ ()=>{
                                         //this.navigate2Market(vegetable);
                                         alert('暂未开通');
                                         console.log('找教练');
                                       }}>
                                        {/*<Icon name="video-camera" size={30} color="#8968CD" />*/}
                                        <Image resizeMode="stretch" source={require('../../img/zhibo-@2x.png')} />
                                        <View style={{marginTop:0,paddingTop:15}}>
                                            <Text style={{fontSize:13,color:'#646464'}}>直播间</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:5}}
                                                      onPress={ ()=>{
                                          this.navigate2Mall();
                                      }}>

                                        {/*<Icon name="shopping-cart" size={36} color="#EEAD0E" style={{backgroundColor:'transparent'}}/>*/}
                                        <Image resizeMode="stretch" source={require('../../img/shangc-@2x.png')} />
                                        <View style={{marginTop:0,paddingTop:15}}>
                                            <Text style={{fontSize:13,color:'#646464'}}>商城</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                            </View>


                            <View style={{flex:5,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',marginBottom:10}}>
                                {newsList}
                            </View>

                        </View>


                        <PopupDialog
                            ref={(popupDialog) => {
                                    this.mobilePhoneDialog = popupDialog;
                                }}
                            dialogAnimation={scaleAnimation}
                            dismissOnTouchOutside={false}
                            actions={[]}
                            width={0.8}
                            height={0.4}
                        >

                            <MobilePhoneModal
                                val={this.props.mobilePhone}
                                onVerify={(data)=>{
                                            this.props.dispatch(verifyMobilePhone(data)).then((json)=>{
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
                                            if(this.state.verifyCode==verifyCode)
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
                                            }

                                        }}
                            />

                        </PopupDialog>


                        <PopupDialog
                            ref={(popupDialog) => {
                                    this.validateMyInformationDialog = popupDialog;
                                }}
                            dialogAnimation={scaleAnimation}
                            dismissOnTouchOutside={false}
                            actions={[]}
                            width={0.8}
                            height={0.2}
                        >

                            <ValidateMyInformationModal
                                val=''

                                onClose={()=>{
                                        }}
                                onConfirm={(data)=>{

                                        }}
                            />

                        </PopupDialog>



                    </View>

            </View>
        );
    }

    componentDidMount()
    {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(fetchNewsInfo()).then((json)=>{
                if(json.re==1)
                {
                    this.props.dispatch(updateNewsInfo(json.data));
                    // this.props.dispatch(fetchGames()).then((json)=>{
                    //     if(json.re==1){
                    //         this.state.games = json.data;
                    //     }
                    //
                    //
                    // });

                }else{
                    if(json.re==-100){
                        this.props.dispatch(getAccessToken(false));
                    }
                }
            })
        });

    }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});

const mapStateToProps = (state, ownProps) => {

    var personInfo=state.user.personInfo;
    var mobilePhone=personInfo.mobilePhone;

    var personInfoAuxiliary = state.user.personInfoAuxiliary;
    var checkedMobile = personInfoAuxiliary.checkedMobile;

    var trainerInfo=state.user.trainer

    const props = {
        news:state.newsTheme.news,
        mobilePhone:mobilePhone,
        userType:parseInt(state.user.usertype),
        perName:personInfo.perName,
        perIdCard:personInfo.perIdCard,

    }

    if(trainerInfo)
    {
        props.sportLevelValidateFailed=(!(trainerInfo.sportLevel!==undefined&&trainerInfo.sportLevel!==null))//运动水平没验证
        props.perNameValidateFailed=(!(personInfo.perName&&personInfo.perName!=''))//真实姓名没验证
        props.perIdCardValidateFailed=(!(personInfo.perIdCard&&personInfo.perIdCard!=''))//身份证没验证
    }

    //手机号没验证
    if(mobilePhone&&mobilePhone!=''&&checkedMobile==true)
        props.mobilePhoneValidateFailed=false
    else
        props.mobilePhoneValidateFailed=true

    return props
}

export default connect(mapStateToProps)(Home);
