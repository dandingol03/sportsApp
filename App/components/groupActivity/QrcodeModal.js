/**
 * Created by youli on 2017/11/17.
 */

import React,{Component} from 'react';

import  {
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    Alert,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputWrapper from 'react-native-text-input-wrapper';
import DateFilter from '../../utils/DateFilter';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import {
    enableCompetitionItemOnFresh,
} from '../../action/CompetitionActions';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';
var {height, width} = Dimensions.get('window');
class QrcodeModal extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
    close(){
        if(this.props.onClose!==undefined&&this.props.onClose!==null)
        {
            this.props.onClose();
        }
    }


    componentWillReceiveProps(nextProps)
    {
        this.setState(nextProps)
    }

    confirm()
    {
        if(this.props.onConfirm)
            this.props.onConfirm(this.state.team)
    }

    doCheck()
    {
        if(this.state.team.teamName&&this.state.team.teamName!=''
            &&this.state.team.remark&&this.state.team.remark!='')
        {
            return true
        }else{
            return false
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            team:{}
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{padding:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:4}}>
                        <Text style={{color:'#222',fontSize:17,fontWeight:'bold'}}>支付二维码凭证</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:4,paddingTop:5}}>
                        <QRCode
                            value={"您已成功支付"}
                            size={92}
                            bgColor='purple'
                            fgColor='white'/>
                    </View>

                </View>


                <View style={{flex:1,padding:2,margin:4,flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
                    <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                            backgroundColor:'#66CDAA',borderRadius:6,borderWidth:1,borderColor:'#66CDAA'}}
                                      onPress={()=>{ this.close(); }}>
                        <Text style={{color:'#fff',padding:5}}>确认</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        borderTopWidth:0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderTopColor:'#fff'
    },
    body:{
        padding:200
    },
    row:{
        flexDirection:'row',
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderBottomColor:'#222'
    },
});

module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        user:state.user.user,
    })
)(QrcodeModal);



