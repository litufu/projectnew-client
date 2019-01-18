import React, { Component } from 'react'
import { Text, View ,ScrollView,StyleSheet,StatusBar} from 'react-native'
import {withNavigation} from 'react-navigation'

import QueryMessages from './QueryMessages'

class Messages extends Component {
  render() {
    return (
      <View style={styles.container}>
        <QueryMessages 
        navigation={this.props.navigation}
        me={this.props.me}
        />
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


export default withNavigation(Messages)