/**
 * Created by dingyiming on 2017/11/5.
 */
import React, { Component, PropTypes } from 'react';
import {
    requireNativeComponent,
    View,
    NativeModules,
    Platform,
    DeviceEventEmitter } from 'react-native';

var RCTPushStreamView = requireNativeComponent('RCTPushStreamView', PushStreamView);

export default class PushStreamView extends Component {
    static propTypes = {


    };

    componentDidMount() {

        console.log("RCTPushStreamView被加载了");
    }

    render() {
        return <RCTPushStreamView {...this.props}/>;
    }
}