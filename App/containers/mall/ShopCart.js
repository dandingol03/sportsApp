
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
import _ from 'lodash';

import Icon from 'react-native-vector-icons/FontAwesome';

class ShopCart extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    renderRow(rowData,sectionId,rowId){

        var lineStyle=null;
        lineStyle={flex:1,padding:10,paddingLeft:0,paddingRight:0,justifyContent:'flex-start',backgroundColor:'transparent',};

        var row=(
            <View style={lineStyle}>
                <View style={{flexDirection:'row',}}>

                    {rowData.selected==true?
                        <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}
                        onPress={()=>{
                            var products=_.cloneDeep(this.state.products);
                              products.map(function(good,i) {
                              if(good.id==rowData.id){
                                  good.selected=false;
                              }
                              });
                              this.setState({products: products});
                            }}>
                            <Icon name={'check-circle'} size={23} color="#008B00"/>
                        </TouchableOpacity>:
                        <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}
                                          onPress={()=>{
                            var products=_.cloneDeep(this.state.products);
                              products.map(function(good,i) {
                              if(good.id==rowData.id){
                                  good.selected=true;
                              }
                              });
                              this.setState({products: products});
                            }}>
                            <Icon name={'check-circle'} size={23} color="#ddd"/>
                        </TouchableOpacity>
                    }

                    <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                        <Image resizeMode="contain" style={{ width:100,height:75}} source={rowData.image} />
                    </View>
                    <View style={{flex:5,justifyContent:'center',alignItems:'center',paddingLeft:5}}>
                        <View style={{flex:2,justifyContent:'flex-start',alignItems:'center',marginBottom:3}}>
                            <Text  style={{fontSize:14,color:'#343434'}}>{rowData.name}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <View style={{flex:1}}>
                                <Text style={{flex:1,fontSize:10,color:'#aaa',padding:2}}>尺码：{rowData.size}</Text>
                            </View>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:3}}>
                            <Text style={{flex:1,fontSize:13,color:'red'}}>￥{rowData.price}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
                        <Icon name={'close'} size={23} color="#ddd"/>
                    </View>
                </View>
                <View style={{flexDirection:'row',borderWidth:1,borderColor:'#ddd',justifyContent:'center',alignItems:'center',padding:5}}>
                    <View style={{flex:4,flexDirection:'row'}}>
                        <Text style={{color:'#ddd',fontSize:11}}>小计：</Text>
                        <Text style={{color:'red',fontSize:11}}>￥358</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Icon name={'plus-square-o'} size={23} color="#ddd"/>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                            <Text style={{color:'#ddd',fontSize:11}}>{rowData.count}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Icon name={'minus-square-o'} size={23} color="#ddd"/>
                        </View>

                    </View>
                </View>

            </View>
        );
        return row;
    }

    constructor(props) {
        super(props);
        this.state={
            selectAll:true,
            products:[
                {id:0,name:'Adidas阿迪达斯男裤夏季新款运动裤跑步训练五分裤AK1950',price:229,selected:false,size:'M',count:1,discount:'5.00%',image:require('../../../img/p1.jpeg')},
                {id:1,name:'Adidas阿迪达斯男裤夏季新款运动裤跑步训练五分裤AK1950',price:229,selected:false,size:'S',count:1,discount:'5.00%',image:require('../../../img/p2.jpeg')},
            ],
        }
    }

    render() {

        var productsListView=null;
        var products = this.state.products;


        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if(products!==undefined&&products!==null&&products.length>0)
        {
            productsListView=(
                <ScrollView>
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(products)}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>);
        }


        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{height:55*height/736,width:width,paddingTop:10,flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#008B00'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'center',alignItems: 'center',}}>
                        <Text style={{color:'#fff',fontSize:18}}>购物车</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',padding:8}}>
                    <View style={{flex:15}}>
                        <View style={{flexDirection:'row',margin:5}}>
                            <View style={{borderWidth:1,borderColor:'red',padding:1,marginRight:8}}>
                                <Text style={{color:'red',fontSize:11}}>满减</Text>
                            </View>
                            <Text style={{color:'#aaa',fontSize:11}}>购物满398.0元 立减50.0元</Text>
                        </View>
                        <View style={{flexDirection:'row',margin:5}}>
                            <View style={{borderWidth:1,borderColor:'red',padding:1,marginRight:8}}>
                                <Text style={{color:'red',fontSize:11}}>满减</Text>
                            </View>
                            <Text style={{color:'#aaa',fontSize:11}}>购物满788.0元 立减100.0元 还差21.00元</Text>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <Icon name={'angle-right'} size={30} color="#aaa"/>
                    </View>
                </View>

                <View>
                    {productsListView}
                </View>

                <View style={{flexDirection:'row',borderWidth:1,borderColor:'#ddd',position:'absolute',bottom:5}}>
                    <View style={{flex:1,flexDirection:'row',padding:5}}>
                        {
                            this.state.selectAll==true?
                                <TouchableOpacity  onPress={()=>{
                        var products=_.cloneDeep(this.state.products);
                              products.map(function(good,i) {
                                 good.selected=false;
                              });
                              this.setState({products: products,selectAll:false});
                    }}>
                                    <Icon name={'check-circle'} size={23} color="#008B00"/>
                                </TouchableOpacity>:
                                <TouchableOpacity  onPress={()=>{
                        var products=_.cloneDeep(this.state.products);
                              products.map(function(good,i) {
                                 good.selected=true;
                              });
                              this.setState({products: products,selectAll:true});
                    }}>
                                    <Icon name={'check-circle'} size={23} color="#aaa"/>
                                </TouchableOpacity>

                        }
                        <Text style={{padding:5}}>全选</Text>
                    </View>
                    <View style={{flex:2,padding:5}}>
                        <View style={{flexDirection:'row'}}>
                            <Text>合计：</Text>
                            <Text style={{color:'red'}}>￥717.00</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:12,color:'#aaa'}}>总额：767.5 立减：50</Text>
                        </View>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',backgroundColor:'red'}}>
                        <Text style={{color:'#fff'}}>去结算</Text>
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

export default connect(mapStateToProps)(ShopCart);


