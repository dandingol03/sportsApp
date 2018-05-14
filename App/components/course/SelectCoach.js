
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
    InteractionManager, Alert
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
var {height, width} = Dimensions.get('window');
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper';
import{
    fetchCoaches,
    onCoachUpdate,
} from '../../action/CoachActions';

import {
    getAccessToken,
} from '../../action/UserActions';

import CoachDetail from './CoachDetail'
import {distributeCourse} from "../../action/CourseActions";

class SelectCoach extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    navigate2CoachDetail(rowData){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'coachDetail',
                component: CoachDetail,
                params: {
                    coachDetail:rowData
                }
            })
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

    addItem = item => {
        this.setState({coached: [...this.state.coached, item]})
    };
    removeItem = removedItem => {
        this.setState({
            coached: this.state.coached.filter(item => {
                if (item.perName!== removedItem.perName)
                    return item;
            })
        });
    };

    addItem1 = item => {
        this.setState({coachId: [...this.state.coachId, item]})
    };
    removeItem1 = removedItem => {
        this.setState({
            coachId: this.state.coachId.filter(item => {
                if (item.trainerId!== removedItem.trainerId)
                    return item;
            })
        });
    };
    renderCoach(rowData, sectionId, rowId) {

        var lineStyle = {
            flex: 1, flexDirection: 'row', padding:5, paddingLeft: 0, paddingRight: 0,
            justifyContent: 'flex-start', backgroundColor: 'transparent'
        };



        var row = (
            <TouchableOpacity style={lineStyle} onPress={() => {
                //this.navigate2CoachDetail(rowData);
            }}>
                <View style={{width:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../../img/portrait.jpg')} style={{ width: 46, height: 46,borderRadius:23 }}
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
                                {this.state.memberLevel[rowData.coachlevel]}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1}}>
                    {
                        this.state.isSelfCheck==true?
                            <Icon name={'check-square-o'} size={20} color="#666"/>:
                            <Icon name={'square-o'} size={20} color="#666"/>
                    }
                </View>


            </TouchableOpacity>
        );

        return row;
    }

    constructor(props) {
        super(props);
        this.state={
            memberLevel:['','体育本科','国家一级运动员','国家二级运动员','国家三级运动员'],
            isRefreshing:true,
            fadeAnim: new Animated.Value(1),
            coaches:this.props.coaches,
            coached:[],
            coachId:null,
        };
    }

    render()
    {
        var field="";
        var coachId="";
        this.state.coached.map((coach,i)=>{
            field+=coach.state+",";
            coachId+=coach.coachId+",";
        });
        field=field.substring(0,field.length-1);

        // var field1=""
        // this.state.coachId.map((field0,i)=>{
        //     field1+=field0.state+","
        // });
        // field1=field1.substring(0,field1.length-1);

        var coachList = [];
        var {coaches}=this.state;

        if(coaches&&coaches.length>0)
        {

            coaches.map((person,i)=>{
                coachList.push(
                    <TouchableOpacity key={i} style={{flexDirection:'row',padding:4,paddingHorizontal:10,marginTop:4}}
                                      onPress={()=>{
                                          var _relative=_.cloneDeep(coaches);
                                          _relative.map((_person,j)=>{
                                              if(_person.perName==person.perName)
                                              {
                                                  if(_person.checked==true)
                                                  {
                                                      _person.checked = false;
                                                      this.removeItem({state: person.perName,perName:person.perName,coachId:person.trainerId});
                                                      //this.removeItem1({state:person.trainerId,trainerId:person.trainerId});

                                                  }
                                                  else{
                                                      this.addItem({state:person.perName,perName:person.perName,coachId:person.trainerId});
                                                      _person.checked=true;

                                                      //this.addItem1({state:person.trainerId,trainerId:person.trainerId});


                                                  }


                                              }
                                          })
                                          this.setState({coaches:_relative})
                                      }}
                    >

                        <View style={{width:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Image source={require('../../../img/portrait.jpg')} style={{ width: 46, height: 46,borderRadius:23 }}
                                   resizeMode="stretch" />
                        </View>

                        <View style={{flex:5,flexDirection:'column',borderBottomColor:'#eee',borderBottomWidth:1}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 6, paddingTop: 2}}>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    <Text style={{ fontSize: 14, justifyContent: 'flex-start', fontWeight: 'bold', alignItems: 'flex-start', color: '#222' }}>
                                        {person.perName}
                                    </Text>
                                    <Icon name="mars" size={14} color="#00f" style={{marginLeft:10}}/>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 6, paddingTop: 2}}>
                                <View style={{width:90,flexDirection:'row',justifyContent:'flex-start',paddingRight:5}}>
                                    <Icon name="phone" size={14} color="#00f" style={{marginLeft:5}}/>
                                    <Text style={{fontSize:12,color:'#222'}}>
                                        {person.mobilePhone}
                                    </Text>
                                </View>

                                <View style={{flex:1,paddingLeft:20}}>
                                    <Text style={{fontSize:12,color:'#222'}}>
                                        {this.state.memberLevel[person.coachlevel]}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flex:1}}></View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10,width:70}}>
                            {
                                person.checked==true?
                                    <Icon name={'check-square-o'} size={20} color="#666"/>:
                                    <Icon name={'square-o'} size={20} cogit lor="#666"/>
                            }
                        </View>
                    </TouchableOpacity>
                )
            })

            // var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            // coachList = (
            //     <ScrollView
            //         refreshControl={
            //             <RefreshControl
            //                 refreshing={this.state.isRefreshing}
            //                 onRefresh={this._onRefresh.bind(this)}
            //                 tintColor="#ff0000"
            //                 title="Loading..."
            //                 titleColor="#00ff00"
            //                 colors={['#ff0000', '#00ff00', '#0000ff']}
            //                 progressBackgroundColor="#ffff00"
            //             />
            //         }
            //     >
            //         <ListView
            //             automaticallyAdjustContentInsets={false}
            //             dataSource={ds.cloneWithRows(coaches)}
            //             renderRow={this.renderCoach.bind(this)}
            //         />
            //     </ScrollView>)

        }

        return (
            <View style={styles.container}>

                <Toolbar width={width}  title="教练列表" navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                             this.goBack()
                         }}>
                    <View style={{ flex: 1, width: width, backgroundColor: '#66CDAA' }}>

                        <Animated.View style={{flex: 1, padding: 4,paddingTop:10,opacity: this.state.fadeAnim,backgroundColor:'#fff' }}>
                            {coachList}
                        </Animated.View>

                    </View>

                    <View style={{flexDirection:'row',height:60,justifyContent:'center',alignItems:'center',width:width}}>
                        <TouchableOpacity style={{width:width*2/3,backgroundColor:'#66CDAA',borderRadius:10,padding:10,flexDirection:'row',
                            justifyContent:'center'}}
                                          onPress={()=>{
                                              this.goBack();
                                              this.props.setCoach(field,coachId);
                                          }}>
                            <Text style={{color:'#fff',fontSize:15}}>确定</Text>
                        </TouchableOpacity>
                    </View>

                </Toolbar>

            </View>
        )

    }
    componentWillMount()
    {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(fetchCoaches()).then((json)=>{
                if(json.re==1)
                {
                    this.props.dispatch(onCoachUpdate(json.data))
                }
                else{
                    if(ison.re=-100) {
                        this.props.dispatch(getAccessToken(false))
                    }
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
)(SelectCoach);

