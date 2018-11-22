import React from 'react'
import PropTypes from 'prop-types'

import contactData from '../../mocks/contact.json'
import  Nav  from '../../Components/Nav'
import Profile from './Profile'

const ProfileScreen = ({ navigation }) => (
  <Profile {...contactData} navigation={navigation} />
)

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
