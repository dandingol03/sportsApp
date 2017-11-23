/**
 * Created by youli on 2017/11/4.
 */

import React from 'react';
import ReactNative from 'react-native';
const {
    AppRegistry,
    Text
} = ReactNative;

export  default  class  GroupJPush extends  React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Text> JIU SHI GAN </Text>
        );
    }
}
AppRegistry.registerComponent('GroupPushActivity',()=>GroupJPush)
