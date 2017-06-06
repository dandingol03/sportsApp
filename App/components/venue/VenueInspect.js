
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
            detailPosition:new Animated.Value(0),
            detail:{

            }
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

                            var {position,title}=e;

                            //TODO:get address by title
                            var detail=null
                            this.state.venues.map((venue,i)=>{
                                if(venue.name==title)
                                {
                                    detail=venue
                                }
                            })


                            if(this.state.detail)//已经显示poi详情
                            {
                                Animated.timing(this.state.detailPosition, {
                                    toValue: 0, // 目标值
                                    duration: 200, // 动画时间
                                    easing: Easing.linear // 缓动函数
                                }).start();
                            }

                            if(detail)
                            {
                                  setTimeout(()=>{

                                        this.setState({detail:detail})
                                         Animated.timing(this.state.detailPosition, {
                                            toValue: 1, // 目标值
                                            duration: 200, // 动画时间
                                            easing: Easing.linear // 缓动函数
                                        }).start();
                                    },200)

                            }



                          }}
                    >
                        <Animated.View style={[{flexDirection:'row',width:width,height:70,alignItems:'center',
                                backgroundColor:'#fff',borderTopWidth:1,borderColor:'#ddd'},
                                {top:this.state.detailPosition.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [70, 0]
                                })}]}>
                            <View style={{flex:1,flexDirection:'column'}}>
                                <View style={{flex:1,flexDirection:'row',padding:4,paddingHorizontal:4,paddingBottom:2}}>
                                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                        <Text style={{fontSize:13,fontWeight:'bold'}}>
                                            {this.state.detail.name}
                                        </Text>
                                    </View>

                                </View>

                                <View style={{flexDirection:'row',padding:3,marginBottom:10,alignItems:'center'}}>

                                    <Icon name={'map-marker'} size={18} color="#444" style={{marginRight:5}}/>
                                    <Text style={{fontSize:13,color:'#888'}}>
                                        {this.state.detail.address}
                                    </Text>
                                </View>
                            </View>

                            <View style={{width:60,marginLeft:15,marginRight:10,flexDirection:'row',alignItems:'center',borderRadius:3,padding:4,paddingHorizontal:6,
                                        backgroundColor:'#008B00',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:13,fontWeight:'bold'}}>
                                    去导航
                                </Text>
                            </View>



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
                        title:venue.name,
                    });
                })
                this.setState({markers:markers,venues:venues});
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
