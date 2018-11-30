import React, {Component} from 'react'
import {
  Container,
  Spinner,
} from 'native-base'
import {
  Alert,
} from "react-native"
import { withNavigation } from 'react-navigation'
import { Mutation,Query } from 'react-apollo'

import Nav from '../Nav'
import Info from './Info'
import GET_ME from '../../graphql/get_me.query'

export default class BasicInfo extends React.Component{

  render(){
    return(
      <Query query={GET_ME} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return (
            <Container>
              <Spinner />
            </Container>
          );
          if (error) {
            Alert.alert(error.message)
            return  <Info />
          }


          return (
            <Info
            name={data.me.name}
            gender={data.me.gender}
            birthday={{
              calendar:data.me.birthdaycalendar,
              date:data.me.birthday
            }}
            birthplace={{
              province:data.me.birthProvince ? {code:data.me.birthProvince.code,name:data.me.birthProvince.name}:'',
              city:data.me.birthCity ? {code:data.me.birthCity.code,name:data.me.birthCity.name} : '',
              area:data.me.birthArea ? {code:data.me.birthArea.code,name:data.me.birthArea.name} : '',
              street:data.me.birthStreet ? {code:data.me.birthStreet.code,name:data.me.birthStreet.name} : '',
              village:data.me.birthVillage ? {code:data.me.birthVillage.code,name:data.me.birthVillage.name} : '',
            }}
            />
          );
        }}
      </Query>
    )
  }
}

BasicInfo.navigationOptions = ({ navigation }) => ({
  header: (
    <Nav
      title="我的信息"
      navigation={navigation}
      leftIcon={{
        type: 'ionicon',
        name: 'md-arrow-back',
        size: 26,
      }}
      hasLeftIcon={true}
      hasLogoutText={false}
    />
  ),
})
