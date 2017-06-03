
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
    require('../../../img/t1.jpg'),
    require('../../../img/t2.jpeg'),
    require('../../../img/t3.jpeg'),
    require('../../../img/t2.jpeg'),
];

class ProductDetail extends Component{

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
                    resizeMode={"contain"}
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
            productInfo:this.props.productInfo,
        }
    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:'#eee'}}>
                <View style={{height:55,width:width,paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#008B00'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}
                              numberOfLines={1}
                        >
                            {this.state.productInfo.name}
                        </Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{console.log('分享');}}>
                        <Text style={{color:'#fff',fontSize:18}}>分享</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width:width,height:height,backgroundColor:'#eee'}}>

                    <View style={{width:width,height:height*0.4}}>
                        <ViewPager
                            style={this.props.style}
                            dataSource={this.state.dataSource}
                            renderPage={this._renderPage}
                            isLoop={true}
                            autoPlay={true}
                        />
                    </View>

                    <View style={{backgroundColor:'#fff',padding:10}}>
                        <Text style={{color:'#343434',fontSize:13,marginBottom:5}}>{this.state.productInfo.name}</Text>
                        <Text style={{flex:4,fontSize:17,color:'red'}}>￥{this.state.productInfo.price}</Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:3}}>
                            <Text style={{fontSize:11,color:'#aaa'}}>返利:</Text>
                            <Text style={{fontSize:13,color:'red'}}>{this.state.productInfo.discount}</Text>

                        </View>
                        <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                            <View style={{borderWidth:1,borderColor:'red',padding:1,marginRight:5}}>
                                <Text style={{color:'red',fontSize:11}}>今日秒杀</Text>
                            </View>
                            <Text style={{color:'red',fontSize:11,}}>预计31日10：00开始</Text>
                        </View>
                    </View>

                    <View style={{marginTop:10,padding:10,backgroundColor:'#fff'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:'#aaa',}} adjustsFontSizeToFit={true} allowFontScaling={true}>尺码：</Text>
                            <View style={{flexDirection:'row',}}>
                                <View style={{flexDirection:'row',borderWidth:1,borderColor:'#ddd',padding:3,marginRight:8}}>
                                    <Text style={{color:'#343434',fontSize:11}}>M</Text>
                                </View>
                                <View style={{flexDirection:'row',borderWidth:1,borderColor:'#ddd',padding:3,marginRight:8}}>
                                    <Text style={{color:'#343434',fontSize:11}}>L</Text>
                                </View>
                                <View style={{flexDirection:'row',borderWidth:1,borderColor:'#ddd',padding:3,marginRight:8}}>
                                    <Text style={{color:'#343434',fontSize:11}}>XL</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:8}}>
                            <Text style={{color:'#aaa',fontSize:12}}>颜色：</Text>
                            <View style={{flexDirection:'row',borderWidth:1,borderColor:'#ddd',padding:3,marginRight:8}}>
                                <Text style={{color:'#343434',fontSize:11}}>白色</Text>
                            </View>
                            <View style={{flexDirection:'row',borderWidth:1,borderColor:'#ddd',padding:3,marginRight:8}}>
                                <Text style={{color:'#343434',fontSize:11}}>灰色</Text>
                            </View>
                            <View style={{flexDirection:'row',borderWidth:1,borderColor:'#ddd',padding:3,marginRight:8}}>
                                <Text style={{color:'#343434',fontSize:11}}>黑色</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:8}}>
                            <Text style={{flex:1,color:'#aaa',fontSize:12}}>数量：</Text>

                            <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                                <View style={{flex:1}}>
                                    <Icon name={'plus-square-o'} size={20} color="#ddd"/>
                                </View>
                                <View style={{flex:1,}}>
                                    <Text style={{color:'#343434',fontSize:11}}>1</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Icon name={'minus-square-o'} size={20} color="#ddd"/>
                                </View>
                            </View>
                            <View style={{flex:2,color:'#aaa',fontSize:12}}>

                            </View>
                        </View>

                        <View style={{marginTop:8}}>
                            <Text style={{flex:1,color:'#008B00',fontSize:13}}>健康商城</Text>

                            <View style={{flex:2,flexDirection:'row',marginTop:10}}>
                                <Icon name="bookmark-o" size={16} color="#EEAD0E" />
                                <Text style={{color:'#aaa',fontSize:11,marginRight:10}}>
                                   正品保证
                                </Text>
                                <Icon name="bookmark-o" size={16} color="#EEAD0E" />
                                <Text style={{color:'#aaa',fontSize:11,marginRight:10}}>
                                   超值返利
                                </Text>
                                <Icon name="bookmark-o" size={16} color="#EEAD0E" />
                                <Text style={{color:'#aaa',fontSize:11,marginRight:10}}>
                                  全场包邮
                                </Text>
                            </View>

                        </View>
                    </View>

                </ScrollView>

                <View style={{flexDirection:'row',borderWidth:1,borderColor:'#ddd',position:'absolute',bottom:5}}>

                    <View style={{flexDirection:'row',flex:2,backgroundColor:'#fff'}}>

                        <View style={{marginRight:5,marginLeft:10}}>
                            <Icon name="star-o" size={23} color="#EEAD0E" />
                            <Text style={{color:'#343434',fontSize:11}}>收藏</Text>
                        </View>
                        <View style={{marginRight:5,marginLeft:10}}>
                            <Icon name="shopping-cart" size={23} color="#aaa" />
                            <Text style={{color:'#343434',fontSize:11}}>购物车</Text>
                            <View style={{backgroundColor:'red',position:'absolute',top:0,right:5,padding:3,borderRadius:10}}>
                                <Text style={{color:'#fff',fontSize:8}}>2</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',backgroundColor:'#476bec',padding:10,}}
                    onPress={()=>{this.navigate2ShopCart();}}>
                        <Text style={{color:'#fff',fontSize:13}}>加入购物车</Text>
                    </TouchableOpacity>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',backgroundColor:'red',padding:10,}}>
                        <Text style={{color:'#fff',fontSize:13}}>立即购买</Text>
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

export default connect(mapStateToProps)(ProductDetail);


