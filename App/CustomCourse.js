

import React, {Component} from 'react';
import {
    Dimensions,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    TextInput,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper'

var {height, width} = Dimensions.get('window');

class CustomCourse extends Component{
    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state={
            isRefreshing:false,
        };
    }

    render(){

        return (
            <View style={styles.container}>
                <Toolbar width={width} title="我的定制"
                         actions={[
                            { icon: ACTION_ADD, value: '', show: OPTION_SHOW },
                            { value: '发布定制', show: OPTION_NEVER },
                        ]}
                         onPress={(i)=>{
                             console.log(i)
                         }}
                >
                   <View style={{"flexDirection":"row","justifyContent":"flex-start","alignItems":"center","backgroundColor":"rgba(74,144,226,1)"}}>
                   </View>


                </Toolbar>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    popoverContent: {
        width: 100,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText: {
        color: '#ccc',
        fontSize:14
    }
});

export default  CustomCourse
