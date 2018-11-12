import React, { Component } from 'react'
import { Text, View,ScrollView,StyleSheet ,StatusBar} from 'react-native'

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <View >

          <ScrollView >
            <Text>hello profile</Text>
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
