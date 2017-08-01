
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
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CoachList from '../components/course/CoachList';
import Venue from '../components/venue/SelectVenue';

class Found extends Component{

    navigate2CoachList(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'coachList',
                component: CoachList,
                params: {

                }
            })
        }
    }


    navigate2Venue(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'venue',
                component: Venue,
                params: {

                }
            })
        }
    }


    constructor(props) {
        super(props);
        this.state={

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
                    <View style={{flex:12,backgroundColor:'#eee'}}>
                        <TouchableOpacity style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                          onPress={()=>{
                            this.navigate2CoachList();
                        }}>
                            <View style={{flex:1,backgroundColor:'#FF69B4',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                            justifyContent:'center',alignItems: 'center'}}>
                                <Icon name={'group'} size={18} color="#fff"/>
                            </View>
                            <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                                <Text>教练列表</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:45,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                          onPress={()=>{
                            this.navigate2Venue();
                        }}
                        >

                            <View style={{flex:1,backgroundColor:'#FFEC8B',flexDirection:'row',borderRadius:30,padding:5,margin:5,
                            justifyContent:'center',alignItems: 'center'}}>
                                <Icon name={'user'} size={20} color="#fff"/>
                            </View>
                            <View style={{flex:12,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                                <Text>场馆列表</Text>
                            </View>

                        </TouchableOpacity>


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

export default connect(mapStateToProps)(Found);
