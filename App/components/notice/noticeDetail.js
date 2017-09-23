
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
    InteractionManager,
    WebView
} from 'react-native';
import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';



var BGWASH = 'rgba(255,255,255,0.8)';

class NoticeDetail extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            content:props.rowData.content
        }
    }

    render()
    {
        return (
            <View style={styles.container}>

                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>咨询详情</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </TouchableOpacity>
                </View>

                <View style={{flex:3,padding:10}}>this.state.content</View>


            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});

export default  NoticeDetail
