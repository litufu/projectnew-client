import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

import ParallaxScrollView from './beta-src/ParallaxScrollView';

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 1
    };
  }

  johnOliverView() {
    return (
      <ParallaxScrollView
        windowHeight={SCREEN_HEIGHT * 0.4}
        backgroundSource={require('H:/projectNew/client/assets/ao1nxlD.png')}
        navBarTitle='John Oliver'
        userName='John Oliver'
        userTitle='Comedian'
        userImage='http://i.imgur.com/RQ1iLOs.jpg'
      />
    );
  }

  render() {
    const { index } = this.state;

    switch(index) {
      case 0:
      return this.defaultView();
      case 1:
      return this.johnOliverView();
      case 2:
      return this.customView();
    }
  }
}

const styles = StyleSheet.create ({
  headerTextView: {
    backgroundColor: 'transparent',
  },
  headerTextViewTitle: {
    fontSize: 35,
    color: 'white',
    fontWeight: '300',
    paddingBottom: 10,
    textAlign: 'center'
  },
  headerTextViewSubtitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300'
  },
});
