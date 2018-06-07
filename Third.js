import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';


export default class Third extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#45D733', justifyContent: 'center', alignItems: 'center'}}>
                <Text>
                    终于回到了 RN
                </Text>


                <Text style={{margin: 30}}>
                    {this.props.text}
                </Text>
            </View>
        );
    }
}
