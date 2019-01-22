import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import client from './apollo'
import { Font } from 'expo'
import { Text, View, AsyncStorage } from 'react-native';
import Navigation from './Navigation/SwitchNavigator'

import { DEV_HOST } from './utils/settings'

class App extends Component {
    state = {
        fontLoaded: false
    }

    async componentDidMount() {

        await Font.loadAsync({
            "montserratRegular": require('./assets/fonts/montserratRegular.ttf'),
            "montserratMedium": require('./assets/fonts/montserratMedium.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        })
        this.setState({ fontLoaded: true })

        // try {
        //     const mySchema = await AsyncStorage.getItem('mySchema');
        //     if (!mySchema) {
        //         let response = await fetch(
        //             DEV_HOST, {
        //                 method: 'POST',
        //                 headers: { 'Content-Type': 'application/json' },
        //                 body: JSON.stringify({
        //                     variables: {},
        //                     query: `
        //                         {
        //                             __schema {
        //                             types {
        //                                 kind
        //                                 name
        //                                 possibleTypes {
        //                                 name
        //                                 }
        //                             }
        //                             }
        //                         }
        //                 `,
        //                 })
        //             }
        //         );
        //         let result = await response.json();
        //         const filteredData = result.data.__schema.types.filter(
        //             type => type.possibleTypes !== null,
        //         );
        //         result.data.__schema.types = filteredData;
        //         await AsyncStorage.setItem('mySchema', JSON.stringify(result.data));
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    }

    render() {
        if (!this.state.fontLoaded) return null
        return (
            <ApolloProvider client={client}>
                <Navigation />
            </ApolloProvider>
        )
    }
}

export default App
