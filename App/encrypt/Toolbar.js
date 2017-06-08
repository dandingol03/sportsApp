/**
 * Created by danding on 17/6/8.
 */
import React, {Component} from 'react';
import {

    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Platform,
    Animated
} from 'react-native';

import  Popover from  'react-native-popover'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Toolbar extends Component{

    closePopover(){
        this.setState({menuVisible: false});
    }

    showPopover(ref){
        this.refs[ref].measure((ox, oy, width, height, px, py) => {
            this.setState({
                menuVisible: true,
                buttonRect: {x: px+20, y: py+0, width: 200, height: height}
            });
        });
    }

    constructor(props) {
        super(props);
        this.state={
            menuVisible:false
        }
    }

    render()
    {



        var {width,backgroundColor,title,action,onOptionsItemSelected,actions}=this.props

        var defaultStyle1={
            height:70,
            paddingTop:30,
            flexDirection:'row',
            justifyContent:'center',
            backgroundColor:'#66CDAA'
        }

        if(backgroundColor&&backgroundColor!='')
            defaultStyle1.backgroundColor=backgroundColor
        if(width)
            defaultStyle1.width=width

        var items=[];
        actions.map((action,i)=>{
            items.push(
                <TouchableOpacity style={[styles.popoverContent]} key={i}
                      onPress={()=>{

                          this.closePopover();
                          if(this.props.onPress)
                            this.props.onPress(i)
                  }}>
                    <Text style={[styles.popoverText,{color:'#444'}]}>{action}</Text>
                </TouchableOpacity>
            )
        })

        return(
            <View style={styles.container}>

                <View style={defaultStyle1}>
                    <TouchableOpacity style={{width:60,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{this.goBack();}}>
                        <Ionicons name={'md-arrow-back'} size={25} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex:3,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
                        <Text style={{color:'#fff',fontSize:18}}>
                            {title}
                        </Text>
                    </View>
                    <TouchableOpacity ref="menu"
                                      style={{flex:1,justifyContent:'center',alignItems: 'center',}}
                                      onPress={()=>{
                             this.showPopover('menu')
                          }}
                    >
                        {
                            action!=false?
                                <Ionicons name={'md-more'} size={25} color="#fff"/>:
                                null
                        }
                    </TouchableOpacity>

                </View>

                {this.props.children}

                <Popover
                    isVisible={this.state.menuVisible}
                    fromRect={this.state.buttonRect}
                    onClose={()=>{this.closePopover()
                            }}>

                    {items}

                </Popover>
            </View>

        )
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
    },
    popoverContent: {
        width: 100,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText: {
        color: '#ccc',
        fontSize:14
    }
})

export  default Toolbar

