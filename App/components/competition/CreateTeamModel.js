



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
var {height, width} = Dimensions.get('window');
class CreateTeamModel extends Component{

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

                    {/*团队名*/}
                    <View style={{
                        height: 30,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        margin: 5
                    }}>
                        <View style={{flex: 1}}>
                            <Text>团队名：</Text>
                        </View>
                        <View style={{
                            flex: 3,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            backgroundColor: '#eee',
                            borderRadius: 10
                        }}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft: 20, fontSize: 13, color: '#222'}}
                                placeholder="请输入团队名"
                                val={this.state.team.teamName}
                                onChangeText={
                                    (value) => {
                                        this.setState({team:Object.assign(this.state.team,{teamName:value})})
                                    }}
                            />
                        </View>
                    </View>


                    {/*备注*/}
                    <View style={{
                        height: 30,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        margin: 5
                    }}>
                        <View style={{flex: 1}}>
                            <Text>备注：</Text>
                        </View>
                        <View style={{
                            flex: 3,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            backgroundColor: '#eee',
                            borderRadius: 10
                        }}>
                            <TextInputWrapper
                                placeholderTextColor='#888'
                                textInputStyle={{marginLeft: 20, fontSize: 13, color: '#222'}}
                                placeholder="请输入备注"
                                val={this.state.team.remark}
                                onChangeText={
                                    (value) => {
                                        this.setState({team:Object.assign(this.state.team,{remark:value})})
                                    }}
                                onCancel={
                                    () => {
                                        this.setState({team:Object.assign(this.state.team,{remark:null})})
                                    }
                                }
                            />
                        </View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:40}}>
                        <TouchableOpacity style={{padding:10,paddingHorizontal:12,backgroundColor:'#66CDAA',borderRadius:4,width:width/2,
                            justifyContent:'center',flexDirection:'row'}}
                                          onPress={()=>{
                                              if(this.doCheck()==true)
                                              {
                                                  if(this.props.onConfirm)
                                                      this.props.onConfirm(this.state.team);

                                              }
                                              this.props.dispatch(enableCompetitionItemOnFresh());
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
)(CreateTeamModel);



