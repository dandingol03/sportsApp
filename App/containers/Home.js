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
    InteractionManager
} from 'react-native';

import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewPager from 'react-native-viewpager';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Coach from '../components/Coach';
import BadmintonCourse from '../components/course/BadmintonCourse';
import Mall from './mall/FirstPage';
import Activity from '../components/groupActivity/Activity';
import NewsContentDetail from '../components/news/NewsContentDetail';
import DateFilter from '../utils/DateFilter';
import CreateBadmintonCourse from '../components/course/CreateBadmintonCourse';

import PopupDialog,{ScaleAnimation,DefaultAnimation,SlideAnimation} from 'react-native-popup-dialog';
const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });

import MobilePhoneModal from '../components/my/modal/ValidateMobilePhoneModal';
import ValidateMyInformationModal from '../components/my/modal/ValidateMyInformationModal';

import {
    fetchNewsTheme,
    updateNewsTheme,
    getNewsContentUrl
} from '../action/NewsActions';

import {
    updateMobilePhone,
    onMobilePhoneUpdate,
    verifyMobilePhone
} from '../action/UserActions';

var IMGS = [
    require('../../img/banner1.jpeg'),
    require('../../img/banner2.jpeg'),
    require('../../img/banner3.jpeg'),
    require('../../img/banner4.jpeg'),
];

class Home extends Component {

    navigate2NewsContentDetail(url){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'NewsContentDetail',
                component: NewsContentDetail,
                params: {
                    url
                }
            })
        }
    }

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

    navigate2Coach()
    {
        const {navigator} =this.props;
        if(navigator) {
            navigator.push({
                name: 'Coach',
                component: Coach,
                params: {

                }
            })
        }
    }

    //导航至定制（for 用户）
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

    _renderPage(data, pageID) {
        return (

            <View style={{width:width}}>
                <Image
                    source={data}
                    style={{width:width,flex:3}}
                    resizeMode={"stretch"}
                />
            </View>

        );
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

    renderRow(rowData,sectionId,rowId){
        return(
            <TouchableOpacity style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#ddd',marginTop:4}}
                onPress={()=>{
                    this.props.dispatch(getNewsContentUrl(rowData.themeId)).then((json)=>{
                        if(json.re==1)
                        {
                            var url=json.data
                            this.navigate2NewsContentDetail(url)
                        }
                    })
                }}
            >

                <View style={{flexDirection:'column',width:70,justifyContent:'center',alignItems:'center'}}>
                    <Image  resizeMode="stretch" style={{width:65,height:65}}
                        source={{uri: rowData.themeImg}}
                    />
                </View>

                <View style={{flex:1,flexDirection:'column',alignItems:'flex-start'}}>
                    <View style={{padding:4,paddingHorizontal:12}}>

                        <Text style={{color:'#222',fontWeight:'bold',fontSize:14}}>
                            {rowData.title}
                        </Text>
                    </View>


                    <View style={{paddingTop:12,paddingBottom:4,paddingHorizontal:12,flexDirection:'row',alignItems:'center'}}>
                        <View style={{backgroundColor:'#66CDAA',borderRadius:6,padding:4,paddingHorizontal:6,marginLeft:10}}>
                            <Text style={{color:'#fff',fontSize:12}}>
                                { DateFilter.filter(rowData.createTime,'yyyy-mm-dd hh:mm')}
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


        if(this.props.modalVisible==true&&this.mobilePhoneDialog&&this.validateMyInformationDialog)
        {
            if(this.props.userType==0)//用户
            {
                this.mobilePhoneDialog.show()
            }else{
                //教练
                this.validateMyInformationDialog.show()
            }
        }

        var newsList=null
        if(this.props.news&&this.props.news.length>0)
        {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            newsList=(
                <ScrollView
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
            <View style={styles.container}>

                <ParallaxScrollView
                    backgroundColor="#fff"
                    contentBackgroundColor="#fff"
                    backgroundSpeed={10}
                    parallaxHeaderHeight={height}
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={{height:55,width:width,paddingTop:20,flexDirection:'row',
                                alignItems: 'center',backgroundColor:'#66CDAA'}}>

                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                <Text style={{color:'#fff',fontSize:18}}>SportsHot</Text>
                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',paddingRight:20}}>

                            </View>


                        </View>
                    )}

                    renderFixedHeader={() => (
                        <View key="sticky-header" style={{height:55,width:width,paddingTop:20,flexDirection:'row',
                            justifyContent:'center',alignItems: 'center',backgroundColor:'transparent'}}>

                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                            </View>

                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                <Text style={{color:'#fff',fontSize:18}}>羽毛球热</Text>
                            </View>
                            <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'flex-end',paddingRight:20,
                                alignItems: 'center',}}
                                onPress={()=>{
                                    alert('hi')
                                }}>
                                <Ionicons name='md-more' size={26} color="#fff"/>
                            </TouchableOpacity>
                        </View>
                    )}

                    renderForeground={() => (
                         <View style={{flex:1}}>

                            <View style={{width:width,flex:2}}>
                                <ViewPager
                                    style={this.props.style}
                                    dataSource={this.state.dataSource}
                                    renderPage={this._renderPage}
                                    isLoop={true}
                                    autoPlay={true}
                                />
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
                                        <CommIcon name="tag-plus" size={32} color="#0adc5e" style={{backgroundColor:'transparent'}}/>
                                        <View style={{marginTop:0,paddingTop:6}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>课程制定</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:5}}
                                      onPress={ ()=>{
                                        this.navigate2Activity();
                                      }}>
                                        <Icon name="group" size={30} color="#66CDAA" />
                                        <View style={{marginTop:0,paddingTop:10}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>群活动</Text>
                                        </View>
                                    </TouchableOpacity>

                                     <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:5}}
                                      onPress={ ()=>{
                                         this.navigate2Market(vegetable);
                                         console.log('找教练');
                                       }}>
                                        <Icon name="video-camera" size={30} color="#8968CD" />
                                        <View style={{marginTop:0,paddingTop:10}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>直播间</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:5}}
                                      onPress={ ()=>{
                                          this.navigate2Mall();
                                      }}>

                                        <Icon name="shopping-cart" size={36} color="#EEAD0E" style={{backgroundColor:'transparent'}}/>
                                        <View style={{marginTop:0,paddingTop:6}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>商城</Text>
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
                    )}
                >

                </ParallaxScrollView>

            </View>
        );
    }

    componentDidMount()
    {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(fetchNewsTheme()).then((json)=>{
                if(json.re==1)
                {

                    this.props.dispatch(updateNewsTheme(json.data))
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

    var personInfo=state.user.personInfo
    var mobilePhone=personInfo.mobilePhone

    const props = {
        news:state.newsTheme.news,
        mobilePhone:mobilePhone,
        userType:parseInt(state.user.userType)
    }
    if(mobilePhone&&mobilePhone!='')
        props.modalVisible=false
    else
        props.modalVisible=true

    return props
}

export default connect(mapStateToProps)(Home);
