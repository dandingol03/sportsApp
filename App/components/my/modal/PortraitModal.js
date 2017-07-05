
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
var ImagePicker = require('react-native-image-picker');
var {height, width} = Dimensions.get('window');
import {
    uploadPortrait
} from '../../../action/UserActions';

class PortraitModal extends Component{

    close(){
        if(this.props.onClose!==undefined&&this.props.onClose!==null)
        {
            this.props.onClose();
        }
    }

    storePicture(){

        var {portrait}=this.state;

        if (portrait) {
            this.props.dispatch(uploadPortrait(portrait)).then((json)=>{
                if(json.re==1){
                    alert('上传成功');
                    this.close();
                }
            })

        }else{
            Alert.alert(
                '错误',
                '请先进行拍照'
            );
        }
    }

    confirm()
    {
        if(this.props.onConfirm!==undefined&&this.props.onConfirm!==null)
        {
            this.props.onConfirm(this.state.portrait);
        }
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

    showImagePicker(){

        var options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            title:'请选择',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'图库',
            cancelButtonTitle:'取消',

        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({portrait: source.uri});
                console.log('portrait.uri = ', response.uri);
            }
        });
    }

    constructor(props)
    {
        super(props);
        this.state={
            portrait:null,
        }
    }

    render(){


        return (

            <View style={styles.container}>
                <View style={{margin:10}}>
                    <Text>上传头像</Text>
                </View>

                <View style={{marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                    {
                        this.state.portrait!==undefined&&this.state.portrait!==null?
                        <TouchableOpacity style={{height:height*90/736,width:height*90/736,borderRadius:height*45/736}}
                                          onPress={()=>{
                                          this.showImagePicker()
                                    }}>
                            <Image resizeMode="stretch" style={{height:height*100/736,width:height*100/736,
                            borderRadius:height*50/736}} source={{uri:this.state.portrait}}/>
                        </TouchableOpacity> :
                            <TouchableOpacity style={{height:height*90/736,width:height*90/736,borderRadius:height*45/736}}
                                              onPress={()=>{
                                          this.showImagePicker()
                                    }}>
                                <Image resizeMode="stretch" style={{height:height*100/736,width:height*100/736,borderRadius:height*50/736}}
                                       source={require('../../../../img/portrait.jpg')}/>
                            </TouchableOpacity>
                    }
                </View>

                <View style={{flex:1,padding:2,margin:4,flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
                    <TouchableOpacity style={{flex:1,padding:2,margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',
                            backgroundColor:'#fff',borderRadius:6,borderWidth:1,borderColor:'#66CDAA'}}
                                      onPress={()=>{ this.close(); }}>
                        <Text style={{color:'#66CDAA',padding:5}}>取消</Text>
                    </TouchableOpacity>

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


module.exports = PortraitModal;


