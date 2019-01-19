import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Spinner } from 'native-base'
import { Alert ,Text} from 'react-native'

import Nav from '../../Components/Nav'
import Profile from './Profile'
import GET_ME from '../../graphql/get_me.query'
import {errorMessage} from '../../utils/tools'


const ProfileScreen = ({ navigation }) => (
  <Query
    query={GET_ME}
    onError={(error) => Alert.alert(error.message.replace(/GraphQL error:/g, ""))}
  >
    {({ loading,error, data }) => {
      if (loading) return  (
        <Spinner />
      );
      if (error) return  (
         <Text>{errorMessage(error)}</Text>
      );

      return (
        <Profile
          me={data.me}
          navigation={navigation}
        />
      );
    }}
  </Query>
);

ProfileScreen.navigationOptions = ({ navigation }) => ({
  header: (
    <Nav
      title="我"
      navigation={navigation}
      logoutText="退 出"
      hasLeftIcon={false}
      hasLogoutText={true}
    />
  ),
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
