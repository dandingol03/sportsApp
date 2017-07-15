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

import {
    fetchMaintainedVenue
} from '../../action/MapActions';
import {
    makeTabsHidden,
    makeTabsShown
} from '../../action/TabActions';


class SelectVenue extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
        this.props.dispatch(makeTabsShown());
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

    renderVenue(rowData, sectionId, rowId) {

        var lineStyle = {
            flex: 1, flexDirection: 'row', padding:5, paddingLeft: 0, paddingRight: 0,
            justifyContent: 'flex-start', backgroundColor: 'transparent'
        };

        var row = (
            <View style={lineStyle} onPress={() => {

            }}>

                <View style={{flex:6,flexDirection:'column',borderBottomColor:'#eee',borderBottomWidth:1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 6, paddingTop: 2}}>
                        <View style={{flex:4,flexDirection:'row'}}>
                            <Text style={{ fontSize: 14, justifyContent: 'flex-start', fontWeight: 'bold', alignItems: 'flex-start', color: '#222' }}>
                                {rowData.name}
                            </Text>
                        </View>
                        <View style={{flex:1}}>

                        </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 6, paddingTop: 2}}>
                        <View style={{flex:3}}>
                            <Text style={{fontSize:12,color:'#222'}}>
                                {rowData.address}
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1}}
                                  onPress={()=>{
                                       var venues=_.cloneDeep(this.state.venues)
                                       venues.map((venue,j)=>{
                                            if(venue.unitId==rowData.unitId)
                                            {
                                                if(venue.checked==true)
                                                    venue.checked=false
                                                else
                                                    venue.checked=true
                                            }
                                        });
                                       this.setState({venues:venues})
                                       this.goBack();
                                       this.props.setPlace(rowData);
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
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
            venues:[],
            venue:null,
        };
    }

    render()
    {

        var state=this.state
        var props=this.props

        var venueList = null;
        var {venues}=this.state;

        if(venues&&venues.length>0)
        {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            venueList = (
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
                        dataSource={ds.cloneWithRows(venues)}
                        renderRow={this.renderVenue.bind(this)}
                    />
                </ScrollView>)

        }

        return (
            <View style={styles.container}>

                <Toolbar width={width} title="选择场馆" navigator={this.props.navigator}
                         actions={[]}
                         onPress={(i)=>{
                         }}>
                    <View style={{ flex: 1, width: width, backgroundColor: '#66CDAA' }}>

                        <Animated.View style={{flex: 1, padding: 4,paddingTop:10,opacity: this.state.fadeAnim,backgroundColor:'#fff',
                       paddingBottom:10 }}>
                            {venueList}
                        </Animated.View>

                    </View>
                </Toolbar>

            </View>
        )

    }


    componentDidMount()
    {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(fetchMaintainedVenue()).then((json)=>{
                if(json.re==1)
                {
                    var venues = json.data;
                    venues.map((venue)=>{
                        venue.checked = false;
                    })
                    this.setState({venues:venues});
                    this.props.dispatch(makeTabsHidden());
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
)(SelectVenue);


