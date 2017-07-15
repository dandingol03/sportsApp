

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
import Ionicons from 'react-native-vector-icons/Ionicons';

var {height, width} = Dimensions.get('window');


class CompulseMobilePhoneModal extends Component{

    close(){
        if(this.props.onClose!==undefined&&this.props.onClose!==null)
        {
            this.props.onClose();
        }
    }

    confirm()
    {
        if(this.props.onConfirm)
            this.props.onConfirm({mobilePhone:this.state.val,verifyCode:this.state.verifyCode})
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
            val:props.val,
            verifyCode:null
        }
    }

    render(){



        return (

            <View style={styles.container}>

                <View style={{padding:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:4}}>
                        <Text style={{color:'#222',fontSize:17,fontWeight:'bold'}}>手机号验证</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:4,paddingTop:15,borderBottomWidth:1,borderColor:'#66CDAA'}}>

                        <View stye={{flexDirection:'row',alignItems:'center',}}>
                            <Ionicons name='md-phone-portrait' size={20} color="#666" style={{marginRight:15}}/>
                        </View>
                        <View style={{flexDirection:'row',flex:1}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:4,color:'#222',fontSize:15,height:20}}
                                placeholder=""
                                val={this.state.val}
                                disableCancel={true}
                                onChangeText={
                                    (value)=>{
                                        this.setState({val:value})
                                    }}
                                onCancel={
                                    ()=>{

                                    }}
                            />
                        </View>
                        <TouchableOpacity style={{flexDirection:'row',backgroundColor:'#63B8FF',padding:5,paddingHorizontal:6,borderRadius:3}}
                            onPress={()=>{
                                //进行验证
                                if(this.props.onVerify)
                                    this.props.onVerify(this.state.val)
                            }}
                        >
                            <Text style={{fontSize:12,color:'#fff'}}>获取验证码</Text>
                        </TouchableOpacity>

                    </View>


                    <View style={{flexDirection:'row',alignItems:'center',padding:4,paddingTop:15,borderBottomWidth:1,borderColor:'#66CDAA'}}>
                        <View stye={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:'#666',fontWeight:'bold',fontSize:12,marginRight:2}}>验证码</Text>
                        </View>
                        <TextInputWrapper
                            placeholderTextColor='#888'
                            textInputStyle={{marginLeft:4,color:'#222',fontSize:15}}
                            placeholder=""
                            val={this.state.verifyCode}
                            onChangeText={
                                    (value)=>{
                                        this.setState({verifyCode:value})
                                    }}
                            onCancel={
                                    ()=>{

                                    }}
                        />
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',padding:6}}>
                        <Text style={{color:'#777',fontSize:12}}>
                            输入正确的手机号，以便接收消息和通过验证
                        </Text>

                    </View>
                </View>


                <View style={{flex:1,padding:2,margin:4,flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>

                    <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                                backgroundColor:'#66CDAA',borderRadius:6}}
                                      onPress={()=>{this.confirm()}}>
                        <Text style={{color:'#fff',padding:5}}>确定</Text>
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


module.exports = CompulseMobilePhoneModal;

