import React from 'react'
import {View ,Text,TouchableHighlight,StyleSheet} from 'react-native'

import {SQURE_HEIGHT,SQURE_WIDTH,BORDER_WIDTH} from './settings'

export default class Square extends React.Component{

    state={
        relationship:'父亲',
        name:'李土福的',
        isUser:true
    }

    render(){
        const relationship = this.props.relationship || '未知'
        const name = this.props.name || '???'
        const isUser = this.props.isUser || false
        const color =  isUser ? "#3385ff" : 'gray'
        const newName = name.length===2?name.slice(0,1)+' '+name.slice(1,2) : name
        return(
            <View style={[styles.container,{borderColor:color,borderWidth:BORDER_WIDTH}]}>
                <View style={[styles.top,{borderBottomColor:color}]}>
                    <Text style={[styles.relationship,{color:color}]}>{relationship}</Text>
                </View>
                <View style={[styles.bottom]}>
                    <Text style={{fontSize:80/(newName.length+1),color:color}}>{newName}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:SQURE_WIDTH,
        height:SQURE_HEIGHT,
        backgroundColor: 'white',
        borderRadius:5,

    },
    top:{
        width:SQURE_WIDTH-BORDER_WIDTH*2,
        height:(SQURE_HEIGHT-BORDER_WIDTH*2)*0.618,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:2,
    },
    bottom:{
        width:SQURE_WIDTH-BORDER_WIDTH*2,
        height:(SQURE_HEIGHT-BORDER_WIDTH*2)*0.382,
        alignItems:'center',
        justifyContent:'center'
    },
    relationship:{
        fontSize:SQURE_WIDTH/4,
        fontWeight:'bold'
    },
    
})

