/**
 * Created by danding on 17/11/23.
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
import  Video from 'react-native-video'
class VideoT extends Component {


    constructor(props) {
        super(props);
        this.state = {
            duration: 0.0,
        }
    }

    onLoad = (data) => {
        this.setState({ duration: data.duration });
    }

    onProgress = (data) => {
        console.log(data.currentTime+'/'+this.state.duration)
    };

    render() {

        return(
            <View style={styles.container}>
                <Video source={ {uri:"http://qiubai-video.qiushibaike.com/A14EXG7JQ53PYURP.mp4"}} // Looks for .mp4 file (background.mp4) in the given expansion version.
                       ref={(ref) => {
                            this.player = ref
                        }}
                       rate={1.0}                   // 0 is paused, 1 is normal.
                       volume={1.0}                 // 0 is muted, 1 is normal.
                       muted={false}                // Mutes the audio entirely.
                       paused={false}               // Pauses playback entirely.
                       resizeMode="contain"           // Fill the whole screen at aspect ratio.
                       repeat={true}                // Repeat forever.
                       onLoad={(data)=>{
                           this.state.duration=data.duration
                       }}

                       style={styles.backgroundVideo} />
            </View>
        )


    }

    componentDidMount(){
        this.player.presentFullscreenPlayer()
        this.player.seek(2)
    }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }

});

export default connect()(VideoT);
