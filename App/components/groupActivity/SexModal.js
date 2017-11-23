
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
class SexModal extends Component{

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

            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.card}>
                    <QRCode
                        value={"您已成功支付"+this.state.team+"元"}
                        size={200}
                        bgColor='purple'
                        fgColor='white'/>
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
)(SexModal);



