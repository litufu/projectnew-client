import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { Icon } from 'react-native-elements'


export default class MyIcon extends React.Component{

    render(){
        const {iconName,iconType,handlePress,name,color} = this.props
        return(
       
            <View style={styles.container}>
                <Icon
                    reverse
                    name={iconName}
                    type={iconType}
                    color={color}
                    underlayColor="blue"
                    onPress={ handlePress} 
                    />

                <Text>{name}</Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})

