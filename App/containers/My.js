import React,{Component} from 'react';
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
    Easing
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

class Home extends Component{

    constructor(props) {
        super(props);
        this.state={
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1)
        }
    }

    render() {

        return (
            <View style={{flex:1}}>
                <View style={{flex:2}}>
                    <Image style={{flex:2,width:width,position:'relative'}} source={require('../../img/my_banner.jpeg')} >

                    </Image>
                </View>
                <View style={{flex:5,backgroundColor:'#eee'}}>
                    <View style={{flex:12,backgroundColor:'#fff'}}>
                        <View style={{flex:1,backgroundColor:'#fff',flexDirection:'row',}}>
                            <View style={{flex:1,backgroundColor:'#66CDAA',flexDirection:'row',borderRadius:20}}>
                                <Icon name={'group'} size={30} color="#fff"/>
                            </View>
                            <View style={{height:55,backgroundColor:'#fff',flexDirection:'row',}}>
                                <Text>我的群</Text>
                            </View>

                        </View>
                        <View style={{height:55,backgroundColor:'#fff',flexDirection:'row',}}>
                            <View>
                                <Icon name={'angle-left'} size={30} color="#fff"/>
                            </View>
                            <View>
                                <Text>我的资料</Text>
                            </View>

                        </View>
                        <View style={{height:55,backgroundColor:'#fff',flexDirection:'row',}}>
                            <View>
                                <Icon name={'angle-left'} size={30} color="#fff"/>
                            </View>
                            <View>
                                <Text>设置</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex:1,backgroundColor:'#eee'}}>

                    </View>
                </View>
            </View>
        );
    }

}

var styles = StyleSheet.create({


});

const mapStateToProps = (state, ownProps) => {

    const props = {

    }
    return props
}

export default connect(mapStateToProps)(Home);
