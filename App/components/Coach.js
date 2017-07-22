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
    TextInput,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
var {height, width} = Dimensions.get('window');
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper';
import TextInputWrapper from 'react-native-text-input-wrapper';
import{
    fetchCoaches,
    onCoachUpdate,
} from '../action/CoachActions';


class Coach extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
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
            flex: 1, flexDirection: 'row', padding:5, paddingLeft: 0, paddingRight: 0,
            justifyContent: 'flex-start', backgroundColor: 'transparent'
        };

        var row = (
            <View style={lineStyle} onPress={() => {

            }}>
                <View style={{width:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../img/portrait.jpg')} style={{ width: 46, height: 46,borderRadius:23 }}
                           resizeMode="stretch" />
                </View>

                <View style={{flex:5,flexDirection:'column',borderBottomColor:'#eee',borderBottomWidth:1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 6, paddingTop: 2}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Text style={{ fontSize: 14, justifyContent: 'flex-start', fontWeight: 'bold', alignItems: 'flex-start', color: '#222' }}>
                                {rowData.perName}
                            </Text>
                            <Icon name="mars" size={14} color="#00f" style={{marginLeft:10}}/>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 6, paddingTop: 2}}>
                        <View style={{width:90,flexDirection:'row',justifyContent:'flex-start',paddingRight:5}}>
                            <Icon name="phone" size={14} color="#00f" style={{marginLeft:5}}/>
                            <Text style={{fontSize:12,color:'#222'}}>
                                {rowData.mobilePhone}
                            </Text>
                        </View>

                        <View style={{flex:1,paddingLeft:20}}>
                            <Text style={{fontSize:12,color:'#222'}}>
                                {this.state.memberLevel[rowData.trainerInfo.coachlevel]}
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1}}
                                  onPress={()=>{
                                       var coaches=_.cloneDeep(this.props.coaches)
                                       coaches.map((coach,j)=>{
                                            if(coach.personId==rowData.personId)
                                            {
                                                if(coach.checked==true)
                                                    coach.checked=false
                                            else
                                                    coach.checked=true
                                            }
                                        });
                                       this.props.dispatch(onCoachUpdate(coaches));
                                       this.goBack();
                                       this.props.setCoach(this.props.flag,rowData);
                }}>
                    {
                        rowData.checked==true?
                            <View>
                                <Icon name={'check-square-o'} size={20} color="#666"/>
                            </View>:
                            <View>
                                <Icon name={'square-o'} size={20} color="#666"/>
                            </View>
                    }
                </TouchableOpacity>


            </View>
        );

        return row;
    }

    constructor(props) {
        super(props);
        this.state={
            memberLevel:['','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'],
            coaches:[
                {
                    name:'贾帅',title:'国家二级运动员',kind:'散打',cost:300,mobilePhone:'18253160627'
                },
                {
                    name:'江湘宁',title:'体育本科学生证',kind:'羽毛球',cost:150,mobilePhone:'18253160627'
                },
                {
                    name:'陆严',title:'体育本科学生证',kind:'钓鱼',cost:10000,mobilePhone:'18253160627'
                },
                {
                    name:'彭杰',title:'体育本科学生证',kind:'动感单车',cost:150,mobilePhone:'18253160627'
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

        var coachList = null;
        var {coaches}=this.props;
        //var { coaches } = this.state;
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

                <Toolbar width={width} title="选择教练" navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                         }}>
                    <View style={{ flex: 1, width: width, backgroundColor: '#66CDAA' }}>

                        {/*搜索框*/}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
                            <View style={{ flexDirection: 'row', width: width * 7 / 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', borderRadius: 8 }}>

                                <TextInputWrapper
                                    search={true}
                                    textInputStyle={{ marginLeft: 15, fontSize: 14, color: '#222', }}
                                    iconStyle={{ size: 22 }}
                                    placeholder="按教练名进行搜索"
                                    val={this.state.coachName}
                                    onChangeText={(coachName) => {
                                    this.setState({ coachName: coachName })
                                }}
                                    onConfirm={() => {
                                    alert('dw')
                                }}
                                />

                            </View>

                        </View>

                        <Animated.View style={{flex: 1, padding: 4,paddingTop:10,opacity: this.state.fadeAnim,backgroundColor:'#fff' }}>
                            {coachList}
                        </Animated.View>

                    </View>
                </Toolbar>

            </View>
        )

    }


    componentDidMount()
    {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(fetchCoaches()).then((json)=>{
                if(json.re==1)
                {
                    this.props.dispatch(onCoachUpdate(json.data))
                }
            })
        });
    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});


module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        personInfo:state.user.personInfo,
        coaches:state.coach.coaches,
    })
)(Coach);

