import React from 'react'
import {Query} from 'react-apollo'
import {Spinner,Text } from 'native-base'
import {gql} from 'graphql-tag'

import TimeLocationLine from './TimeLocationLine'
import GET_ME from '../../graphql/get_me.query'

const EventsWithData = () => (
  <Query
    query={GET_ME}
  >
    {({ loading,error,data }) => {
      if(loading) return <Spinner />
      if(error) return <Text>{error.message}</Text>

      return (<TimeLocationLine
        studies={data.me.studies.sort((a,b)=>(new Date(a.startTime) - new Date(b.startTime))) || []}
      />)
    }}
  </Query>
);


export default EventsWithData


