import React from 'react'
import {View,Text} from 'react-native'
import {Spinner} from 'native-base'
import gql from "graphql-tag";
import { Query } from "react-apollo";

import {errorMessage} from '../../utils/tools'
import GET_FAMILIES from '../../graphql/get_families.query'
import Example  from './Example'

const QueryFamilies = () => (
  <Query query={GET_FAMILIES}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />
      if (error) return <Text>{errorMessage(error)}</Text>

      return (
        <Example 
            data={data}
        />
      );
    }}
  </Query>
);

export default QueryFamilies