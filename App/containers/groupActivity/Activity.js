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
    Easing
} from 'react-native';

import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddActivity from './AddActivity';

class Activity extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    navigate2AddActivity(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'add_activity',
                component: AddActivity,
                params: {

                }
            })
        }
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <View style={styles.container}>

                <ParallaxScrollView
                    backgroundColor="#fff"
                    contentBackgroundColor="#fff"
                    backgroundSpeed={10}
                    parallaxHeaderHeight={height}
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={{height:55,width:width,paddingTop:20,flexDirection:'row',
                                alignItems: 'center',backgroundColor:'#aaa'}}>
                            <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                                <Icon name={'angle-left'} size={30} color="#343434"/>
                            </TouchableOpacity>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                <Text style={{color:'#343434',fontSize:18}}>群活动</Text>
                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',paddingRight:20}}>

                            </View>


                        </View>
                    )}

                    renderFixedHeader={() => (
                        <View key="sticky-header" style={{height:55,width:width,paddingTop:20,flexDirection:'row',
                            justifyContent:'center',alignItems: 'center',backgroundColor:'transparent'}}>

                            <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                                <Icon name={'angle-left'} size={30} color="#fff"/>
                            </TouchableOpacity>

                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                <Text style={{color:'#fff',fontSize:18}}>群活动</Text>
                            </View>
                            <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'flex-end',paddingRight:20,
                                alignItems: 'center',}}
                                onPress={()=>{
                                    alert('hi')
                                }}>
                                <Ionicons name='md-more' size={26} color="#fff"/>
                            </TouchableOpacity>
                        </View>
                    )}

                    renderForeground={() => (
                         <View style={{flex:1}}>

                            {/*内容区*/}
                            <View style={{flex:5,justifyContent:'center',backgroundColor:'#eee'}}>

                                <Image source={require('../../../img/badminton.jpeg')} style={{width:width,height:120}} resizeMode={"stretch"}/>

                                <View style={{flex:5,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',marginBottom:10}}>
                                     <Text>发现</Text>
                                </View>
                            </View>
                        </View>
                    )}
                >
                </ParallaxScrollView>

                <View style={{flex:5,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',position:'absolute',bottom:5}}>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',padding:10,borderTopWidth:1,borderColor:'#eee'}}>
                        <Text style={{color:'rgba(130, 222, 88, 0.88)',}}>我的邀约</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',padding:5,borderWidth:1,borderColor:'#eee',borderRadius:50}}
                    onPress={()=>{this.navigate2AddActivity();}}>
                        <Icon name={'plus-circle'} size={35} color='rgba(130, 222, 88, 0.88)'/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',padding:10,borderTopWidth:1,borderColor:'#eee'}}>
                        <Text style={{color:'rgba(130, 222, 88, 0.88)',}}>我的报名</Text>
                    </View>
                </View>

            </View>
        );
    }

}

var styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});

const mapStateToProps = (state, ownProps) => {

    const props = {}
    return props
}

export default connect(mapStateToProps)(Activity);

