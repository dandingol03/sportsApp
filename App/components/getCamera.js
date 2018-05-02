
import React, {Component} from 'react';
import RNFS from 'react-native-fs';
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
    Alert,
    InteractionManager
} from 'react-native';


import {connect} from 'react-redux';
import  Camera from 'react-native-camera'
import Config from "../../config";
import proxy from "../utils/Proxy";
class getCamera extends Component {


    constructor(props) {
        super(props);
        this.state = {
            duration: 0.0,
        }
    }

    render() {

        return(
            <View style={styles.container}>
                <Camera
                    ref={(cam)=>{
                        this.camera=cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[拍照]</Text>

                </Camera>
            </View>
        );
    }

    takePicture(){
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => {
                console.log(data);
                RNFS.readFile(data.path,'base64').then((content)=>{

                    proxy.postes({
                        url: Config.server + '/func/allow/aipface',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: {
                            img:content
                        }
                    }).then((json) => {
                        var data = json.data;

                        if (data !== null && data !== undefined && data !== "") {

                            alert("学号为"+data+"的学生签到成功");
                            // this.getTalkingFarm();
                            // this.setState({usertextinput: null});

                        }
                    }).catch((err) => {
                        alert(err);
                    });

                    //console.log("content",content);
                })
            }

            )
            .catch(err => console.error(err));
    }

    getBase64Image(img){
        var canvas=document.createElement("canvas");
        canvas.width=img.width;
        canvas.height=img.height;
        var ctx=canvas.getContext("2d");
        ctx.drawImage(img,0,0,img.width,img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
        var dataURL = canvas.toDataURL("image/"+ext);
        console.log(dataURL);
    }

    componentDidMount(){

    }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }

});

export default connect()(getCamera);
