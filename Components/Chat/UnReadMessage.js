import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import QueryMessages from './QueryMessages'

import ADD_NEWUNREADMESSAGE from '../../graphql/add_newUnReadMessage.mutation'


export default class UnReadMessage extends React.Component{

  render(){
    const {userInfo,me,navigation} = this.props
    return(
      <Mutation mutation={ADD_NEWUNREADMESSAGE} >
        {addNewUnReadMessages => (
          <QueryMessages 
            userInfo={userInfo}
            me={me}
            navigation={navigation}
            addNewUnReadMessages={addNewUnReadMessages}
          />
        )}
      </Mutation>
    )
  }
}


