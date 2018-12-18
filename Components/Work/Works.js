import React from 'react'
import {Query} from 'react-apollo'
import {Spinner,Text, View } from 'native-base'

import TimeLocationLine from './TimeLocationLine'
import GET_ME from '../../graphql/get_me.query'

const EventsWithData = () => (
  <Query
    query={GET_ME}
  >
    {({ loading,error,data }) => {
      if(loading) return <Spinner />
      if(error) return <Text>{error.message}</Text>
      console.log(data)
      if(data.me.works && data.me.works.length>0){
        console.log('works',data.me.works)
      return (<TimeLocationLine
        works={data.me.works.sort((a,b)=>(new Date(a.startTime) - new Date(b.startTime))) || []}
      />)}
      return <View></View>
    }}
  </Query>
);


export default EventsWithData


