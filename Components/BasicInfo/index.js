import React, {Component} from 'react'
import {
  Container,
  Header,
  Left,
  Body,
  Button,
  Icon,
  Title,
  Content,
  Form,
  Item,
  Label,
  Input,
  Spinner,
  DatePicker,
  Right,
  ListItem,
  List,
  Picker
} from 'native-base'
import {
  Text,
  Alert,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  StyleSheet,

} from "react-native"
import { withNavigation } from 'react-navigation'
import gql from 'graphql-tag'
import { Mutation,Query } from 'react-apollo'

import Nav from '../Nav'
import Info from './Info'

const GET_ME = gql`
{
  me {
    name
    gender
    birthdaycalendar
    birthday
    birthProvince{
      id
      name
    }
    birthCity{
      id
      name
    }
    birthArea{
      id
      name
    }
    birthStreet{
      id
      name
    }
    birthVillage{
      id
      name
    }
  }
}
`;

export default class BasicInfo extends React.Component{

  render(){
    return(
      <Query query={GET_ME} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return (
            <Container>
              <Spinner />
              <Info />
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
              year:data.me.birthday ? new Date(data.me.birthday).getFullYear() : '',
              month:data.me.birthday ? new Date(data.me.birthday).getMonth()+1 : '',
              day:data.me.birthday ? new Date(data.me.birthday).getDate() : '',
              hour:data.me.birthday ? new Date(data.me.birthday).getHours() : ''
            }}
            birthplace={{
              province:data.me.province ? data.me.province.name : '',
              city:data.me.city ? data.me.city.name : '',
              area:data.me.area ? data.me.area.name : '',
              street:data.me.street ? data.me.street.name : '',
              village:data.me.village ? data.me.village.name : '',
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
