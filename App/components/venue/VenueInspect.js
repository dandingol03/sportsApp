
import React,{Component} from 'react';
import {
    Alert,
    Dimensions,
    TextInput,
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
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

import {
    localSearch,
    fetchMaintainedVenue
} from '../../action/MapActions';



class VenueInspect extends Component{

    constructor(props) {
        super(props);
        this.state={
            mayType: MapTypes.NORMAL,
            zoom: 12,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            marker: {
                latitude: props.center.latitude,
                longitude: props.center.longitude,
                title: '您的位置'
            },
            center:props.center,
            detailPosition:new Animated.Value(0)
        }
    }

    render()
    {
        return(
            <View style={styles.container}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',
                    backgroundColor:'#66CDAA',borderBottomWidth:1,borderColor:'#66CDAA'}}>

                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>附近球馆</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </TouchableOpacity>
                </View>

                <View style={{flex:1}}>
                    <MapView
                        trafficEnabled={this.state.trafficEnabled}
                        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                        zoom={this.state.zoom}
                        mapType={this.state.mapType}
                        center={this.state.center}
                        marker={this.state.marker}
                        markers={this.state.markers}
                        style={styles.map}
                        onMarkerClick={(e) => {

                            var {position}=e;

                            var {detailDisplay}=this.state;
                            if(detailDisplay==true)//已经显示
                            {
                                Animated.timing(this.state.detailPosition, {
                                    toValue: 0, // 目标值
                                    duration: 200, // 动画时间
                                    easing: Easing.linear // 缓动函数
                                }).start();
                            }

                            setTimeout(()=>{
                                 Animated.timing(this.state.detailPosition, {
                                    toValue: 1, // 目标值
                                    duration: 200, // 动画时间
                                    easing: Easing.linear // 缓动函数
                                }).start();
                            },200)

                            if(detailDisplay!=true)
                                this.setState({detailDisplay:true})

                          }}
                    >
                        <Animated.View style={[{flexDirection:'row',width:width,height:50,justifyContent:'center',alignItems:'center',
                                backgroundColor:'#fff'},
                                {top:this.state.detailPosition.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [50, 0]
                                })}]}>
                            <Text>dwdw</Text>
                        </Animated.View>

                    </MapView>
                </View>

            </View>
        )
    }

    componentDidMount()
    {
        // this.props.dispatch(localSearch(this.props.center,'羽毛球馆')).then((json)=>{
        //     console.log()
        // })

        this.props.dispatch(fetchMaintainedVenue()).then((json)=>{
            if(json.re==1)
            {
                var venues=json.data;

                var markers=[];
                venues.map(function (venue,i) {
                    markers.push({
                        latitude: parseFloat(venue.latitude),
                        longitude: parseFloat(venue.longitude),
                        title:venue.name
                    });
                })
                this.setState({markers:markers});
            }
        })

        // setTimeout(()=>{
        //
        //     Animated.timing(this.state.detailPosition, {
        //         toValue: 1, // 目标值
        //         duration: 300, // 动画时间
        //         easing: Easing.linear // 缓动函数
        //     }).start();
        //     this.setState({detailDisplay:true})
        //
        // },300)
    }
}


var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    map: {
        width: Dimensions.get('window').width,
        flex:1,
        marginBottom: 0,
        justifyContent:'flex-end'
    }
});

const mapStateToProps = (state, ownProps) => {

    const props = {
        center:state.map.center
    }
    return props
}


export default connect(mapStateToProps)(VenueInspect);
