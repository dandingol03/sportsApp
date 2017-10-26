/**
 * Created by youli on 2017/10/23.
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
    Dimensions,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputWrapper from 'react-native-text-input-wrapper';
import CheckBox from 'react-native-check-box';
import ActionSheet from 'react-native-actionsheet';


var {height, width} = Dimensions.get('window');


class AddField extends Component{
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

    sendFieldToAddActivity(){
        // var time = {
        //     isSchedule:this.state.isSchedule,
        //     eventWeek:this.state.eventWeekNum,
        //     startTime:this.state.startTime,
        //     endTime:this.state.endTime,
        //
        //     startTimeView:this.state.startTimeView,
        var field=""
        this.state.field0.map((field0,i)=>{
            field+=field0.fieldno+","
        });
        field=field.substring(0,field.length-1);
        this.props.setField(field);
        this.goBack();

    }

    confirm()
    {
        if(this.props.onConfirm)
            this.props.onConfirm(this.state.val)
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
        this.dataSource=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        var _data=[{"fieldno":"场地1","check":false,"_id":0}];
        for(i=0;i<parseInt(this.props.yardTotal)-1;i++){
            _data.push({"fieldno":"场地"+(i+2),"check":false,"_id":i+1});
        }
        this.state={
            val:props.val,
            field0:[],
            datas:_data
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

    renderRow0(rowData,sectionId,rowId){

        var lineStyle=null;
        if(parseInt(rowId)%2==0)
        {
            lineStyle={flex:1,flexDirection:'row',padding:8,borderBottomWidth:1,borderLeftWidth:1,borderRightWidth:1,
                borderColor:'#ddd',justifyContent:'flex-start',backgroundColor:'#C4D9FF'};
        }else{
            lineStyle={flex:1,flexDirection:'row',padding:8,borderBottomWidth:1,borderLeftWidth:1,borderRightWidth:1,
                borderColor:'#ddd',justifyContent:'flex-start',backgroundColor:'#fff'}
        }

        var chebx=null;
        if(rowData.check==true)
        {
            chebx=<CheckBox
                style={{flex: 1, padding: 2}}
                onClick={()=>{
                        this.removeItem(rowData);
                       this.state.datas.map((data,i)=>{
                           if(data._id==rowId){
                              data.check=false;
                           }
                       })


                }}
                isChecked={true}
                leftText={null}
            />;
        }else{
            chebx=<CheckBox
                style={{flex: 1, padding: 2}}
                onClick={()=>{
                       this.addItem(rowData);
                       //this.setState({});
                       this.state.datas.map((data,i)=>{
                           if(data._id==rowId){
                              data.check=true;
                           }
                       })


                }}
                isChecked={false}
                leftText={null}
            />;
        }

        var row=
            <View>

                <View style={lineStyle}>



                    <View style={{flex:10,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:8,marginLeft:20}}>
                        <Text style={{color:'#000',fontWeight:'bold',fontSize:18}}>{rowData.fieldno+'\n'+rowData.check}</Text>
                    </View>

                    {
                        rowData.check==true?
                            <TouchableOpacity onPress={function() {

                            }}>
                                <View style={{}}>
                                    {chebx}
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={function() {

                            }}>

                                <View style={{marginRight:20,marginTop:15}}>
                                    {chebx}
                                </View>
                            </TouchableOpacity>

                    }

                </View>

            </View>;
        return row;
    }



    render(){




        //this.setState({datas:_data});
        //this.state.datas=_data;
        const ds0=this.dataSource.cloneWithRows(this.state.datas);

        var listView=null;
        listView=
            <ListView
                automaticallyAdjustContentInsets={false}
                dataSource={ds0}

                renderRow={this.renderRow0.bind(this)}
            />

        return (

            <View style={styles.container}>

                <ScrollView>
                    <View style={{margin:10,borderWidth:1,borderColor:'#343434'}}>
                        {listView}
                    </View>

                </ScrollView>

                <View style={{flex:1,padding:12,margin:4,flexDirection:'row',justifyContent:'center',alignItems:'flex-end',}}>
                    <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                            backgroundColor:'#fff',borderRadius:6,borderWidth:1,borderColor:'#66CDAA'}}
                                      onPress={()=>{ this.close(); }}>
                        <Text style={{color:'#66CDAA',padding:5}}>取消</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                                backgroundColor:'#66CDAA',borderRadius:6}}
                                      onPress={()=>{this.sendFieldToAddActivity()}}>
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


module.exports = AddField;

