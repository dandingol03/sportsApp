import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Text,
    NavigatorIOS
} from 'react-native';

import Third from './Third';



class RealView extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#D733CC', justifyContent: 'center', alignItems: 'center'}}>


                <Text onPress={()=>{
                    this.props.navigator.push({
                        component: Third,
                    })
                }}>
                    Native Controller, RN View, 带过来的参数是：{this.props.text}
                </Text>
            </View>
        )
    }
}

export default class NextSecond extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <NavigatorIOS

                initialRoute={{
                    component: RealView,
                    title: 'RealView',
                    passProps:{text: this.props.text}

                }}
                barTintColor= 'cyan'
                style={{flex: 1}}


            />



        );
    }
}



AppRegistry.registerComponent('NextSecond', ()=> NextSecond);
