/**
 * Created by youli on 2017/9/13.
 */
/**
 * Created by dingyiming on 2017/8/1.
 */
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
    InteractionManager,
    Button
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
var {height, width} = Dimensions.get('window');
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper';
import{
    fetchPayment,
    onPaymentUpdate,
} from '../../action/MyProfitActions';

import {
    getAccessToken,
} from '../../action/UserActions';

import CoachDetail from '../course/CoachDetail'
import {PricingCard} from 'react-native-elements'
import {fetchCoursesByCreatorId, onCoursesOfCoachUpdate} from "../../action/CourseActions";
import CompetitionSignUp from "../competition/CompetitionSignUp";
import DetailProfit from './DetailProfit';

class Myprofit extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
    show(){
        alert("asd")
    }
    navigateDetailProfit()
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'DetailProfit',
                component: DetailProfit,
                params: {
                    payments:this.state.payments,
                }
            })
        }
    }
    _data=[{payername:'张三',paynum:'10',paytime:'2017-1-9 10:00',paymethod:'微信',paytype:'群活动'},
        {payername:'李思',paynum:'25',paytime:'2017-3-23 23:33',paymethod:'手机',paytype:'购物'},
        {payername:'王武',paynum:'90',paytime:'2017-4-13 12:34',paymethod:'手机',paytype:'群活动'},
        {payername:'赵奎',paynum:'80',paytime:'2017-1-1 12:56',paymethod:'微信',paytype:'群活动'}
    ]
    constructor(props) {
        super(props);
        this.state={
            totals:0,
            payments:0,
            courses:0
        };
    }


    render()
    {

        return (
            <View style={styles.container}>

                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',
                    backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{justifyContent:'center',alignItems: 'center',marginLeft:20}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{marginLeft:90,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>我的收益</Text>
                    </View>
                    {/*<TouchableOpacity style={{justifyContent:'center',alignItems: 'center',marginLeft:70}}*/}
                                      {/*onPress={()=>{this.setState({huizongstate:true})}}>*/}
                        {/*<Text style={{color:'#fff',fontSize:18}}>汇总</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={{justifyContent:'center',alignItems: 'center',marginLeft:20}}*/}
                                      {/*onPress={()=>{this.setState({huizongstate:false})}}>*/}
                        {/*<Text style={{color:'#fff',fontSize:18}}>详细</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <ScrollView>
                    <PricingCard
                        color='#4f9deb'
                        title='总收益'
                        price={this.state.total+'元'}
                        info={['100条账单']}
                        onButtonPress={this.goBack.bind(this)}
                        button={{ title: '查看详细收益', icon: 'flight-takeoff'}}
                    />
                    <PricingCard
                        color='#4f9deb'
                        title='课程'
                        price={this.state.total*0.4+'元'}
                        info={['100条账单']}
                        onButtonPress={this.navigateDetailProfit.bind(this)}
                        button={{ title: '查看课程详细收益', icon: 'flight-takeoff'}}
                    />
                    <PricingCard
                        color='#4f9deb'
                        title='群活动'
                        price={this.state.total*0.6+'元'}
                        info={['100条账单']}
                        onButtonPress={this.show.bind(this)}
                        button={{ title: '查看群活动详细收益', icon: 'flight-takeoff'}}
                    />
                </ScrollView>

            </View>
        )

    }

componentDidMount(){

    this.props.dispatch(fetchPayment(this.props.clubId)).then((json)=>{
        if(json.re==1)
        {
            var total=0;
            var payments=json.data;
            this.setState({payments:payments});
            payments.map((payment,i)=>{
                if(payment.payment!==null){
                    total+=payment.payment;
                }

            })
            this.setState({total:total});
        }else{
            if(json.re==-100){
                this.props.dispatch(getAccessToken(false));
            }
        }
    })
}

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});

module.exports = connect(state=>({

        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        clubId:state.user.personInfoAuxiliary.clubId,
        coaches:state.coach.coaches,
        total:state.myprofit.total,
        qunhuodong:state.myprofit.qunhuodong,
        total1:state.myprofit.total1,
        huaxiao:state.myprofit.huaxiao,
        total2:state.myprofit.total2,
        tel1:state.myprofit.tel1,
        tel2:state.myprofit.tel2,
        wx1:state.myprofit.wx1,
        wx2:state.myprofit.wx2,
    })
)(Myprofit);