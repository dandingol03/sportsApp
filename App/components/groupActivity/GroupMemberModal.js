/**
 * Created by youli on 25/03/2017.
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
var {height, width} = Dimensions.get('window');


class GroupMemberModal extends Component{

    close(){
        if(this.props.onClose!==undefined&&this.props.onClose!==null)
        {
            this.props.onClose();
        }
    }

    setMemberList(){
        this.close();
        if(this.props.setMemberList!==undefined&&this.props.setMemberList!==null)
        {
            this.props.setMemberList();
        }
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState(nextProps)
    }

    constructor(props)
    {
        super(props);
        this.state={
           searchInfo:null,
            member:this.props.member,
        }
    }

    render(){

        return (
            <View>
                <View style={{height:height*0.4,width:width*0.8,padding:5,margin:width*0.1,marginTop:100,borderColor:'#66CDAA',borderWidth:1,
                backgroundColor:'#fff',borderRadius:6}}>

                    <View style={{flex:2}}>
                        {/*//搜索框*/}
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',margin:8,padding:5,borderRadius:8}}>
                            <TextInputWrapper
                                style={{fontSize:13}}
                                onConfirm={()=>{this.props.searchMember(this.state.searchInfo);}}
                                search={true}
                                onChangeText={(searchInfo) => {
                                      this.setState({searchInfo:searchInfo});
                                    }}
                                value={this.state.searchInfo==null?'':this.state.searchInfo}
                                placeholder='请输入手机号'
                                placeholderTextColor="#aaa"
                                underlineColorAndroid="transparent"
                            />
                        </View>
                    </View>

                    {
                        this.props.member==null?null:
                            <View style={{flex:3,flexDirection:'row',backgroundColor:'#fff',marginBottom:5,padding:5,borderBottomWidth:1,
            borderColor:'#eee',borderRadius:8}}>
                                <View style={{flex:1,}}>
                                    <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={require('../../../img/portrait.jpg')}/>
                                </View>
                                <View style={{flex:3,marginLeft:5}}>
                                    <View style={{flexDirection:'row',marginLeft:10}}>
                                        <Icon name={'user'} size={15} color="pink"/>
                                        <Text style={{marginLeft:10,color:'#343434'}}>{this.props.member.perName}</Text>
                                    </View>
                                    <View  style={{flexDirection:'row',marginLeft:10,marginTop:5}}>
                                        <Icon name={'mobile'} size={15} color="#87CEFF"/>
                                        <Text style={{marginLeft:10,color:'#aaa'}}>{this.props.member.mobilePhone}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                                </View>

                            </View>
                    }

                    <View style={{flex:1,padding:2,margin:4,flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
                        <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                    backgroundColor:'#fff',borderRadius:6,borderWidth:1,borderColor:'#66CDAA'}}
                                          onPress={()=>{ this.close(); }}>
                            <Text style={{color:'#66CDAA',padding:5}}>取消</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                    backgroundColor:'#66CDAA',borderRadius:6}}
                                          onPress={()=>{this.setMemberList();}}>
                            <Text style={{color:'#fff',padding:5}}>添加</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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


module.exports = GroupMemberModal;

