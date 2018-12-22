import React from 'react'
import { StyleSheet, View, Text, TextInput,Alert } from 'react-native'
import {Query}  from 'react-apollo'
import  {Spinner} from 'native-base'

import {errorMessage}  from '../../utils/tools'
import GET_ME from '../../graphql/get_me.query'
import Result from './Result'

export default class QueryResult extends React.Component{

    render(){
        return(
            <Query
                query={GET_ME}
                >
                {({ loading, error, data }) => {
                    console.log("data",data)
                    if (loading) return <Spinner/>;
                    if(error) return <View><Text>{errorMessage(error)}</Text></View>
                    if(data.me && data.me.regStatus){
                        return (
                           <Result 
                            me={data.me}
                           />
                        );
                    }
                    return (
                        <Result 
                        />
                    ) 
                    
                }}
                </Query>
        )
    }
}


