
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

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewPager from 'react-native-viewpager';


var IMGS = [
    require('../../img/banner1.jpeg'),
    require('../../img/banner2.jpeg'),
    require('../../img/banner3.jpeg'),
    require('../../img/banner4.jpeg'),
];


class Found extends Component{

    _renderPage(data,pageID){
        return (

            <View style={{width:width}}>
                <Image
                    source={data}
                    style={{width:width,flex:3}}
                    resizeMode={"stretch"}
                />
            </View>

        );
    }

    constructor(props) {
        super(props);
        var ds=new ViewPager.DataSource({pageHasChanged:(p1,p2)=>p1!==p2});
        this.state={
            dataSource:ds.cloneWithPages(IMGS),
        }
    }

    render() {

        return (
            <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                <View style={{width:width,flex:1}}>
                    <ViewPager
                        style={this.props.style}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}
                    />
                </View>

                <View style={{flex:2,justifyContent:'center',alignItems: 'center',}}>
                    <Text>发现</Text>
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
