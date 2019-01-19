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
          console.log(data)
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
            name={data.me.name ? data.me.name:""}
            gender={data.me.gender ? data.me.gender: ""}
            birthday={{
              calendar:data.me.birthdaycalendar,
              date:data.me.birthday
            }}
            birthplace={{
              province:data.me.birthplace && data.me.birthplace.province ? {code:data.me.birthplace.province.code,name:data.me.birthplace.province.name}:'',
              city:data.me.birthplace && data.me.birthplace.city ? {code:data.me.birthplace.city.code,name:data.me.birthplace.city.name} : '',
              area:data.me.birthplace && data.me.birthplace.area ? {code:data.me.birthplace.area.code,name:data.me.birthplace.area.name} : '',
              street:data.me.birthplace && data.me.birthplace.street ? {code:data.me.birthplace.street.code,name:data.me.birthplace.street.name} : '',
              village:data.me.birthplace && data.me.birthplace.village ? {code:data.me.birthplace.village.code,name:data.me.birthplace.village.name} : '',
            }}
            residence={{
              province:data.me.residence && data.me.residence.province ? {code:data.me.residence.province.code,name:data.me.residence.province.name}:'',
              city:data.me.residence && data.me.residence.city ? {code:data.me.residence.city.code,name:data.me.residence.city.name} : '',
              area:data.me.residence && data.me.residence.area ? {code:data.me.residence.area.code,name:data.me.residence.area.name} : '',
              street:data.me.residence && data.me.residence.street ? {code:data.me.residence.street.code,name:data.me.residence.street.name} : '',
              village:data.me.residence && data.me.residence.village ? {code:data.me.residence.village.code,name:data.me.residence.village.name} : '',
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
