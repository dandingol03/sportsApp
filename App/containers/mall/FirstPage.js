
import React,{Component} from 'react';
import {
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
    Easing
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome';
import ViewPager from 'react-native-viewpager';

import ProductsList from './ProductsList';
import ShopCart from './ShopCart';

var IMGS = [
    require('../../../img/banner1.jpeg'),
    require('../../../img/banner2.jpeg'),
    require('../../../img/banner3.jpeg'),
    require('../../../img/banner4.jpeg'),
];

class Home extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    navigate2ProductsList(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'products_list',
                component: ProductsList,
                params: {

                }
            })
        }
    }

    navigate2ShopCart(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'shop_cart',
                component: ShopCart,
                params: {

                }
            })
        }
    }

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
            goodName:null,
        }
    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:'#eee'}}>

                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#66CDAA'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                    onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>羽毛球热</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.navigate2ShopCart();}}>
                        <Text style={{color:'#fff',fontSize:18}}>购物车</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width:width,height:height,backgroundColor:'#eee'}}>
                    <View style={{width:width,height:height*0.3}}>
                        <ViewPager
                            style={this.props.style}
                            dataSource={this.state.dataSource}
                            renderPage={this._renderPage}
                            isLoop={true}
                            autoPlay={true}
                        />
                    </View>

                    {/*//搜索框*/}
                    <View style={{position:'absolute',top:30*height/736,width:width,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>

                        <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#rgba(255, 255, 255, 0.6)',borderRadius:50,}}>
                            <View style={{backgroundColor:'transparent',marginLeft:10,padding:4}}>
                                <Icon name={'search'} size={20} color="#eee"/>
                            </View>
                            <TextInput
                                style={{height:35*height/736,width:width*0.7,paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:2,fontSize:14}}
                                onChangeText={(goodName) => {
                                      this.state.goodName=goodName;
                                      this.setState({goodName:this.state.goodName});
                                    }}
                                value={this.state.goodName}
                                placeholder=' 搜索商品'
                                placeholderTextColor="#aaa"
                                underlineColorAndroid="transparent"
                                autoCapitalize="characters"
                            />
                        </View>
                        <View style={{backgroundColor:'transparent',marginLeft:10}}>
                            <Icon name={'comment-o'} size={22} color="#fff"/>
                        </View>
                    </View>

                    <View style={{flex:5,flexDirection:'row',backgroundColor:'#fff',paddingBottom:10}}>

                            <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                              onPress={ ()=>{
                                         this.navigate2ProductsList();
                                         console.log('找教练');
                                       }}>
                                <Icon name="shopping-basket" size={25} color="#66CD00" />
                                <View style={{marginTop:0,paddingTop:10}}>
                                    <Text style={{fontSize:13,color:'#343434'}}>运动数码</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                              onPress={ ()=>{

                                          console.log('健康商城');
                                      }}>

                                <Icon name="shopping-cart" size={25} color="#EEAD0E" />
                                <View style={{marginTop:0,paddingTop:10}}>
                                    <Text style={{fontSize:13,color:'#343434'}}>健身装备</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                              onPress={ ()=>{
                                         this.setState({tab:2});
                                         console.log('运动馆');
                                      }}>
                                <Icon name="medkit" size={25} color="#EE6363" />
                                <View style={{marginTop:0,paddingTop:10}}>
                                    <Text style={{fontSize:13,color:'#343434'}}>器械球类</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'center',padding:8}}
                                              onPress={ ()=>{
                                         this.setState({tab:3});
                                         console.log('健康定制');
                                      }}>
                                <Icon name="plane" size={25} color="#66CDAA" />
                                <View style={{marginTop:0,paddingTop:10}}>
                                    <Text style={{fontSize:13,color:'#343434'}}>营养保健</Text>
                                </View>
                            </TouchableOpacity>

                    </View>

                    <View style={{flex:3,marginTop:10,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#ddd'}}>---------</Text>
                        <Icon name="bookmark-o" size={18} color="#EEAD0E" />
                        <Text style={{color:'#343434',fontSize:13,paddingLeft:5}}>精选活动</Text>
                        <Text style={{color:'#ddd'}}>---------</Text>
                    </View>

                    <View style={{flex:3,backgroundColor:'#fff',marginTop:10,marginBottom:10,justifyContent:'center',alignItems: 'center',}}>
                        <Image resizeMode="stretch" style={{ width:width,height:120}} source={require('../../../img/good1.jpg')} />
                    </View>

                    <View style={{flex:3,backgroundColor:'#fff',paddingBottom:10,justifyContent:'center',alignItems: 'center',}}>
                        <Image resizeMode="stretch" style={{ width:width,height:120}} source={require('../../../img/good3.jpg')} />
                    </View>



                </ScrollView>



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

