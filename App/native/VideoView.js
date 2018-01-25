'use strict';

import React,{PropTypes,Component} from 'react';
import {
    NativeModules,
    View,
    requireNativeComponent,
    UIManager,
    findNodeHandle
} from 'react-native';



class Video extends Component {
    constructor(props) {
        super(props);
    }

    start(){
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs["videoView"]),
            UIManager.VideoView.Commands.start,//Commands.pause与native层定义的COMMAND_PAUSE_NAME一致
            null//命令携带的参数数据
        );
    }

    _onPrepared(event){
        if(!this.props.onPrepared){
            return;
        }
        this.props.onPrepared(event.nativeEvent.duration);
    }

    render() {
        return (
            <VideoView {...this.props} ref="videoView"
                onPrepared={this._onPrepared.bind(this)}
            />
        );
    }
}

Video.propTypes = {
    ...View.propTypes,
    touchEnabled:PropTypes.bool,
    url:PropTypes.string,
    onPrepared:PropTypes.func,
}

var VideoView = requireNativeComponent('VideoView', Video);

module.exports=Video
