/**
 * Created by danding on 17/5/30.
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
    Platform,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing
} from 'react-native';

var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default class Home extends Component {

    render() {
        return (
            <View style={styles.container}>

                <View style={{width:width,flexDirection:'row'}}>

                    <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 8 }}
                                      onPress={() => {
                            this.navigate2Coach();
                        }}>
                        <Icon name="shopping-basket" size={30} style={{ justifyContent: 'center', alignItems: 'center' }} color="#66CD00" />
                        <View style={{ marginTop: 0, padding: 5, paddingTop: 10 }}>
                            <Text style={{ fontSize: 13, color: '#343434' }}>找教练</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 8 }}
                                      onPress={() => {
                            this.navigate2Coach();
                        }}>
                        <Icon name="shopping-basket" size={30} style={{ justifyContent: 'center', alignItems: 'center' }} color="#66CD00" />
                        <View style={{ marginTop: 0, padding: 5, paddingTop: 10 }}>
                            <Text style={{ fontSize: 13, color: '#343434' }}>找教练</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 8 }}
                                      onPress={() => {
                            this.navigate2Coach();
                        }}>
                        <Icon name="shopping-basket" size={30} style={{ justifyContent: 'center', alignItems: 'center' }} color="#66CD00" />
                        <View style={{ marginTop: 0, padding: 5, paddingTop: 10 }}>
                            <Text style={{ fontSize: 13, color: '#343434' }}>找教练</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 8 }}
                                      onPress={() => {
                            this.navigate2Coach();
                        }}>
                        <Icon name="shopping-basket" size={30} style={{ justifyContent: 'center', alignItems: 'center' }} color="#66CD00" />
                        <View style={{ marginTop: 0, padding: 5, paddingTop: 10 }}>
                            <Text style={{ fontSize: 13, color: '#343434' }}>找教练</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
