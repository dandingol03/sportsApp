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
import ViewPager from 'react-native-viewpager';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Coach from '../components/Coach';

var IMGS = [
    require('../../img/banner1.jpeg'),
    require('../../img/banner2.jpeg'),
    require('../../img/banner3.jpeg'),
    require('../../img/banner4.jpeg'),
];


class Home extends Component {

    navigate2Coach()
    {
        const {navigator} =this.props;
        if(navigator) {
            navigator.push({
                name: 'Coach',
                component: Coach,
                params: {

                }
            })
        }
    }

    _renderPage(data, pageID) {
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
        var ds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});
        this.state = {
            dataSource: ds.cloneWithPages(IMGS),
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
                                alignItems: 'center',backgroundColor:'rgba(130, 222, 88, 0.88)'}}>

                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                <Text style={{color:'#fff',fontSize:18}}>健康猫</Text>
                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',paddingRight:20}}>

                            </View>


                        </View>
                    )}

                    renderFixedHeader={() => (
                        <View key="sticky-header" style={{height:55,width:width,paddingTop:20,flexDirection:'row',
                            justifyContent:'center',alignItems: 'center',backgroundColor:'transparent'}}>

                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                            </View>

                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                <Text style={{color:'#fff',fontSize:18}}>健康猫</Text>
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

                            <View style={{width:width,flex:2}}>
                                <ViewPager
                                    style={this.props.style}
                                    dataSource={this.state.dataSource}
                                    renderPage={this._renderPage}
                                    isLoop={true}
                                    autoPlay={true}
                                />
                            </View>


                            {/*内容区*/}
                            <View style={{flex:5,justifyContent:'center',backgroundColor:'#eee'}}>

                                <View style={{flex:3,backgroundColor:'#fff',padding:0,marginBottom:10}}>
                                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                        <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                          onPress={ ()=>{
                                             this.navigate2Coach();
                                           }}>
                                            <Icon name="shopping-basket" size={30} style={{justifyContent:'center',alignItems:'center'}} color="#66CD00" />
                                            <View style={{marginTop:0,padding:5,paddingTop:10}}>
                                                <Text style={{fontSize:13,color:'#343434'}}>找教练</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                          onPress={ ()=>{

                                          }}>

                                            <Icon name="shopping-cart" size={35} style={{justifyContent:'center',alignItems:'center'}} color="#EEAD0E" />
                                            <View style={{marginTop:0,padding:5}}>
                                                <Text style={{fontSize:13,color:'#343434'}}>健康商城</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                          onPress={ ()=>{

                                          }}>
                                            <Icon name="medkit" size={30} style={{justifyContent:'center',alignItems:'center'}} color="#EE6363" />
                                            <View style={{marginTop:0,padding:5,paddingTop:10}}>
                                                <Text style={{fontSize:13,color:'#343434'}}>运动馆</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                          onPress={ ()=>{

                                          }}>
                                            <Icon name="plane" size={35} style={{justifyContent:'center',alignItems:'center'}} color="#66CDAA" />
                                            <View style={{marginTop:0,padding:5}}>
                                                <Text style={{fontSize:13,color:'#343434'}}>健康定制</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                     <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                      onPress={ ()=>{

                                       }}>
                                        <Icon name="shopping-basket" size={30} style={{justifyContent:'center',alignItems:'center'}} color="#48D1CC" />
                                        <View style={{marginTop:0,padding:5,paddingTop:10}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>找教练</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                      onPress={ ()=>{

                                      }}>

                                        <Icon name="shopping-cart" size={35} style={{justifyContent:'center',alignItems:'center'}} color="#00B2EE" />
                                        <View style={{marginTop:0,padding:5,paddingTop:10}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>健康商城</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                      onPress={ ()=>{

                                      }}>
                                        <Icon name="medkit" size={32} style={{justifyContent:'center',alignItems:'center'}} color="#8968CD" />
                                        <View style={{marginTop:0,padding:5,paddingTop:10}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>运动馆</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                      onPress={ ()=>{

                                      }}>
                                        <Icon name="plane" size={35} style={{justifyContent:'center',alignItems:'center'}} color="#FFD700" />
                                        <View style={{marginTop:0,padding:5,paddingTop:7}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>健康定制</Text>
                                        </View>
                                    </TouchableOpacity>
                                    </View>

                                </View>


                                <View style={{flex:4,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',marginBottom:10}}>
                                     <Text>发现</Text>
                                </View>

                            </View>
                        </View>
                    )}
                >

                </ParallaxScrollView>

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

export default connect(mapStateToProps)(Home);
