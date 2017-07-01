import React,{Component} from 'react';
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
    Modal,
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputWrapper from 'react-native-text-input-wrapper';
import ActionSheet from 'react-native-actionsheet';


class MyProfile extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }


    _handlePress1(index) {

        if(index!==0){
            var memberLevel = this.state.memberLevelButtons[index];
            var memberLevelCode = index;
            this.setState({event:Object.assign(this.state.event,{memberLevel:memberLevel})});
        }

    }

    show(actionSheet) {
        this[actionSheet].show();
    }

    constructor(props) {
        super(props);
        this.state={
            person:{userName:null,perName:null,perIdCard:null,gender:null,age:null,level:null,mobilePhone:null},
            memberLevelButtons:['取消','无','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'],
        }
    }

    render() {
        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;

        const memberLevelButtons=['取消','无','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'];

        return (
            <View style={{flex:1}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>我的资料</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </View>
                </View>

                <View style={{flex:5,backgroundColor:'#fff'}}>

                    {/*用户名*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:15,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>用户名：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="用户名"
                                val={this.state.person.perName==null?'':this.state.person.perName==null}
                                onChangeText={
                                    (value)=>{
                                        this.setState({group:Object.assign(this.state.group,{groupName:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({group:Object.assign(this.state.group,{groupName:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*手机号*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:15,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>手机号：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="用户名"
                                val={this.props.personInfo==null?'':this.state.group.groupName==null}
                                onChangeText={
                                    (value)=>{
                                        this.setState({group:Object.assign(this.state.group,{groupName:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({group:Object.assign(this.state.group,{groupName:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*真实姓名*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>真实姓名：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入真实姓名"
                                val={this.state.group.groupName==null?'':this.state.group.groupName==null}
                                onChangeText={
                                    (value)=>{
                                        this.setState({group:Object.assign(this.state.group,{groupName:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({group:Object.assign(this.state.group,{groupName:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*身份证号*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,
                    marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>身份证号：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>

                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入身份证号"
                                val={this.state.group.groupBrief==null?'':this.state.group.groupBrief}
                                onChangeText={
                                    (value)=>{
                                        this.setState({group:Object.assign(this.state.group,{groupBrief:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({group:Object.assign(this.state.group,{groupBrief:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*年龄*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>年龄：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入年龄"
                                val={this.state.group.groupName==null?'':this.state.group.groupName==null}
                                onChangeText={
                                    (value)=>{
                                        this.setState({group:Object.assign(this.state.group,{groupName:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({group:Object.assign(this.state.group,{groupName:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*性别*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>性别：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入性别"
                                val={this.state.group.groupName==null?'':this.state.group.groupName==null}
                                onChangeText={
                                    (value)=>{
                                        this.setState({group:Object.assign(this.state.group,{groupName:value})})
                                    }}
                                onCancel={
                                    ()=>{this.setState({group:Object.assign(this.state.group,{groupName:null})});}
                                }
                            />
                        </View>
                    </View>

                    {/*运动水平*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:5}}>
                        <View style={{flex:1}}>
                            <Text>对象水平：</Text>
                        </View>
                        <TouchableOpacity style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}
                                          onPress={()=>{ this.show('actionSheet1'); }}>

                            {
                                this.state.event.memberLevel==null?
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#888',fontSize:13}}>请选择对象水平：</Text>
                                    </View> :
                                    <View style={{flex:3,marginLeft:20,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                                        <Text style={{color:'#444',fontSize:13}}>{this.state.event.memberLevel}</Text>
                                    </View>
                            }
                            <View style={{width:60,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                <Icon name={'angle-right'} size={30} color="#fff"/>
                            </View>
                            <ActionSheet
                                ref={(o) => {
                                        this.actionSheet1 = o;
                                    }}
                                title="请选择对象水平"
                                options={memberLevelButtons}
                                cancelButtonIndex={CANCEL_INDEX}
                                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                onPress={
                                        (data)=>{ this._handlePress1(data); }
                                    }
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity style={{height:35,backgroundColor:'#66CDAA',margin:20,justifyContent:'center',alignItems: 'center',borderRadius:10,}}
                                  onPress={()=>{
                                      this.state.memberList.push(this.props.personInfo);
                                      var info ={group:this.state.group,memberList:this.state.memberList};
                                      this.createGroup(info);
                                      }}>
                    <Text style={{color:'#fff',fontSize:15}}>确 认</Text>
                </TouchableOpacity>


            </View>
        );
    }

}

var styles = StyleSheet.create({


});


module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        myGroupList:state.activity.myGroupList,
        groupOnFresh:state.activity.groupOnFresh
    })
)(MyProfile);


