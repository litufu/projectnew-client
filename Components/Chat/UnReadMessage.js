import React from 'react';
import { Mutation } from 'react-apollo';
import QueryMessages from './QueryMessages'

import ADD_NEWUNREADMESSAGE from '../../graphql/add_newUnReadMessage.mutation'


export default class UnReadMessage extends React.Component{

  render(){
    const {userInfo,navigation} = this.props
    return(
      <Mutation mutation={ADD_NEWUNREADMESSAGE} >
        {addNewUnReadMessages => (
          <QueryMessages 
            userInfo={userInfo}
            navigation={navigation}
            addNewUnReadMessages={addNewUnReadMessages}
          />
        )}
      </Mutation>
    )
  }
}


