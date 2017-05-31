
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
import ProductDetail from './ProductDetail';

class ProductsList extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    navigate2ProductDetail(productInfo){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'product_detail',
                component: ProductDetail,
                params: {
                    productInfo:productInfo
                }
            })
        }
    }

    renderRow(rowData,sectionId,rowId){

        var lineStyle=null;
        lineStyle={flex:1,flexDirection:'row',padding:10,paddingLeft:0,paddingRight:0,borderBottomWidth:1,
            borderColor:'#ddd',justifyContent:'flex-start',backgroundColor:'transparent',};

        var row=(
            <TouchableOpacity style={lineStyle}
            onPress={()=>{this.navigate2ProductDetail(rowData);}}>
                <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
                    <Image resizeMode="contain" style={{ width:100,height:75}} source={rowData.image} />
                </View>
                <View style={{flex:2,justifyContent:'flex-start',alignItems:'center',paddingLeft:5}}>
                    <View style={{flex:2,justifyContent:'flex-start',alignItems:'center',marginBottom:3}}>
                        <Text  style={{fontSize:14,color:'#343434'}}>{rowData.name}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>
                        <View style={{flex:1,backgroundColor:'red'}}>
                            <Text style={{flex:1,fontSize:10,color:'#fff',padding:2}}>满减</Text>
                        </View>
                        <View style={{flex:6,backgroundColor:'red'}}>
                        </View>

                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:3}}>
                        <Text style={{flex:4,fontSize:13,color:'red'}}>￥{rowData.price}</Text>
                        <Text style={{flex:1,fontSize:11,color:'#aaa'}}>返利:</Text>
                        <Text style={{flex:1,fontSize:11,color:'red'}}>{rowData.discount}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
        return row;
    }

    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {

        var productsListView=null;
        var products = [
            {name:'Adidas阿迪达斯男裤夏季新款运动裤跑步训练五分裤AK1950',price:229,discount:'5.00%',image:require('../../../img/p1.jpeg')},
            {name:'Adidas阿迪达斯男裤夏季新款运动裤跑步训练五分裤AK1950',price:229,discount:'2.50%',image:require('../../../img/p2.jpeg')},
            {name:'Adidas阿迪达斯男裤夏季新款运动裤跑步训练五分裤AK1950',price:229,discount:'5.00%',image:require('../../../img/p1.jpeg')},
            {name:'Adidas阿迪达斯男裤夏季新款运动裤跑步训练五分裤AK1950',price:229,discount:'5.00%',image:require('../../../img/p2.jpeg')},
            {name:'Adidas阿迪达斯男裤夏季新款运动裤跑步训练五分裤AK1950',price:229,discount:'5.00%',image:require('../../../img/p1.jpeg')},
            {name:'Adidas阿迪达斯男裤夏季新款运动裤跑步训练五分裤AK1950',price:229,discount:'5.00%',image:require('../../../img/p2.jpeg')},
            ];



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
                        <Text style={{color:'#fff',fontSize:18}}>产品列表</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems: 'center',}}>

                    </TouchableOpacity>
                </View>

                {/*//搜索框*/}
                <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',padding:8}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',borderRadius:8}}>
                        <View style={{backgroundColor:'transparent',marginLeft:10}}>
                            <Icon name={'search'} size={18} color="#aaa"/>
                        </View>
                        <TextInput
                            style={{height:30*height/736,width:width*0.8,paddingLeft:10,paddingRight:10,paddingTop:2,paddingBottom:2,fontSize:15}}
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
                </View>

                <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',padding:8,borderTopWidth:1,borderBottomWidth:1,borderColor:'#ddd'}}>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                        <Text>默认</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                        <Text>价格</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                        <Text>销量</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                        <Text>评价数</Text>
                    </View>
                </View>


                <View>
                    {productsListView}
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

export default connect(mapStateToProps)(ProductsList);

