/**
 * Created by youli on 2018/1/24.
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
import DateFilter from '../../../utils/DateFilter';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import CheckBox from 'react-native-check-box';

var {height, width} = Dimensions.get('window');


class CoachLevelModal extends Component{

    close(){
        if(this.props.onClose!==undefined&&this.props.onClose!==null)
        {
            this.props.onClose();
        }
    }

    confirm()
    {
        if(this.props.onConfirm)
            this.props.onConfirm(this.state.val)
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

    addItem = item => {
        this.setState({field0: [...this.state.field0, item]})
    };
    removeItem = removedItem => {
        this.setState({
            field0: this.state.field0.filter(item => {
                if (item._id !== removedItem._id)
                    return item;
            })
        });
    };

    constructor(props)
    {
        super(props);
        this.dataSource=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        var _data=[{"fieldno":1,"check":false,"_id":0}];
        for(i=0;i<6;i++){
            _data.push({"fieldno":(i+2),"check":false,"_id":i+1});
        }
        this.state={
            val:props.val,
            field0:[],
            datas:{check0:false,check1:false,check2:false,check3:false,check4:false,check5:false}
        }
    }

    render(){

        var field=""
        this.state.field0.map((field0,i)=>{
            field+=field0.state+","
        });
        field=field.substring(0,field.length-1);
        return (

            <View style={styles.container}>

                <View style={{padding:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:4}}>
                        <Text style={{color:'#222',fontSize:17,fontWeight:'bold'}}>修改教练星级</Text>
                    </View>
                    <View style={{flexDirection:'column',alignItems:'center',padding:4,paddingTop:15,borderBottomWidth:1,borderColor:'#66CDAA'}}>

                        {this.state.datas.check0==false?
                            <TouchableOpacity style={{padding:1,margin:2,flexDirection:'row',justifyContent:'center',alignItems:'center',
}}
                                              onPress={()=>{ }}>
                                <CheckBox
                                    style={{padding: 2}}
                                    onClick={()=>{
                                     this.setState({datas:Object.assign(this.state.datas,{check0:true})})
                                     this.addItem({state:"一星级教练",_id:0});
                                }}
                                    isChecked={false}
                                    leftText={null}
                                />

                                <Text style={{color:'#000',padding:5}}>一星级教练</Text>
                            </TouchableOpacity>:
                            <TouchableOpacity style={{padding:1,margin:2,flexDirection:'row',justifyContent:'center',alignItems:'center',
}}
                                              onPress={()=>{ }}>
                                <CheckBox
                                    style={{padding: 2}}
                                    onClick={()=>{
                                this.setState({datas:Object.assign(this.state.datas,{check0:false})})
                                   this.removeItem({state:"一星级教练",_id:0})
                                }}
                                    isChecked={true}
                                    leftText={null}
                                />

                                <Text style={{color:'#000',padding:5}}>一星级教练</Text>
                            </TouchableOpacity>
                        }

                        {this.state.datas.check1==false?
                            <TouchableOpacity style={{padding:1,margin:2,flexDirection:'row',justifyContent:'center',alignItems:'center',
}}
                                              onPress={()=>{ }}>
                                <CheckBox
                                    style={{padding: 2}}
                                    onClick={()=>{
                                     this.setState({datas:Object.assign(this.state.datas,{check1:true})})
                                     this.addItem({state:"二星级教练",_id:1});

                                }}
                                    isChecked={false}
                                    leftText={null}
                                />

                                <Text style={{color:'#000',padding:5}}>二星级教练</Text>
                            </TouchableOpacity>:
                            <TouchableOpacity style={{padding:1,margin:2,flexDirection:'row',justifyContent:'center',alignItems:'center',
}}
                                              onPress={()=>{ }}>
                                <CheckBox
                                    style={{padding: 2}}
                                    onClick={()=>{
                                    this.setState({datas:Object.assign(this.state.datas,{check1:false})})
                                   this.removeItem({state:"二星级教练",_id:1})

                                }}
                                    isChecked={true}
                                    leftText={null}
                                />

                                <Text style={{color:'#000',padding:5}}>二星级教练</Text>
                            </TouchableOpacity>
                        }

                        {this.state.datas.check2==false?
                            <TouchableOpacity style={{padding:1,margin:2,flexDirection:'row',justifyContent:'center',alignItems:'center',
}}
                                              onPress={()=>{ }}>
                                <CheckBox
                                    style={{padding: 2}}
                                    onClick={()=>{
                                        this.setState({datas:Object.assign(this.state.datas,{check2:true})})
                                     this.addItem({state:"三星级教练",_id:2});

                                }}
                                    isChecked={false}
                                    leftText={null}
                                />

                                <Text style={{color:'#000',padding:5}}>三星级教练</Text>
                            </TouchableOpacity>:
                            <TouchableOpacity style={{padding:1,margin:2,flexDirection:'row',justifyContent:'center',alignItems:'center',
}}
                                              onPress={()=>{ }}>
                                <CheckBox
                                    style={{padding: 2}}
                                    onClick={()=>{
                                     this.setState({datas:Object.assign(this.state.datas,{check2:false})})
                                   this.removeItem({state:"三星级教练",_id:2})

                                }}
                                    isChecked={true}
                                    leftText={null}
                                />

                                <Text style={{color:'#000',padding:5}}>三星级教练</Text>
                            </TouchableOpacity>
                        }

                        {this.state.datas.check3==false?
                            <TouchableOpacity style={{padding:1,margin:2,flexDirection:'row',justifyContent:'center',alignItems:'center',
}}
                                              onPress={()=>{}}>
                                <CheckBox
                                    style={{padding: 2}}
                                    onClick={()=>{
                                        this.setState({datas:Object.assign(this.state.datas,{check3:true})})
                                     this.addItem({state:"四星级教练",_id:3});

                                }}
                                    isChecked={false}
                                    leftText={null}
                                />

                                <Text style={{color:'#000',padding:5}}>四星级教练</Text>
                            </TouchableOpacity>:
                            <TouchableOpacity style={{padding:1,margin:2,flexDirection:'row',justifyContent:'center',alignItems:'center',
}}
                                              onPress={()=>{ }}>
                                <CheckBox
                                    style={{padding: 2}}
                                    onClick={()=>{
                                   this.setState({datas:Object.assign(this.state.datas,{check3:false})})
                                   this.removeItem({state:"四星级教练",_id:3})

                                }}
                                    isChecked={true}
                                    leftText={null}
                                />

                                <Text style={{color:'#000',padding:5}}>四星级教练</Text>
                            </TouchableOpacity>
                        }

                        {this.state.datas.check4==false?
                            <TouchableOpacity style={{padding:1,margin:2,flexDirection:'row',justifyContent:'center',alignItems:'center',
}}
                                              onPress={()=>{  }}>
                                <CheckBox
                                    style={{padding: 2}}
                                    onClick={()=>{
                                      this.setState({datas:Object.assign(this.state.datas,{check4:true})})
                                     this.addItem({state:"五星级教练",_id:4});

                                }}
                                    isChecked={false}
                                    leftText={null}
                                />

                                <Text style={{color:'#000',padding:5}}>五星级教练</Text>
                            </TouchableOpacity>:
                            <TouchableOpacity style={{padding:1,margin:2,flexDirection:'row',justifyContent:'center',alignItems:'center',
}}
                                              onPress={()=>{ }}>
                                <CheckBox
                                    style={{padding: 2}}
                                    onClick={()=>{
                                  this.setState({datas:Object.assign(this.state.datas,{check4:false})})
                                   this.removeItem({state:"五星级教练",_id:4})

                                }}
                                    isChecked={true}
                                    leftText={null}
                                />

                                <Text style={{color:'#000',padding:5}}>五星级教练</Text>
                            </TouchableOpacity>
                        }




                        <TextInputWrapper
                            placeholderTextColor='#888'
                            textInputStyle={{marginLeft:4,color:'#222',fontSize:15}}
                            placeholder=""
                            val={this.state.val}
                            onChangeText={
                                    (value)=>{
                                        this.setState({val:value})
                                    }}
                            onCancel={
                                    ()=>{

                                    }}
                        />
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',padding:6}}>
                        <Text style={{color:'#777',fontSize:12}}>
                            请如实选择您的真实资质情况
                        </Text>
                        {/*<Text style={{color:'#777',fontSize:12}}>*/}
                            {/*{field}*/}
                        {/*</Text>*/}

                    </View>
                </View>


                <View style={{flex:1,padding:2,margin:4,flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
                    <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                            backgroundColor:'#fff',borderRadius:6,borderWidth:1,borderColor:'#66CDAA'}}
                                      onPress={()=>{ this.close(); }}>
                        <Text style={{color:'#66CDAA',padding:5}}>取消</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                                backgroundColor:'#66CDAA',borderRadius:6}}
                                      onPress={()=>{
                                          this.setState({val:field});
                                          this.confirm();
                                      }}>
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


module.exports = CoachLevelModal;

