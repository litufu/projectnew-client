import React, { Component } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Thumbnail } from 'native-base'
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

  onPressOptions = () => {
    this.props.navigation.navigate('options')
  }

  render() {
    const { me } = this.props
    return (
      <ScrollView style={styles.scroll}>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('UserProfile',{id:me.id,me})}
        >
          <View style={styles.userRow}  >
            <View style={styles.userImage}>
              <Thumbnail
                large source={require('../../assets/RQ1iLOs.jpg')}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>{me && me.name}</Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16,
                }}
              >
                {me && me.username}
              </Text>
            </View>
          </View>
          </TouchableNativeFeedback>
          <View style={styles.lineContainer} />
         

          <View>
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

          <ListItem
            // chevron
            title="家庭成员"
            onPress={() => this.props.navigation.navigate('FamilyRelationship')}
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
            title="学习经历"
            onPress={() => this.props.navigation.navigate('StudyHistroy')}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#57DCE7' }}
                icon={{
                  type: 'font-awesome',
                  name: 'book',
                }}
              />
            }
            rightIcon={<Chevron />}
          />

          <ListItem
            // chevron
            title="工作经历"
            onPress={() => this.props.navigation.navigate('Work')}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FAD291' }}
                icon={{
                  type: 'material-community',
                  name: 'worker',
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
            onPress={() => this.props.navigation.navigate('AddPhoto')}
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
