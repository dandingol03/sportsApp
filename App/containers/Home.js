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
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Coach from '../components/Coach';
import BadmintonCourse from '../components/course/BadmintonCourse';
import Mall from './mall/Home';
import Activity from './groupActivity/Activity';
import Register from './Register';


var IMGS = [
    require('../../img/banner1.jpeg'),
    require('../../img/banner2.jpeg'),
    require('../../img/banner3.jpeg'),
    require('../../img/banner4.jpeg'),
];


class Home extends Component {

    navigate2Register(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'register',
                component: Register,
                params: {

                }
            })
        }
    }

    navigate2Activity(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'activity',
                component: Activity,
                params: {

                }
            })
        }
    }

    navigate2Mall(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'mall',
                component: Mall,
                params: {

                }
            })
        }
    }

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

    //导航至定制
    navigate2BadmintonCourse()
    {
        const {navigator} =this.props;
        if(navigator) {
            navigator.push({
                name: 'BadmintonCourse',
                component: BadmintonCourse,
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
                                alignItems: 'center',backgroundColor:'#66CDAA'}}>

                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:20}}>
                                <Text style={{color:'#fff',fontSize:18}}>SportsHot</Text>
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
                                <Text style={{color:'#fff',fontSize:18}}>SportsHot</Text>
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

                                <View style={{flex:2,backgroundColor:'#fff',padding:0,marginBottom:10}}>
                                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>

                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',flexDirection:'column',
                                        padding:5,paddingVertical:0}}
                                      onPress={ ()=>{
                                          this.navigate2Mall();
                                          console.log('健康商城');
                                      }}>

                                        <Icon name="shopping-cart" size={36} color="#EEAD0E" style={{paddingBottom:4}}/>
                                        <View style={{marginTop:0,paddingTop:0}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>商城</Text>
                                        </View>
                                    </TouchableOpacity>


                                     <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                          onPress={ ()=>{
                                             this.navigate2BadmintonCourse();
                                          }}>

                                        <CommIcon name="tag-plus" size={32} color="#0adc5e" style={{backgroundColor:'transparent'}}/>
                                        <View style={{marginTop:0,paddingTop:6}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>课程制定</Text>
                                        </View>
                                    </TouchableOpacity>



                                    <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:5}}
                                      onPress={ ()=>{
                                        this.navigate2Activity();
                                      }}>
                                        <Icon name="group" size={30} color="#66CDAA" />
                                        <View style={{marginTop:0,paddingTop:10}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>群活动</Text>
                                        </View>
                                    </TouchableOpacity>

                                     <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:5}}
                                      onPress={ ()=>{
                                         this.navigate2Market(vegetable);
                                         console.log('找教练');
                                       }}>
                                        <Icon name="video-camera" size={30} color="#8968CD" />
                                        <View style={{marginTop:0,paddingTop:10}}>
                                            <Text style={{fontSize:13,color:'#343434'}}>直播间</Text>
                                        </View>
                                    </TouchableOpacity>
                                    </View>


                                </View>


                                <View style={{flex:5,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#fff',marginBottom:10}}>
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
