import React,{Component} from 'react';
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
import {Toolbar,OPTION_SHOW,OPTION_NEVER,ACTION_ADD} from 'react-native-toolbar-wrapper'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    fetchNotices,disableNoticeOnFresh,enableNoticeOnFresh
} from '../action/NoticeActions';
import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');

class Notice extends Component{

    goBack() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _onRefresh() {
        this.setState({isRefreshing: true, fadeAnim: new Animated.Value(0)});
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
        }.bind(this), 500);
        this.props.dispatch(enableNoticeOnFresh());

    }






    navigateNoticeDetail(rowData)
    {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'NoticeDetail',
                component: NoticeDetail,
                params: {
                    rowData:rowData,
                }
            })
        }
    }

    renderRow(rowData,sectionId,rowId){
        var row=(
            <View style={{flex:1,backgroundColor:'#fff',marginTop:5,marginBottom:5,borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                <View style={{flex:1,flexDirection:'row',padding:5,borderBottomWidth:1,borderColor:'#ddd',backgroundColor:'transparent',}}>

                    <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}
                                      onPress={()=>{
                                          this.navigateNoticeDetail(rowData,'公开活动');
                                      }}>
                        <Text style={{marginRight:5,color:'#66CDAA'}}>详情</Text>
                        <Icon name={'angle-right'} size={25
                        } color="#66CDAA"/>
                    </TouchableOpacity>
                </View>

                <View style={{flex:3,padding:10}}>

                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'消息编号：'+rowData.id}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',marginBottom:3}}>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center'}}>
                            <Icon name={'circle'} size={10} color="#aaa"/>
                        </View>
                        <Text style={{flex:7,fontSize:13,color:'#343434',justifyContent:'center',alignItems: 'center'}}>
                            {'消息题目：'+rowData.title}
                        </Text>
                    </View>


                </View>

            </View>
        );
        return row;
    }

    fetchData(){
        this.state.doingFetch=true;
        this.state.isRefreshing=true;
        this.props.dispatch(fetchNotices()).then((json)=> {
            if(json.re==-100){
                this.props.dispatch(getAccessToken(false));
            }
            this.props.dispatch(disableNoticeOnFresh());
            this.setState({doingFetch:false,isRefreshing:false})
        }).catch((e)=>{
            this.props.dispatch(disableNoticeOnFresh());
            this.setState({doingFetch:false,isRefreshing:false});
            alert(e)
        });
    }

    constructor(props) {
        super(props);
        this.state={
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1)
        };
    }

    render() {

        var noticeListView=null;
        var {noticeList,noticeFresh}=this.props;
        //var competitionList=this.state.competitionList;
        if(noticeFresh==true)
        {
            if(this.state.doingFetch==false)
                this.fetchData();
        }else{
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (noticeList !== undefined && noticeList !== null && noticeList.length > 0)
            {
                noticeListView = (
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={ds.cloneWithRows(noticeList)}
                        renderRow={this.renderRow.bind(this)}
                    />
                );
            }
        }

        return (
            <View style={styles.container}>
                <Toolbar width={width} title="消息列表" actions={[]} navigator={this.props.navigator}>

                    {<View style={{flex:5,backgroundColor:'#eee'}}>
                        <Animated.View style={{opacity: this.state.fadeAnim,height:height-150,paddingTop:5,paddingBottom:5,}}>
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this._onRefresh.bind(this)}
                                        tintColor="#9c0c13"
                                        title="刷新..."
                                        titleColor="#9c0c13"
                                        colors={['#ff0000', '#00ff00', '#0000ff']}
                                        progressBackgroundColor="#ffff00"
                                    />
                                }
                            >
                                {noticeListView}
                                {
                                    noticeListView==null?
                                        null:
                                        <View style={{justifyContent:'center',alignItems: 'center',backgroundColor:'#eee',padding:10}}>
                                            <Text style={{color:'#343434',fontSize:13,alignItems: 'center',justifyContent:'center'}}>已经全部加载完毕</Text>
                                        </View>
                                }

                            </ScrollView>

                        </Animated.View>
                    </View>}



                </Toolbar>

            </View>
        );
    }
    componentDidMount()
    {

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    popoverContent: {
        width: 100,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText: {
        color: '#ccc',
        fontSize: 14
    }
});

const mapStateToProps = (state, ownProps) => {

    const props = {
        userType: state.user.usertype.perTypeCode,
    }
    return props
}

module.exports = connect(state=>({
        accessToken:state.user.accessToken,
        noticeList:state.notice.noticeList,
        noticeFresh:state.notice.noticeFresh,
    })
)(Notice);

