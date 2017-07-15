

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
var {height, width} = Dimensions.get('window');



const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 3;
const maleTypes=['取消','男','女'];


class AddRelativeModal extends Component{

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

    _handlePress2(index) {

        if(index!==0){

            //1是男 2是女
            this.setState({user:Object.assign(this.state.user,{genderCode:index})});
        }

    }

    show(actionSheet) {
        this[actionSheet].show();
    }

    doCheck()
    {
        if(this.state.user.username&&this.state.user.username!=''
            &&this.state.user.perName&&this.state.user.perName!=''
            &&this.state.user.genderCode&&
            this.state.user.perBirthday)
        {
            return true
        }else{
            return false
        }
    }

    constructor(props)
    {
        super(props);
        this.state={
            user:{}
        }
    }

    render(){




        return (

            <View style={{flex:1,backgroundColor:'#fff'}}>

                {/*用户名*/}
                <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                    <View style={{flex:1}}>
                        <Text>用户名：</Text>
                    </View>
                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                        <TextInputWrapper
                            placeholderTextColor='#888'
                            textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                            placeholder="请输入用户名"
                            val={this.state.user.username}
                            onChangeText={
                                    (value)=>{
                                        this.setState({user:Object.assign(this.state.user,{username:value})})
                                    }}
                            onCancel={
                                    ()=>{this.setState({user:Object.assign(this.state.user,{username:null})});}
                                }
                        />
                    </View>
                </View>


                {/*性别*/}
                <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                    <View style={{flex:1}}>
                        <Text>性别：</Text>
                    </View>
                    <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                      onPress={()=>{ this.show('actionSheet2'); }}>
                        {
                            this.state.user.genderCode==null?
                                <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{color:'#888',fontSize:13}}>请选择性别：</Text>
                                </View> :
                                <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{color:'#444',fontSize:13}}>{this.state.user.genderCode==1?'男':'女'}</Text>
                                </View>

                        }
                        <View style={{width:60,flexDirection:'row',justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                            <Icon name={'angle-right'} size={30} color="#fff"/>
                        </View>
                        <ActionSheet
                            ref={(p) => {
                                        this.actionSheet2 =p;
                                    }}
                            title="请选择性别"
                            options={maleTypes}
                            cancelButtonIndex={CANCEL_INDEX}
                            onPress={
                                        (data)=>{ this._handlePress2(data); }
                                    }
                        />
                    </TouchableOpacity>
                </View>


                {/*真实姓名*/}
                <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                    <View style={{flex:1}}>
                        <Text>真实姓名：</Text>
                    </View>
                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                        <TextInputWrapper
                            placeholderTextColor='#888'
                            textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                            placeholder="请输入真实姓名"
                            val={this.state.user.perName}
                            onChangeText={
                                    (value)=>{
                                        this.setState({user:Object.assign(this.state.user,{perName:value})})
                                    }}
                            onCancel={
                                    ()=>{this.setState({user:Object.assign(this.state.user,{perName:null})});}
                                }
                        />
                    </View>
                </View>

                {/*出生日期*/}
                <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                    <View style={{flex:1,}}>
                        <Text style={{color:'#343434'}}>出生日期:</Text>
                    </View>
                    <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',
                                backgroundColor:'#eee',borderRadius:10}}>
                        {
                            this.state.user.perBirthday==null?
                                <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{color:'#888',fontSize:13}}>请选择：</Text>
                                </View> :
                                <View style={{flex:5,marginLeft:10,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                    <Text style={{color:'#444',fontSize:13}}>
                                        {DateFilter.filter(this.state.user.perBirthday,'yyyy-mm-dd')}
                                    </Text>
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
                                mode="date"
                                placeholder="选择"
                                format="YYYY-MM-DD"
                                confirmBtnText="确认"
                                cancelBtnText="取消"
                                showIcon={true}
                                iconComponent={<Icon name={'calendar'} size={20} color="#888"/>}
                                onDateChange={(date) => {
                                    this.setState({user:Object.assign(this.state.user,{perBirthday:date})})

                                    }}
                            />
                        </View>
                    </View>
                </View>

                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:40}}>
                    <TouchableOpacity style={{padding:10,paddingHorizontal:12,backgroundColor:'#66CDAA',borderRadius:4,width:width/2,
                            justifyContent:'center',flexDirection:'row'}}
                        onPress={()=>{
                            if(this.doCheck()==true)
                            {
                                if(this.props.onConfirm)
                                    this.props.onConfirm(this.state.user)
                            }
                        }}
                    >
                        <Text style={{color:'#fff',}}>确认</Text>
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


module.exports = AddRelativeModal;

