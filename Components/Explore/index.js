import React, { Component } from 'react'
import { Text, View,ScrollView ,StyleSheet,StatusBar} from 'react-native'

export default class Explore extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View >
          <Text>hello explore</Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white",
  },
  statusBar:{
    height:StatusBar.currentHeight,
  }
});
