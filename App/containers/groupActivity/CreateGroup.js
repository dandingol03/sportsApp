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
import TextInputWrapper from 'react-native-text-input-wrapper'
import GroupMemberModal from './GroupMemberModal'


class AddGroup extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    renderRow(rowData,sectionId,rowId){
        var row=(
            <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',marginBottom:5,padding:5,borderBottomWidth:1,
            borderColor:'#eee',borderRadius:8}}>
                <View style={{flex:1,}}>
                    <Image resizeMode="stretch" style={{height:40,width:40,borderRadius:20}} source={rowData.portrait}/>
                </View>
                <View style={{flex:3,marginLeft:5}}>
                    <View style={{flexDirection:'row',marginLeft:10}}>
                        <Icon name={'user'} size={15} color="pink"/>
                        <Text style={{marginLeft:10,color:'#343434'}}>{rowData.perName}</Text>
                    </View>
                    <View  style={{flexDirection:'row',marginLeft:10,marginTop:5}}>
                        <Icon name={'mobile'} size={15} color="#87CEFF"/>
                        <Text style={{marginLeft:10,color:'#aaa'}}>{rowData.mobilePhone}</Text>
                    </View>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                </View>
                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',margin:10,borderWidth:1,borderColor:'#FF4040',borderRadius:5}}
                                  onPress={()=>{
                    this.navigate2GroupDetail();
                }}>
                    <Text style={{color:'#FF4040',fontSize:12,}}>删除</Text>
                </TouchableOpacity>
            </View>
        );
        return row;
    }

    constructor(props) {
        super(props);
        this.state={
            modalVisible:false,
            group:{groupName:null,groupMaxMemNum:null,groupBrief:null},
            doingFetch: false,
            isRefreshing: false,
            memberList:[
                {perName:'小鱼丁',portrait:require('../../../img/portrait.jpg'),mobilePhone:'18253160627'},
                {perName:'Danding',portrait:require('../../../img/portrait.jpg'),mobilePhone:'17865135730'},
                {perName:'Danding',portrait:require('../../../img/portrait.jpg'),mobilePhone:'17865135730'},
                ],

        }
    }

    render() {

        var memberList = this.state.memberList;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if(memberList!==undefined&&memberList!==null&&memberList.length>0)
        {
            memberListView=(
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(memberList)}
                    renderRow={this.renderRow.bind(this)}
                />
            );
        }


        return (
            <View style={{flex:1}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',
                backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>创建群</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </View>
                </View>

                <View style={{flex:5,backgroundColor:'#fff'}}>

                    {/*群名*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'
                    ,margin:10,marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>群名：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>

                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入群名"
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

                    {/*群简介*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',margin:10,
                    marginTop:5,marginBottom:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'#343434'}}>群简介：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>

                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft:20,fontSize:13,color:'#222'}}
                                placeholder="请输入群简介"
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

                    {/*添加成员*/}
                    <View style={{height:30,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',
                    margin:10,marginTop:5,marginBottom:10}}>
                        <View style={{flex:1,justifyContent:'center',alignItems: 'flex-start',}}>
                            <Text style={{color:'#343434'}}>添加成员：</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',justifyContent:'flex-end',alignItems: 'center',backgroundColor:'#eee',
                            borderRadius:10}}>
                            <TouchableOpacity style={{marginRight:15}}
                            onPress={()=>{
                                this.setState({modalVisible:true});
                            }}>
                                <Ionicons name='md-add-circle'  size={26} color="#66CDAA"/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        (this.state.memberList==null||this.state.memberList==undefined||this.state.memberList.length==0)?
                            null:
                            <View style={{height:height*0.4,padding:5,borderWidth:1,borderColor:'#eee',backgroundColor:'#eee'}}>
                                <ScrollView style={{height:height*0.4}}>
                                    {memberListView}
                                </ScrollView>
                            </View>
                    }





                    <View style={{flex:1,backgroundColor:'#fff',padding:10}}>
                        <Text style={{color:'#aaa',fontSize:11}}>
                            温馨提示：您发布的内容应合法、真实、健康、共创文明的网络环境
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={{height:35,backgroundColor:'#66CDAA',margin:20,justifyContent:'center',alignItems: 'center',borderRadius:10,}}
                                  onPress={()=>{

                                      }}>
                    <Text style={{color:'#fff',fontSize:15}}>确 认</Text>
                </TouchableOpacity>


                {/* Add GroupMember Modal*/}
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log("Modal has been closed.");
                    }}
                >

                    <GroupMemberModal
                        onClose={()=>{
                            this.setState({modalVisible:false});
                        }}

                        accessToken={this.props.accessToken}
                    />

                </Modal>



            </View>
        );
    }

}

var styles = StyleSheet.create({


});

const mapStateToProps = (state, ownProps) => {

    const props = {

    }
    return props
}

export default connect(mapStateToProps)(AddGroup);
