import React, { Component } from 'react'
import { Text, View ,ScrollView,StyleSheet,StatusBar} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class Messages extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="dark-content"
        />    
        <View style={styles.container}>

          <ScrollView >
            <Text>hello messages</Text>
          </ScrollView>
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
});
