
import React, {Component} from 'react';
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
    Easing,
    InteractionManager,
    WebView
} from 'react-native';
import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');



var BGWASH = 'rgba(255,255,255,0.8)';

class NewsContentDetail extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            url:props.url
        }
    }

    render()
    {
        return (
            <View style={styles.container}>
                <WebView
                    ref={webview => { this.webview = webview; }}
                    style={{
                          backgroundColor: BGWASH,
                          height: 200,
                        }}
                    source={{uri: this.state.url}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});

export default  NewsContentDetail
