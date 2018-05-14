/**
 * Created by dingyiming on 2017/8/1.
 */
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
import proxy from '../../utils/Proxy'
import Config from '../../../config';

var {height, width} = Dimensions.get('window');
import {Toolbar, OPTION_SHOW, OPTION_NEVER} from 'react-native-toolbar-wrapper';
import {
    fetchCoaches,
    onCoachUpdate,
} from '../../action/CoachActions';

import {
    getAccessToken,
} from '../../action/UserActions';

import CoachDetail from './CoachDetail'

class TalkingFarm extends Component {

    goBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            usertextinput: null,
            talklist: null,
            time: null,
            courseId: this.props.courseId,
            personInfo: this.props.personInfo,
            _scrollView:null
        };
    }

    addTalkingFarm() {
        var personinfo = this.state.personInfo;
        var courseId = this.state.courseId;
        var input = this.state.usertextinput;
        if (input === null) {
            alert("请输入内容");
            return;
        }

        proxy.postes({
            url: Config.server + '/func/node/addchat',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                courseId: courseId,
                userId: personinfo.personId,
                content: input,
            }
        }).then((json) => {
            var data = json.data;
            if (data !== null && data !== undefined && data !== "") {
                //  alert(data);
                this.getTalkingFarm();
                this.setState({usertextinput: null});

            }
        }).catch((err) => {
            alert(err);
        });
    }

    getTalkingFarm() {


        var personinfo = this.state.personInfo;
        var courseId = this.state.courseId;
        var talklist = this.state.talklist;
        proxy.postes({
            url: Config.server + '/func/node/getchatlistbycourseid',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                courseId: courseId,
                userId: personinfo.personId,
            }
        }).then((json) => {
            if (json.data !== null) {
                var data = json.data;
                if (talklist === null || talklist === []) {
                    this.setState({talklist: data});
                } else if (talklist !== null && data !== undefined && data !== "") {
                    if (talklist.length !== data.length) {
                        this.setState({talklist: data});
                    }
                }
                if (this.state._scrollView !== null && this.state._scrollView !== undefined) {
                    this.state._scrollView.scrollToEnd({animated: false});
                }
            }
            else {

            }

        }).catch((err) => {
            alert(err);
        });
    }

    componentWillMount() {
        this.getTalkingFarm();
    }

    componentDidMount() {
        //this.getTalkingFarm();

        if (this.state._scrollView !== null &&this.state._scrollView !== undefined) {
            //_scrollView.scrollTo({x: 0, y: 9000, animated: true});
            this.state._scrollView.scrollToEnd({animated: false});
        }
        this.timer = setInterval(
            () => {
                this.getTalkingFarm()
            },
            5000
        );

    }



    renderRow(rowData) {

        if (this.state.time === null) {
            this.state.time = rowData.timestamp;
        }
        if (rowData.timestamp - this.state.time >= 360000) {
            this.state.time = rowData.timestamp;
        } else {
            rowData.time = null;
        }

        if (rowData.pernum === this.state.personInfo.personId) {
            var row =
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{fontSize: 10}}>
                            {rowData.time}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}>
                        <View style={{
                            padding: 10, justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                        }}>
                            <Text style={{fontSize: 10}}>
                                {rowData.username}
                            </Text>
                            <Text style={{fontSize: 15, backgroundColor: '#10FFF0', padding: 10, borderRadius: 5}}>
                                {rowData.content}
                            </Text>
                        </View>
                        {rowData.headimgurl === null ?
                            <View style={{width: 40, padding: 10, marginRight: 10}}>
                                <Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: 'transparent',

                                    }}
                                    resizeMode={'contain'}
                                    source={require('../../../img/portrait.jpg')}
                                >
                                </Image>
                            </View>
                            :
                            <View style={{width: 40, paddingBottom: 10, marginRight: 10}}>
                                <Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: 'transparent',

                                    }}
                                    resizeMode={'contain'}
                                    source={{uri: rowData.headimgurl}}
                                >
                                </Image>
                            </View>
                        }
                    </View>
                </View>;
            return row;
        }
        var row =
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                {rowData.headimgurl === null ?
                    <View style={{width: 40, padding: 10, marginRight: 10}}>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: 'transparent',

                            }}
                            resizeMode={'contain'}
                            source={require('../../../img/portrait.jpg')}
                        >
                        </Image>
                    </View>
                    :
                    <View style={{width: 40, paddingBottom: 10, marginRight: 10}}>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: 'transparent',

                            }}
                            resizeMode={'contain'}
                            source={{uri: rowData.headimgurl}}
                        >
                        </Image>
                    </View>
                }
                <View style={{padding: 10}}>
                    <Text style={{fontSize: 10}}>
                        {rowData.username}
                    </Text>
                    <Text style={{fontSize: 15, backgroundColor: '#10FFF0', padding: 10, borderRadius: 5}}>
                        {rowData.content}
                    </Text>
                </View>
            </View>;

        return row;
    }

    render() {
        var talklist = this.state.talklist;
        if (talklist !== null && talklist.length > 0) {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            var sortedCourses = talklist;

            talklist = (

                <ListView
                    ref={(scrollView) => {
                         this.state._scrollView = scrollView;
                    }}
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(sortedCourses)}
                    renderRow={this.renderRow.bind(this)}

                />


            );

        } else {
            this.getTalkingFarm();
        }

        return (
            <View style={styles.container}>
                <View style={{
                    height: 55,
                    width: width,
                    paddingTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#66CDAA',
                }}>
                    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}
                                      onPress={() => {
                                          this.goBack();
                                      }}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{color: '#fff', fontSize: 18}}>讨论组</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>

                    </View>
                </View>

                <View style={{height: height - 140}}>
                    <ScrollView>
                        <View style={{height: 480}}>
                            {talklist}
                        </View>
                    </ScrollView>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center', padding: 10
                    }}>
                        <TextInput style={styles.textinput}
                                   underlineColorAndroid="transparent"
                                   onSubmitEditing={() => this.addTalkingFarm()}
                                   value={this.state.usertextinput}
                                   onChangeText={(event) => this.setState({usertextinput: event})}
                        >

                        </TextInput>
                        <TouchableOpacity style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            borderRadius: 4,
                            backgroundColor: '#CAE1FF'
                        }} onPress={() => {
                            this.addTalkingFarm()
                        }}>
                            <View style={{padding: 10}}>
                                <Text style={{color: '#343434', fontSize: 15}}>发送</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )

    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    textinput: {
        borderWidth: 1,
        height: 40,
        flex: 6,
    }

});


module.exports = connect(state => ({
        accessToken: state.user.accessToken,
        personInfo: state.user.personInfo,
        unionid: state.user.unionid,
        coaches: state.coach.coaches,
    })
)(TalkingFarm);

