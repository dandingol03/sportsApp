import React, {Component} from 'react';
import {
    Dimensions,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import  Popover from  'react-native-popover'
var {height, width} = Dimensions.get('window');



class Coach extends Component {


    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px+5, y: py, width: width, height: height}
            });
        });
    }


    closePopover() {
        this.setState({isVisible: false});
    }

    _onRefresh() {
        this.setState({ isRefreshing: true, fadeAnim: new Animated.Value(0) });
        setTimeout(function () {
            this.setState({
                isRefreshing: false,
            });
            Animated.timing(          // Uses easing functions
                this.state.fadeAnim,    // The value to drive
                {
                    toValue: 1,
                    duration: 600,
                    easing: Easing.bounce
                },           // Configuration
            ).start();
        }.bind(this), 2000);
    }

    renderCoach(rowData, sectionId, rowId) {

        var lineStyle = {
            flex: 1, flexDirection: 'row', padding: 2, paddingLeft: 0, paddingRight: 0,
            justifyContent: 'flex-start', backgroundColor: 'transparent'
        };

        var row = (
            <TouchableOpacity style={lineStyle} onPress={() => {

            }}>
                <View style={{width:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../img/person.jpg')} style={{ width: 46, height: 46,borderRadius:23 }}
                           resizeMode="stretch" />
                </View>

                <View style={{flex:1,flexDirection:'column',borderBottomColor:'#eee',borderBottomWidth:1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 6, paddingTop: 2}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Text style={{ fontSize: 14, justifyContent: 'flex-start', fontWeight: 'bold', alignItems: 'flex-start', color: '#222' }}>
                                {rowData.name}
                            </Text>
                            <Icon name="mars" size={14} color="#00f" style={{marginLeft:10}}/>
                        </View>

                        <View style={{width:80,flexDirection:'row',justifyContent:'flex-end',paddingRight:20}}>
                            <Text style={{fontSize:14,color:'#222'}}>
                                ￥{rowData.cost}
                            </Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 6, paddingTop: 2}}>
                        <View style={{width:80,flexDirection:'row',backgroundColor:'#0adc5e',borderRadius:6,justifyContent:'center',padding:2}}>
                            <Text style={{ fontSize: 12, justifyContent: 'flex-start', fontWeight: 'bold',
                                alignItems: 'flex-start', color: '#fff' }}>
                                {rowData.kind}
                            </Text>
                        </View>

                        <View style={{flex:1,paddingLeft:10}}>
                            <Text style={{fontSize:12,color:'#222'}}>
                                {rowData.title}
                            </Text>
                        </View>
                    </View>
                </View>


            </TouchableOpacity>
        );

        return row;
    }




    constructor(props) {
        super(props);
        this.state={
            header:{
                status:'title'
            },
            query:{
                coachName:''
            },
            isVisible:false,
            coaches:[
                {
                    name:'贾帅',title:'国家二级运动员',kind:'散打',cost:300,
                },
                {
                    name:'江湘宁',title:'体育本科学生证',kind:'羽毛球',cost:150
                },
                {
                    name:'陆严',title:'体育本科学生证',kind:'钓鱼',cost:10000
                },
                {
                    name:'彭杰',title:'体育本科学生证',kind:'动感单车',cost:150
                }
            ],
            isRefreshing: false,
            fadeAnim: new Animated.Value(1)
        };
    }

    render()
    {

        var state=this.state
        var props=this.props

        var coachList = null
        var { coaches } = this.state;
        if(coaches&&coaches.length>0)
        {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            coachList = (
                <ScrollView

                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                >
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(coaches)}
                        renderRow={this.renderCoach.bind(this)}
                    />
                </ScrollView>)

        }

        return (
            <View style={styles.container}>


                {/*标题栏*/}
                <View style={{flexDirection:'row',height:55,backgroundColor:'#0adc5e',paddingTop:15}}>
                    <TouchableOpacity style={{width:60,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row',paddingLeft:10}}
                        onPress={()=>{
                            this.goBack()
                        }}
                    >
                        <Icon name="angle-left" size={32} color="#eee"/>
                    </TouchableOpacity>
                    <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
                        {
                            state.header.status=='title'?
                                <Text style={{color:'#fff',fontSize:17,fontWeight:'bold'}}>约私教</Text>:
                                <TextInput
                                    style={{height: 30,fontSize:14,color:'#222',backgroundColor:'rgba(16, 8, 8, 0.1)',borderRadius:6,padding:4,paddingHorizontal:10}}
                                    onChangeText={(name) => {
                                        this.setState({query:Object.assign(state.query,{coachName:name})});
                                    }}
                                    value={state.query.coachName}
                                    placeholder='请输入私教名进行搜索'
                                    placeholderTextColor="#eee"
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="characters"
                                />
                        }

                    </View>
                    <TouchableOpacity style={{width:60,justifyContent:'flex-end',alignItems: 'center',paddingRight:20,flexDirection:'row'}}
                        onPress={()=>{
                            if(this.state.header.status=='title')
                            {
                                this.setState({header:Object.assign(state.header,{status:'search'})})
                            }else{
                                 this.setState({header:Object.assign(state.header,{status:'title'})})
                            }
                        }}
                    >
                        {
                            state.header.status=='title'?
                                <Icon name="search" size={20} color="#eee"/>:
                                <Text style={{fontSize:14,color:'#fff',fontWeight:'bold',marginLeft:10}}>取消</Text>
                        }

                    </TouchableOpacity>

                </View>


                {/*分类*/}
                <View style={{padding:8,paddingHorizontal:4,width:width,flexDirection:'row',backgroundColor:'#eee'}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <View style={{width:48,height:48 ,backgroundColor:'#0adc5e',justifyContent:'center',
                                alignItems:'center',borderRadius:24}}>
                            <Ionicons name="md-infinite" size={35} color="#fff"/>
                        </View>
                        <View style={{marginTop:5}}>
                            <Text style={{fontSize:12,color:'#222'}}>不限</Text>
                        </View>
                    </View>

                    <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <View style={{width:48,height:48,borderColor:'#0adc5e',borderWidth:2,justifyContent:'center',backgroundColor:'#fff',
                                alignItems:'center',borderRadius:24}}>
                            <CommIcon name="run" size={34} color="#0adc5e" style={{backgroundColor:'transparent'}}/>
                        </View>
                        <View style={{marginTop:5}}>
                            <Text style={{fontSize:12,color:'#222'}}>跑步</Text>
                        </View>
                    </View>

                    <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <View style={{width:48,height:48,borderColor:'#0adc5e',borderWidth:2,justifyContent:'center',backgroundColor:'#fff',
                                alignItems:'center',borderRadius:24}}>
                            <Icon name="bicycle" size={30} color="#0adc5e"  style={{backgroundColor:'transparent'}}/>
                        </View>
                        <View style={{marginTop:5}}>
                            <Text style={{fontSize:12,color:'#222'}}>自行车</Text>
                        </View>
                    </View>

                    <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <View style={{width:48,height:48,borderColor:'#0adc5e',borderWidth:2,justifyContent:'center',backgroundColor:'#fff',
                                alignItems:'center',borderRadius:24}}>
                            <Image resizeMode="stretch" source={require('../../img/gym-highlight.png')} style={{width:35,height:35}} />
                        </View>
                        <View style={{marginTop:5}}>
                            <Text style={{fontSize:12,color:'#222'}}>综合训练</Text>
                        </View>
                    </View>

                    <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <View style={{width:48,height:48,borderColor:'#0adc5e',borderWidth:2,justifyContent:'center',backgroundColor:'#fff',
                                alignItems:'center',borderRadius:24}}>
                            <CommIcon name="dumbbell" size={33} color="#0adc5e" style={{backgroundColor:'transparent'}}/>
                        </View>
                        <View style={{marginTop:5}}>
                            <Text style={{fontSize:12,color:'#222'}}>力量训练</Text>
                        </View>
                    </View>

                    <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <View style={{width:48,height:48,borderColor:'#0adc5e',borderWidth:2,justifyContent:'center',backgroundColor:'#fff',
                                alignItems:'center',borderRadius:24}}>
                            <Ionicons name="ios-basketball" size={35} color="#0adc5e" style={{backgroundColor:'transparent'}}/>
                        </View>
                        <View style={{marginTop:5}}>
                            <Text style={{fontSize:12,color:'#222'}}>蓝球</Text>
                        </View>
                    </View>
                </View>


                {/*筛选*/}
                <View style={{padding:8,paddingHorizontal:15,width:width,flexDirection:'row',
                        backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>

                    <TouchableOpacity style={{backgroundColor:'#fff',width:width*3/8,flexDirection:'row',alignItems:'center',padding:7,
                            borderTopLeftRadius:10,borderBottomLeftRadius:10,justifyContent:'center'}}
                      onPress={()=>{
                          this.showPopover()
                      }}
                                      ref='button'
                    >
                        <Text style={{color:'#0adc5e',}}>离我最近</Text>
                        <Icon name="caret-down" size={17} color="#0adc5e" style={{marginLeft:5}}/>
                    </TouchableOpacity>

                    <View style={{backgroundColor:'#fff',width:width*3/8,flexDirection:'row',alignItems:'center',padding:7,
                            borderTopRightRadius:10,borderBottomRightRadius:10,marginLeft:1,justifyContent:'center'}}>
                        <Text style={{color:'#aaa',}}>筛选</Text>
                        <Icon name="caret-down" size={17} color="#aaa" style={{marginLeft:5}}/>
                    </View>

                </View>

                <Animated.View style={{ opacity: this.state.fadeAnim }}>
                    {coachList}
                </Animated.View>

                <Popover
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}

                    onClose={this.closePopover.bind(this)}>
                    <View style={{width:width-12}}>

                        <TouchableOpacity style={{flexDirection:'row',padding:6,borderBottomWidth:1,borderColor:'#ccc'}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingLeft:30}}>
                                <Text style={{color:'#0adc5e',fontSize:14}}>
                                    离我最近
                                </Text>
                            </View>

                            <View style={{width:80,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Icon name="check" size={17} color="#0adc5e"/>
                            </View>

                        </TouchableOpacity>


                        <TouchableOpacity style={{flexDirection:'row',padding:6,borderBottomWidth:1,borderColor:'#ccc'}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingLeft:30}}>
                                <Text style={{color:'#888',fontSize:14}}>
                                    授课最多
                                </Text>
                            </View>

                            <View style={{width:80,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection:'row',padding:6,borderBottomWidth:1,borderColor:'#ccc'}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingLeft:30}}>
                                <Text style={{color:'#888',fontSize:14}}>
                                    评分最高
                                </Text>
                            </View>

                            <View style={{width:80,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection:'row',padding:6}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingLeft:30}}>
                                <Text style={{color:'#888',fontSize:14}}>
                                    价格从低到高
                                </Text>
                            </View>

                            <View style={{width:80,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                            </View>

                        </TouchableOpacity>

                    </View>
                </Popover>

            </View>
        )

    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});

export default Coach;

