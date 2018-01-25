/**
 * Created by danding on 17/11/25.
 */
import React, {Component} from 'react';

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
import  VideoView from '../native/VideoView'

var {height, width} = Dimensions.get('window');

class VideoViewT extends Component {


    constructor(props) {
        super(props);
        this.state = {
            duration: 0.0,
        }
    }

    render() {``

        var newsUrl="http://flashmedia.eastday.com/newdate/news/2016-11/shznews1125-19.mp4"
        var remoteUrl="http://202.194.14.73/accDownload?accId=368"


        return(
            <View style={styles.container}>
               <VideoView url={remoteUrl}
                          ref={(videoView)=>{
                              this.videoView=videoView
                          }}
                          onPrepared={(duration)=>{
                              console.log(duration)
                          }}
                          style={{width:width,height:300}}/>

                <View style={{flexDirection:'row',width:width,paddingTop:10,paddingBottom:10,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity style={{padding: 2, paddingLeft: 6, paddingRight: 6,
                            borderRadius:2,backgroundColor:'#088'}}
                                      onPress={()=>{
                                          if(this.videoView)
                                              this.videoView.start()
                                      }}
                    >
                        <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold'}}>
                            start
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )


    }


}

var styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }

});

export default connect()(VideoViewT);
