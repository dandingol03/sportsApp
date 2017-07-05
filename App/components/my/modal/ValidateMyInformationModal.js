

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
import DateFilter from '../../../utils/DateFilter';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';


var {height, width} = Dimensions.get('window');


class ValidateMyInformationModal extends Component{

    close(){
        if(this.props.onClose!==undefined&&this.props.onClose!==null)
        {
            this.props.onClose();
        }
    }

    confirm()
    {
        if(this.props.onConfirm)
            this.props.onConfirm()
    }

    setTime(){
        var time = {id:this.props.timeListLength+1,day:this.state.selectDay,startTime:this.state.startTime,endTime:this.state.endTime}
        this.close();
        if(this.props.setTime!==undefined&&this.props.setTime!==null)
        {
            this.props.setTime(time);
        }
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState(nextProps)
    }

    renderRow(rowData)
    {
        if(this.state.selectDay!==rowData){
            return  (
                <TouchableOpacity style={{height:25,width:50,borderRadius:10,borderWidth:1,borderColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                  onPress={()=>{this.setState({selectDay:rowData});}}>
                    <Text style={{color:'#66CDAA',fontSize:13}}>{rowData}</Text>
                </TouchableOpacity>

            );
        }else{
            return  (
                <TouchableOpacity style={{height:25,width:50,borderRadius:10,backgroundColor:'#66CDAA',margin:5,
                justifyContent:'center',alignItems: 'center'}}
                                  onPress={()=>{this.setState({selectDay:rowData});}}>
                    <Text style={{color:'#fff',fontSize:13}}>{rowData}</Text>
                </TouchableOpacity>

            );
        }

    }


    constructor(props)
    {
        super(props);
        this.state={

        }
    }

    render(){


        return (

            <View style={styles.container}>

                <View style={{padding:10,alignItems:'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:4}}>
                        <Text style={{color:'#222',fontSize:17,fontWeight:'bold'}}>个人信息填写</Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',padding:4}}>
                        <Text style={{color:'#333',fontSize:13}}>
                            请跳转至
                        </Text>
                        <Text style={{color:'#66CDAA',fontSize:14,fontWeight:'bold'}}>
                            '我'
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:3}}>
                        <Text style={{color:'#333',fontSize:13}}>
                            完成
                        </Text>
                        <Text style={{color:'#66CDAA',fontSize:14,fontWeight:'bold'}}>
                            '我的资料'
                        </Text>
                        <Text style={{color:'#333',fontSize:13}}>
                            的信息填写和手机验证
                        </Text>

                    </View>
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
        padding:10
    },
    row:{
        flexDirection:'row',
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderBottomColor:'#222'
    },
});


module.exports = ValidateMyInformationModal;

