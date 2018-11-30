import React, { Component } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'

import BaseIcon from './Icon'
import Chevron from './Chevron'


const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  lineContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#F4F5F4',
  },
})

class SettingsScreen extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    emails: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  state = {
    pushNotifications: true,
  }

  onPressOptions = () => {
    this.props.navigation.navigate('options')
  }

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
  }

  render() {
    const { avatar, name, emails: [firstEmail] } = this.props
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: avatar,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{name}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {firstEmail.email}
            </Text>
          </View>
        </View>
        <View style={styles.lineContainer} />
        <View>

          <ListItem
            // chevron
            title="收到的评价"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            badge={{
              value: 5,
              textStyle: { color: 'white' },
              containerStyle: { backgroundColor: 'gray', marginTop: 0 },
            }}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FAD291' }}
                icon={{
                  type: 'font-awesome',
                  name: 'comment',
                }}
              />
            }
            rightIcon={<Chevron />}
          />

          <ListItem
            // chevron
            title="历史轨迹"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#57DCE7' }}
                icon={{
                  type: 'font-awesome',
                  name: 'history',
                }}
              />
            }
            rightIcon={<Chevron />}
          />

          <ListItem
            // chevron
            title="家庭成员"
            onPress={() => this.props.navigation.navigate('Family')}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FEA8A1' }}
                icon={{
                  type: 'font-awesome',
                  name: 'link',
                }}
              />
            }
            rightIcon={<Chevron />}
          />

          <ListItem
            // chevron
            title="我的信息"
            onPress={() => this.props.navigation.navigate('BasicInfo')}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#A4C8F0' }}
                icon={{
                  type: 'font-awesome',
                  name: 'info',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
        <View style={styles.lineContainer} />
        <View>
          <ListItem
            title="手机验证"
            onPress={() => this.props.navigation.navigate('MyDatetime')}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#A4C8F0' }}
                icon={{
                  type: 'Feather',
                  name: 'smartphone',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="修改密码"
            onPress={() => this.props.navigation.navigate('ChangePassword')}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#C6C7C6' }}
                icon={{
                  type: 'Entypo',
                  name: 'fingerprint',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="设置"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#C47EFF',
                }}
                icon={{
                  type: 'Ionicons',
                  name: 'settings',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="帮助"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}

            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FECE44',
                }}
                icon={{
                  type: 'Feather',
                  name: 'help',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
      </ScrollView>
    )
  }
}

export default SettingsScreen
