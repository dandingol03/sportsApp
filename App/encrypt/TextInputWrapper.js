
import React, {Component} from 'react';
import {

    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Platform,
    Animated
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'
class TextInputWrapper extends Component{

    constructor(props) {
        super(props);
        this.state={
            fadeCancel: new Animated.Value(0),
            val:props.val?props.val:null
        }
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState(nextProps)
    }

    render() {

        var defaultStyle1={
            flex:1,
            paddingLeft:0,
            paddingRight:10,
            paddingTop:2,
            paddingBottom:2,
            fontSize:16
        }

        var defaultStyle2={
            opacity: this.state.fadeCancel,
            backgroundColor:'transparent',
            padding:4,
            marginRight:8
        }

        var {textInputStyle,cancelStyle,iconStyle,placeholderTextColor}=this.props

        var style1=Object.assign(defaultStyle1,textInputStyle)

        var style2=Object.assign(defaultStyle2,cancelStyle)

        var name='md-close-circle'
        var size=18
        var color='red'

        if(iconStyle)
        {
            if(iconStyle.name)
                name=iconStyle.name
            if(iconStyle.size)
                size=iconStyle.size
            if(iconStyle.color)
                color=iconStyle.color
        }

        return (
            <View style={styles.container}>
                <TextInput
                    style={style1}

                    onChangeText={(val) => {

                      if( val&&val!='')//不为空
                      {
                             Animated.timing(
                            this.state.fadeCancel,
                            {toValue: 1},
                        ).start();
                      }else{
                             Animated.timing(
                            this.state.fadeCancel,
                            {toValue: 0},
                         ).start();

                      }
                      this.setState({val:val});
                      if(this.props.onChangeText)
                           this.props.onChangeText(val)
                    }}
                    onBlur={()=>{
                       if(this.state.fadeCancel==0)
                       {}
                       else{
                             Animated.timing(
                            this.state.fadeCancel,
                            {toValue: 0},
                         ).start();
                       }
                    }}
                    value={this.state.val}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={placeholderTextColor?placeholderTextColor:'#aaa'}
                    underlineColorAndroid="transparent"
                />
                <Animated.View style={style2}>
                    <TouchableOpacity onPress={()=>{

                        this.setState({val:null});
                        Animated.timing(
                                this.state.fadeCancel,
                                {toValue: 0},
                             ).start();
                        if(this.props.onCancel)
                            this.props.onCancel()

                    }}>
                        <Ionicons name={name} size={size} color={color}/>
                    </TouchableOpacity>
                </Animated.View>
            </View>

        )
    }
}


var styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row'
    }
})
export default TextInputWrapper
