import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

const BottomBar = ({ navigation }) => (
      <View style={styles.container}>
        <Ionicons
            onPress={() => navigation.navigate('Explore')}
            name="md-home"
            size={20}
            color="black"
        />
        <Ionicons
            onPress={() => navigation.navigate('Group')}
            name="md-people"
            size={20}
            color="black"
        />
        <Ionicons
            onPress={() => navigation.navigate('Profile')}
            name="md-person"
            size={20}
            color="black"
          />
      </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    height: 50,
    borderTopWidth:1,
    borderColor: "lightgray"
  },
});

export default withNavigation(BottomBar);
