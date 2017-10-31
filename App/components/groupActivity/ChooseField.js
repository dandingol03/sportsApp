/**
 * Created by youli on 2017/10/26.
 */

import React, {Component} from 'react';
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
    BackAndroid,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import ActivityPay from './ActivityPay';
import DateFilter from '../../utils/DateFilter';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet';
import {
    fetchVenueUnitTimeList,signUpFieldTimeActivity
} from '../../action/ActivityActions';
import {Select,SelectTextBox,Option,OptionList} from 'react-native-multi-select';
var {height, width} = Dimensions.get('window');
class ChooseField extends Component {
    static propTypes = {};

    datas = [
        'Babolsar',
        'Sari',
        'Babol',
        'Qaemshahr',
        'Gorgan',
        'Tehran',
        'ali abad',
        'gonbad',
        'mashhad',
        'esfehan',
        'shiraz',
        'kerman',
        'ilam',
        'sanandaj',
        'mahshahr',
        'behshar',
        'tonekabon'
    ];

    state = {
        selectedItem: [],
        text: "",
        displayOptionList: false,
        field:[],
        event:[{field:null,
        }],
        fieldno1:null,
        fieldno2:null,
        fieldno3:null,
        fieldno4:null,
        fieldno5:null,
        fieldno6:null,
        fieldno7:null,
        fieldno8:null,
        fieldno9:null,
        fieldno10:null,
        unitId:null,
        placeYardStr:null,
        fieldtime11:null,
        fieldtime12:null,
        fieldtime13:null,
        fieldtime14:null,
        fieldtime15:null,
        fieldtime16:null,
        fieldtime17:null,
        fieldtime18:null,
        fieldtime19:null,

        fieldtime21:null,
        fieldtime22:null,
        fieldtime23:null,
        fieldtime24:null,
        fieldtime25:null,
        fieldtime26:null,
        fieldtime27:null,
        fieldtime28:null,
        fieldtime29:null,

        fieldtime31:null,
        fieldtime32:null,
        fieldtime33:null,
        fieldtime34:null,
        fieldtime35:null,
        fieldtime36:null,
        fieldtime37:null,
        fieldtime38:null,
        fieldtime39:null,

        fieldtime41:null,
        fieldtime42:null,
        fieldtime43:null,
        fieldtime44:null,
        fieldtime45:null,
        fieldtime46:null,
        fieldtime47:null,
        fieldtime48:null,
        fieldtime49:null,

        fieldtime51:null,
        fieldtime52:null,
        fieldtime53:null,
        fieldtime54:null,
        fieldtime55:null,
        fieldtime56:null,
        fieldtime57:null,
        fieldtime58:null,
        fieldtime59:null,

        fieldtime61:null,
        fieldtime62:null,
        fieldtime63:null,
        fieldtime64:null,
        fieldtime65:null,
        fieldtime66:null,
        fieldtime67:null,
        fieldtime68:null,
        fieldtime69:null,

        fieldtime71:null,
        fieldtime72:null,
        fieldtime73:null,
        fieldtime74:null,
        fieldtime75:null,
        fieldtime76:null,
        fieldtime77:null,
        fieldtime78:null,
        fieldtime79:null,

        fieldtime81:null,
        fieldtime82:null,
        fieldtime83:null,
        fieldtime84:null,
        fieldtime85:null,
        fieldtime86:null,
        fieldtime87:null,
        fieldtime88:null,
        fieldtime89:null,

        fieldtime91:null,
        fieldtime92:null,
        fieldtime93:null,
        fieldtime94:null,
        fieldtime95:null,
        fieldtime96:null,
        fieldtime97:null,
        fieldtime98:null,
        fieldtime99:null,

        startTime:null,
        endTime:null,

        startTimeView:null,
        endTimeView:null,

        fieldstart:null,
        fieldend:null,
        eventWeek:null

    };
    goBack() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }
    _handlePress(index) {
        if(index!==0){
            var field = this.state.field[index];
            this.setState({eventWeek:field});
        }

    }
    show(actionSheet) {
        this[actionSheet].show();
    }
    updateText = text => {
        this.setState({text});
    };

    addItem = item => {
        this.setState({selectedItem: [...this.state.selectedItem, item]})
    };

    removeItem = removedItem => {
        this.setState({
            selectedItem: this.state.selectedItem.filter(item => {
                if (item._id !== removedItem._id)
                    return item;
            })
        });
    };

    fetchData(){
        this.props.dispatch(fetchVenueUnitTimeList(this.props.activity.eventPlaceId,this.props.activity.placeYardStr)).then((json)=> {
            if(json.re==1){
                //this.setFieldTime();
                var fieldtime=json.data;
                fieldtime.map((fieldtime,i)=>{
                    if(fieldtime.unitNum==1){
                        this.setState({fieldtime11:fieldtime.timeInterval1});
                        this.setState({fieldtime12:fieldtime.timeInterval2});
                        this.setState({fieldtime13:fieldtime.timeInterval3});
                        this.setState({fieldtime14:fieldtime.timeInterval4});
                        this.setState({fieldtime15:fieldtime.timeInterval5});
                        this.setState({fieldtime16:fieldtime.timeInterval6});
                        this.setState({fieldtime17:fieldtime.timeInterval7});
                        this.setState({fieldtime18:fieldtime.timeInterval8});
                        this.setState({fieldtime19:fieldtime.timeInterval1});
                    }
                    if(fieldtime.unitNum==2){
                        this.setState({fieldtime21:fieldtime.timeInterval1});
                        this.setState({fieldtime22:fieldtime.timeInterval2});
                        this.setState({fieldtime23:fieldtime.timeInterval3});
                        this.setState({fieldtime24:fieldtime.timeInterval4});
                        this.setState({fieldtime25:fieldtime.timeInterval5});
                        this.setState({fieldtime26:fieldtime.timeInterval6});
                        this.setState({fieldtime27:fieldtime.timeInterval7});
                        this.setState({fieldtime28:fieldtime.timeInterval8});
                        this.setState({fieldtime29:fieldtime.timeInterval1});
                    }
                    if(fieldtime.unitNum==3){
                        this.setState({fieldtime31:fieldtime.timeInterval1});
                        this.setState({fieldtime32:fieldtime.timeInterval2});
                        this.setState({fieldtime33:fieldtime.timeInterval3});
                        this.setState({fieldtime34:fieldtime.timeInterval4});
                        this.setState({fieldtime35:fieldtime.timeInterval5});
                        this.setState({fieldtime36:fieldtime.timeInterval6});
                        this.setState({fieldtime37:fieldtime.timeInterval7});
                        this.setState({fieldtime38:fieldtime.timeInterval8});
                        this.setState({fieldtime39:fieldtime.timeInterval1});

                    }
                    if(fieldtime.unitNum==4){
                        this.setState({fieldtime41:fieldtime.timeInterval1});
                        this.setState({fieldtime42:fieldtime.timeInterval2});
                        this.setState({fieldtime43:fieldtime.timeInterval3});
                        this.setState({fieldtime44:fieldtime.timeInterval4});
                        this.setState({fieldtime45:fieldtime.timeInterval5});
                        this.setState({fieldtime46:fieldtime.timeInterval6});
                        this.setState({fieldtime47:fieldtime.timeInterval7});
                        this.setState({fieldtime48:fieldtime.timeInterval8});
                        this.setState({fieldtime49:fieldtime.timeInterval1});
                    }
                    if(fieldtime.unitNum==5){
                        this.setState({fieldtime51:fieldtime.timeInterval1});
                        this.setState({fieldtime52:fieldtime.timeInterval2});
                        this.setState({fieldtime53:fieldtime.timeInterval3});
                        this.setState({fieldtime54:fieldtime.timeInterval4});
                        this.setState({fieldtime55:fieldtime.timeInterval5});
                        this.setState({fieldtime56:fieldtime.timeInterval6});
                        this.setState({fieldtime57:fieldtime.timeInterval7});
                        this.setState({fieldtime58:fieldtime.timeInterval8});
                        this.setState({fieldtime59:fieldtime.timeInterval1});
                    }
                    if(fieldtime.unitNum==6){
                        this.setState({fieldtime61:fieldtime.timeInterval1});
                        this.setState({fieldtime62:fieldtime.timeInterval2});
                        this.setState({fieldtime63:fieldtime.timeInterval3});
                        this.setState({fieldtime64:fieldtime.timeInterval4});
                        this.setState({fieldtime65:fieldtime.timeInterval5});
                        this.setState({fieldtime66:fieldtime.timeInterval6});
                        this.setState({fieldtime67:fieldtime.timeInterval7});
                        this.setState({fieldtime68:fieldtime.timeInterval8});
                        this.setState({fieldtime69:fieldtime.timeInterval1});
                    }
                    if(fieldtime.unitNum==7){
                        this.setState({fieldtime71:fieldtime.timeInterval1});
                        this.setState({fieldtime72:fieldtime.timeInterval2});
                        this.setState({fieldtime73:fieldtime.timeInterval3});
                        this.setState({fieldtime74:fieldtime.timeInterval4});
                        this.setState({fieldtime75:fieldtime.timeInterval5});
                        this.setState({fieldtime76:fieldtime.timeInterval6});
                        this.setState({fieldtime77:fieldtime.timeInterval7});
                        this.setState({fieldtime78:fieldtime.timeInterval8});
                        this.setState({fieldtime79:fieldtime.timeInterval1});
                    }
                    if(fieldtime.unitNum==8){
                        this.setState({fieldtime81:fieldtime.timeInterval1});
                        this.setState({fieldtime82:fieldtime.timeInterval2});
                        this.setState({fieldtime83:fieldtime.timeInterval3});
                        this.setState({fieldtime84:fieldtime.timeInterval4});
                        this.setState({fieldtime85:fieldtime.timeInterval5});
                        this.setState({fieldtime86:fieldtime.timeInterval6});
                        this.setState({fieldtime87:fieldtime.timeInterval7});
                        this.setState({fieldtime88:fieldtime.timeInterval8});
                        this.setState({fieldtime89:fieldtime.timeInterval1});
                    }
                    if(fieldtime.unitNum==9){
                        this.setState({fieldtime91:fieldtime.timeInterval1});
                        this.setState({fieldtime92:fieldtime.timeInterval2});
                        this.setState({fieldtime93:fieldtime.timeInterval3});
                        this.setState({fieldtime94:fieldtime.timeInterval4});
                        this.setState({fieldtime95:fieldtime.timeInterval5});
                        this.setState({fieldtime96:fieldtime.timeInterval6});
                        this.setState({fieldtime97:fieldtime.timeInterval7});
                        this.setState({fieldtime98:fieldtime.timeInterval8});
                        this.setState({fieldtime99:fieldtime.timeInterval1});
                    }

                })
            }
            if(json.re==-100){
               // this.props.dispatch(getAccessToken(false));
                var fieldtime=json.date;

            }
        }).catch((e)=>{
            alert(e)
        });
    }

    render() {

        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;
        var field=new Array();
        const fieldNum=new Array();
        fieldNum[0]="取消";
        field=this.props.activity.placeYardStr.split(",");
        for(i=1;i<=field.length;i++){
            fieldNum[i]=field[i-1];
            if(parseInt(field[i-1])==1){
                this.state.fieldno1=1;
            }
            if(field[i-1]==2){
                this.state.fieldno2=1;
            }
            if(field[i-1]==3){
                this.state.fieldno3=1;
            }
            if(field[i-1]==4){
                this.state.fieldno4=1;
            }
            if(field[i-1]==5){
                this.state.fieldno5=1;
            }
            if(field[i-1]==6){
                this.state.fieldno6=1;
            }
            if(field[i-1]==7){
                this.state.fieldno7=1;
            }
            if(field[i-1]==8){
                this.state.fieldno8=1;
            }
            if(field[i-1]==9){
                this.state.fieldno9=1;
            }
        }
        this.state.field=fieldNum;
        //this.fetchData();


        return (
        <View style={styles.container}>
            <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',
                    backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems: 'center',marginLeft:20}}
                                  onPress={()=>{this.goBack();}}>
                    <Icon name={'angle-left'} size={30} color="#fff"/>
                </TouchableOpacity>
                <View style={{marginLeft:90,justifyContent:'center',alignItems: 'center',}}>
                    <Text style={{color:'#fff',fontSize:18}}>选择场地时间</Text>
                </View>

            </View>
            <View style={{height:41,width:width,flexDirection:'row',
                    backgroundColor:'#ddd',borderBottomWidth:1,borderColor:'#fff'}}>
                <View style={{marginLeft:3}}>
                    <Text>时</Text>
                    <Text>间</Text>
                </View>
                <View style={{marginLeft:4}}>
                    <Text>8:00</Text>
                    <Text>9:00</Text>
                </View>
                <View style={{marginLeft:3}}>
                    <Text>9:00</Text>
                    <Text>10:00</Text>
                </View>
                <View style={{marginLeft:3}}>
                    <Text>10:00</Text>
                    <Text>11:00</Text>
                </View>
                <View style={{marginLeft:3}}>
                    <Text>11:00</Text>
                    <Text>12:00</Text>
                </View>
                <View style={{marginLeft:3}}>
                    <Text>12:00</Text>
                    <Text>13:00</Text>
                </View>
                <View style={{marginLeft:3}}>
                    <Text>13:00</Text>
                    <Text>14:00</Text>
                </View>
                <View style={{marginLeft:3}}>
                    <Text>14:00</Text>
                    <Text>15:00</Text>
                </View>
                <View style={{marginLeft:3}}>
                    <Text>15:00</Text>
                    <Text>16:00</Text>
                </View>
                <View style={{marginLeft:3}}>
                    <Text>16:00</Text>
                    <Text>17:00</Text>
                </View>

            </View>

            <ScrollView>
            {/*场地一*/}
                { this.state.fieldno1==1?
                    <View style={{height:55,width:width,flexDirection:'row',
                    backgroundColor:'#eee',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View style={{marginLeft:3}}>
                            <Text>场</Text>
                            <Text>地</Text>
                            <Text>一</Text>
                        </View>
                        <View style={{marginLeft:4}}>
                            <Text>{this.state.fieldtime11}</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>{this.state.fieldtime12}</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text>{this.state.fieldtime13}</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>{this.state.fieldtime14}</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>{this.state.fieldtime15}</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>{this.state.fieldtime16}</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>{this.state.fieldtime17}</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>{this.state.fieldtime18}</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>{this.state.fieldtime19}</Text>
                        </View>
                    </View>:null
                }
            {/*场地2*/}
                {
                    this.state.fieldno2==1?
                    <View style={{height:55,width:width,flexDirection:'row',
                    backgroundColor:'#eee',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View style={{marginLeft:3}}>
                            <Text>场</Text>
                            <Text>地</Text>
                            <Text>二</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text>{this.state.fieldtime21}</Text>
                        </View>
                        <View style={{marginLeft:23}}>
                            <Text>{this.state.fieldtime22}</Text>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text>{this.state.fieldtime23}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime24}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime25}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime26}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime27}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime28}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime29}</Text>
                        </View>
                    </View>:null
                }
            {/*场地3*/}
                {
                    this.state.fieldno3==1?
                    <View style={{height:55,width:width,flexDirection:'row',
                    backgroundColor:'#eee',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View style={{marginLeft:3}}>
                            <Text>场</Text>
                            <Text>地</Text>
                            <Text>三</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text>{this.state.fieldtime31}</Text>
                        </View>
                        <View style={{marginLeft:23}}>
                            <Text>{this.state.fieldtime32}</Text>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text>{this.state.fieldtime33}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime34}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime35}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime36}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime37}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime38}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime39}</Text>
                        </View>
                    </View>:null
                }
            {/*场地4*/}
                {
                    this.state.fieldno4==1?
                    <View style={{height:55,width:width,flexDirection:'row',
                    backgroundColor:'#eee',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View style={{marginLeft:3}}>
                            <Text>场</Text>
                            <Text>地</Text>
                            <Text>四</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text>{this.state.fieldtime41}</Text>
                        </View>
                        <View style={{marginLeft:23}}>
                            <Text>{this.state.fieldtime42}</Text>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text>{this.state.fieldtime43}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime44}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime45}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime46}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime47}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime48}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime49}</Text>
                        </View>
                    </View>:null
                }
            {/*场地5*/}
                {                    this.state.fieldno5==1?
                    <View style={{height:55,width:width,flexDirection:'row',
                    backgroundColor:'#eee',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View style={{marginLeft:3}}>
                            <Text>场</Text>
                            <Text>地</Text>
                            <Text>五</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text>{this.state.fieldtime51}</Text>
                        </View>
                        <View style={{marginLeft:23}}>
                            <Text>{this.state.fieldtime52}</Text>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text>{this.state.fieldtime53}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime54}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime55}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime56}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime57}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime58}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime59}</Text>
                        </View>
                    </View>:null
                }
            {/*场地6*/}
                {
                    this.state.fieldno6==1?
                    <View style={{height:55,width:width,flexDirection:'row',
                    backgroundColor:'#eee',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View style={{marginLeft:3}}>
                            <Text>场</Text>
                            <Text>地</Text>
                            <Text>六</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text>{this.state.fieldtime61}</Text>
                        </View>
                        <View style={{marginLeft:23}}>
                            <Text>{this.state.fieldtime62}</Text>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text>{this.state.fieldtime63}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime64}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime65}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime66}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime67}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime68}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime69}</Text>
                        </View>
                    </View>:null
                }
            {/*场地7*/}
                {
                    this.state.fieldno7==1?
                    <View style={{height:55,width:width,flexDirection:'row',
                    backgroundColor:'#eee',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View style={{marginLeft:3}}>
                            <Text>场</Text>
                            <Text>地</Text>
                            <Text>七</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text>{this.state.fieldtime71}</Text>
                        </View>
                        <View style={{marginLeft:23}}>
                            <Text>{this.state.fieldtime72}</Text>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text>{this.state.fieldtime73}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime74}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime75}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime76}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime77}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime78}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime79}</Text>
                        </View>
                    </View>:null
                }
            {/*场地八*/}
                {
                    this.state.fieldno8==1?
                    <View style={{height:55,width:width,flexDirection:'row',
                    backgroundColor:'#eee',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View style={{marginLeft:3}}>
                            <Text>场</Text>
                            <Text>地</Text>
                            <Text>八</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text>{this.state.fieldtime81}</Text>
                        </View>
                        <View style={{marginLeft:23}}>
                            <Text>{this.state.fieldtime82}</Text>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text>{this.state.fieldtime83}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime84}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime85}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime86}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime87}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime88}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime89}</Text>
                        </View>
                    </View>:null
                }
            {/*场地9*/}
                {
                    this.state.fieldno9==1?
                    <View style={{height:55,width:width,flexDirection:'row',
                    backgroundColor:'#eee',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View style={{marginLeft:3}}>
                            <Text>场</Text>
                            <Text>地</Text>
                            <Text>九</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text>{this.state.fieldtime91}</Text>
                        </View>
                        <View style={{marginLeft:23}}>
                            <Text>{this.state.fieldtime92}</Text>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text>{this.state.fieldtime93}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime94}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime95}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime96}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime97}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime98}</Text>
                        </View>
                        <View style={{marginLeft:33}}>
                            <Text>{this.state.fieldtime99}</Text>
                        </View>
                    </View>:null
                }
            {/*场地十*/}
                {
                    this.state.fieldno10==1?
                    <View style={{height:55,width:width,flexDirection:'row',
                    backgroundColor:'#eee',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View style={{marginLeft:3}}>
                            <Text>场</Text>
                            <Text>地</Text>
                            <Text>十</Text>
                        </View>
                        <View style={{marginLeft:4}}>
                            <Text>8:00</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>9:00</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text>10:00</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>11:00</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>12:00</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>13:00</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>14:00</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>15:00</Text>
                        </View>
                        <View style={{marginLeft:3}}>
                            <Text>16:00</Text>
                        </View>
                    </View>:null
                }

            {/*选择场地*/}
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5,marginTop:20}}>
                <View style={{flex:1}}>
                    <Text>选择场地：</Text>
                </View>
                <TouchableOpacity style={{flex:3,height:30,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                            backgroundColor:'#eee',borderRadius:10}}
                                  onPress ={()=>{this.show('actionSheet')}}>
                    {
                        this.state.eventWeek==null?
                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                <Text style={{color:'#888',fontSize:13}}>请选择活动场地：</Text>
                            </View> :
                            <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                <Text style={{color:'#444',fontSize:13}}>场地{this.state.eventWeek}</Text>
                            </View>
                    }

                    <ActionSheet
                        ref={(p)=>{this.actionSheet=p;}}
                        title="请选择活动场地"
                        options={fieldNum}
                        cancelButtonIndex={CANCEL_INDEX}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                        onPress={
                                       (data)=>{ this._handlePress(data); }
                                    }
                    >

                    </ActionSheet>
                </TouchableOpacity>

            </View>

                {/*选择活动时间*/}
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                    <View style={{flex:1,}}>
                        <Text style={{color:'#888'}}>开始时间:</Text>
                    </View>
                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                                backgroundColor:'#eee',borderRadius:10,margin:5}}>
                        {
                            this.state.startTime==null?
                                <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{color:'#888',fontSize:13}}>请选择：</Text>
                                </View> :
                                <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{color:'#444',fontSize:13}}>{this.state.startTimeView}</Text>
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
                              {/*var startTime = date+':00';*/}
            {/*var day = new Date();*/}
            {/*var today = DateFilter.filter(day, 'yyyy-mm-dd');*/}
            {/*var startTimeStr = today+' '+startTime;*/}
            {/*this.setState({startTime:startTimeStr,selectStartTime:false,startTimeView:date})*/}
                            this.verifystartTime(date)



                                    }}
                            />
                        </View>
                    </View>
                </View>



                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                    <View style={{flex:1,}}>
                        <Text style={{color:'#888'}}>结束时间:</Text>
                    </View>
                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                                backgroundColor:'#eee',borderRadius:10,margin:5}}>
                        {
                            this.state.endTime==null?
                                <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{color:'#888',fontSize:13}}>请选择：</Text>
                                </View> :
                                <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{color:'#444',fontSize:13}}>{this.state.endTimeView}</Text>
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

                                                this.verifyTime(date);
                                    }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={{height:30,width:width*0.6,marginLeft:width*0.2,backgroundColor:'#66CDAA',margin:10,
                marginBottom:10,justifyContent:'center',alignItems: 'center',borderRadius:10,}}
                              onPress={()=>{
                                      this.signUpFieldTimeActivity(this.props.activity,this.state.eventWeek,this.state.fieldstart,this.state.fieldend);
                                      }}>
                <Text style={{color:'#fff',fontSize:15}}>确 认 报 名</Text>
            </TouchableOpacity>
        </View>
        );
    }
    signUpFieldTimeActivity(event,select,starttime,endtime)
    {

            this.props.dispatch(signUpFieldTimeActivity(event,select,starttime,endtime)).then((json)=>{
                if(json.re==1){
                    Alert.alert('信息','报名成功,是否立即支付？',[{text:'是',onPress:()=>{

                        this.navigate2ActivityPay(event);
                       // this.setMyActivityList();
                        this.goBack()
                    }},
                        {text:'否',onPress:()=>{
                            this.goBack();
                            //this.setMyActivityList();
                        }},
                    ]);
                }else{
                    if(json.re==-100){
                       // this.props.dispatch(getAccessToken(false));
                    }
                }
            })

    }


    navigate2ActivityPay(event)
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'ActivityPay',
                component: ActivityPay,
                params: {
                    activity:event
                }
            })
        }
    }

    verifyTime(date){

        var endhour = date.substring(0,2);
        var inthour=parseInt(endhour);
        var hourminutes=inthour*60;
        var min=date.substring(3,5);
        var intmin=parseInt(min);
        var endmintotal=hourminutes+intmin;

        var startTime= this.state.startTimeView;
        var starthour=startTime.substring(0,2);
        var inthour1=parseInt(starthour);
        var hourminutes1=inthour1*60;
        var min1=startTime.substring(3,5);
        var intmin1=parseInt(min1);
        var startinttotal=hourminutes1+intmin1;

        var s1=this.props.activity.startTimeStr;
        var s2=s1.substring(0,11);
        var e1=this.props.activity.endTimeStr;
        var e2=e1.substring(0,11);
        var fieldstart=s2+startTime+':00';
        var fieldend=e2+date+':00';

        var time1=s1.substring(11,16);
        var shour=time1.substring(0,2);
        var shourmin=shour*60;
        var smin=time1.substring(3,5);
        var sintmin=parseInt(smin);
        var st=shourmin+sintmin;

        var time2=e1.substring(11,16);
        var ehour=time2.substring(0,2);
        var ehourmin=ehour*60;
        var emin=time2.substring(3,5);
        var eintmin=parseInt(emin);
        var et=ehourmin+eintmin;

       this.setState({fieldstart:fieldstart,fieldend:fieldend})

        if(endmintotal>et||endmintotal<st){
            alert("您所选的时间场馆不能使用！")

        }else{

            if((endmintotal-startinttotal)<60){
                alert("活动时间最短为一小时");
            }else{
                var endTime = date+':00';
                var day = new Date();
                var today = DateFilter.filter(day, 'yyyy-mm-dd');
                var endTimeStr = today+' '+endTime;
                this.setState({endTime:endTimeStr,selectEndTime:false,endTimeView:date})
            }
        }
    }

    verifystartTime(date){

        var endhour = date.substring(0,2);
        var inthour=parseInt(endhour);
        var hourminutes=inthour*60;
        var min=date.substring(3,5);
        var intmin=parseInt(min);
        var startinttotal=hourminutes+intmin;



        // var startTime= this.state.startTimeView;
        // var starthour=startTime.substring(0,2);
        // var inthour1=parseInt(starthour);
        // var hourminutes1=inthour1*60;
        // var min1=startTime.substring(3,5);
        // var intmin1=parseInt(min1);
        // var startinttotal=hourminutes1+intmin1;

        var s1=this.props.activity.startTimeStr;
        var s2=s1.substring(0,11);
        var e1=this.props.activity.endTimeStr;
        var e2=e1.substring(0,11);
        //var fieldstart=s2+startTime+':00';
        //var fieldend=e2+date+':00';


        var time1=s1.substring(11,16);
        var shour=time1.substring(0,2);
        var intshour=parseInt(shour);
        var shourmin=intshour*60;
        var smin=time1.substring(3,5);
        var sintmin=parseInt(smin);
        var st=shourmin+sintmin;

        var time2=e1.substring(11,16);
        var ehour=time2.substring(0,2);
        var intehour=parseInt(ehour);
        var ehourmin=intehour*60;
        var emin=time2.substring(3,5);
        var eintmin=parseInt(emin);
        var et=ehourmin+eintmin;

        //this.setState({fieldstart:fieldstart,fieldend:fieldend})
        if(startinttotal<st||startinttotal>et){
            alert("您所选的时间场馆不能使用！")
        }else{
            var startTime = date+':00';
            var day = new Date();
            var today = DateFilter.filter(day, 'yyyy-mm-dd');
            var startTimeStr = today+' '+startTime;
            this.setState({startTime:startTimeStr,selectStartTime:false,startTimeView:date})
        }


    }


    componentWillMount(){
        this.fetchData();
    }

}


const styles = StyleSheet.create({
    select: {
        backgroundColor: '#6A85B1',
        width: 300,
    },
    container: {
        flex: 1,
    },
});
module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        trainer:state.user.trainer,
        activityList:state.activity.activityList,
        fieldtime:state.activity.fieldtime,
        myEvents:state.activity.myEvents,
        myTakenEvents:state.activity.myTakenEvents,
        visibleEvents:state.activity.visibleEvents,
        activityOnFresh:state.activity.activityOnFresh,
    })
)(ChooseField);