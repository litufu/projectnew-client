import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo'
import {
  Text,
  View,
  Animated,
  ScrollView,
  TouchableNativeFeedback,
  Image
} from 'react-native';
import { ActionSheet } from 'teaset'
import { ImagePicker } from 'expo';
import { Icon, List, ListItem } from 'react-native-elements';
// import {Image} from "react-native-expo-image-cache";

import { USER, FACEBOOK_LIST, SLACK_LIST, GENERIC_LIST, SCREEN_WIDTH, SCREEN_HEIGHT, DEFAULT_WINDOW_MULTIPLIER, DEFAULT_NAVBAR_HEIGHT } from './constants';
import styles from './styles';
import POST_PHOTO from '../../../graphql/post_photo.mutation'
import GET_PHOTO from '../../../graphql/get_photo.query'

const ScrollViewPropTypes = ScrollView.propTypes;

export default class ParallaxScrollView extends Component {
  constructor() {
    super();

    this.state = {
      scrollY: new Animated.Value(0),
      image: null,
      url: null,
    };
  }

  queryPhoto = (userImage, USER) => (
    <Query
      query={GET_PHOTO}
      variables={{ 'name': this.props.data.userInfo.avatar.name }}
      onCompleted={(data)=>this.setState({url:data.photo.url})}
    >
      {
        ({ loading, error, data, client }) => {
          if (loading) return <Text>loading</Text>
          if (error) return <Text>error</Text>
          if (this.props.me.id !== this.props.data.userInfo.id) {
            return (
              <TouchableNativeFeedback
                style={styles.avatarView}
              >
                <Image source={{ uri: data.photo.url || USER.image }} style={{ height: 120, width: 120, borderRadius: 60 }} />
              </TouchableNativeFeedback>
            )
          }
          return (
            <View>
              {this.uploadAvatar(data.photo.url, userImage, USER, client)}
            </View>
          )
        }
      }
    </Query>
  )

  uploadAvatar = (url, userImage, USER) => (
    <Mutation
      mutation={POST_PHOTO}
      refetchQueries={({ data }) => {
        console.log('refetchdata,', data)
        return [{ query: GET_PHOTO, variables: { 'name': data.postPhoto.name } }]
      }
      }
      onCompleted={async (uploadData) => {
        const { data } = await client.query({
          query: GET_PHOTO,
          variables: { name: uploadData.postPhoto.name },
          fetchPolicy: "network-only",
        })
        this.setState({ url: data.photo.url })
      }
      }
    >
      {
        (postPhoto, { loading, error, data }) => {
          if (loading) return <Text>loading</Text>
          if (error) return <Text>{error.message}</Text>

          if (data) {
            const xhr = new XMLHttpRequest()
            xhr.open('PUT', data.postPhoto.url)
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  console.log('Image successfully uploaded to oss')
                } else {
                  console.log('Error while sending the image to oss')
                }
              }
            }
            xhr.setRequestHeader('Content-Type', 'image/jpeg')
            xhr.send({ uri: this.state.image, type: 'image/jpeg', name: data.postPhoto.name })

          }

          return (
            <TouchableNativeFeedback
              style={styles.avatarView}
              onPress={() => this.onPressAvatar(postPhoto)}
            >
              <Image source={{ uri: this.state.url || USER.image }} style={{ height: 120, width: 120, borderRadius: 60 }} />
            </TouchableNativeFeedback>
          )
        }
      }
    </Mutation>
  )

  _pickImage = async (postPhoto) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    this.setState({ image: result.uri })
    if (!result.cancelled) {
      postPhoto({
        variables: { uri: result.uri }
      })
    }
  };

  onPressAvatar = (postPhoto) => {
    const { data, me } = this.props
    if (data.userInfo.id !== me.id) {
      return
    } else {
      let items = [
        { title: '从相册选取照片', onPress: () => this._pickImage(postPhoto) },
      ];
      let cancelItem = { title: '取消' };
      ActionSheet.show(items, cancelItem);
    }
  }

  scrollTo(where) {
    if (!this._scrollView) return;
    this._scrollView.scrollTo(where);
  }

  renderBackground() {
    var { windowHeight, backgroundSource, onBackgroundLoadEnd, onBackgroundLoadError } = this.props;
    var { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    return (
      <Animated.Image
        style={[
          styles.background,
          {
            height: windowHeight,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-windowHeight, 0, windowHeight],
                  outputRange: [windowHeight / 2, 0, -windowHeight / 3]
                })
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-windowHeight, 0, windowHeight],
                  outputRange: [2, 1, 1]
                })
              }
            ]
          }
        ]}
        source={backgroundSource}
        onLoadEnd={onBackgroundLoadEnd}
        onError={onBackgroundLoadError}
      >
      </Animated.Image>
    );
  }

  renderHeaderView() {
    const { windowHeight, backgroundSource, userImage, userName, userTitle, navBarHeight, onPressAvatar } = this.props;
    console.log(userImage)
    const { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    const newNavBarHeight = navBarHeight || DEFAULT_NAVBAR_HEIGHT;
    const newWindowHeight = windowHeight - newNavBarHeight;

    return (
      <Animated.View
        style={{
          opacity: scrollY.interpolate({
            inputRange: [-windowHeight, 0, windowHeight * DEFAULT_WINDOW_MULTIPLIER + newNavBarHeight],
            outputRange: [1, 1, 0]
          })
        }}
      >
        <View style={{ height: newWindowHeight, justifyContent: 'center', alignItems: 'center' }}>
          {this.props.headerView ||
            (
              <View>
                {this.queryPhoto(userImage, USER)}
                {/* <TouchableNativeFeedback
                  style={styles.avatarView}
                  // onPress={onPressAvatar}
                >
                  <Image source={{uri: userImage || USER.image}} style={{height: 120, width: 120, borderRadius: 60}} />
                </TouchableNativeFeedback> */}
                <View style={{ paddingVertical: 10 }}>
                  <Text style={{ textAlign: 'center', fontSize: 22, color: 'black', paddingBottom: 5 }}>{userName || USER.name}</Text>
                  <Text style={{ textAlign: 'center', fontSize: 17, color: 'black', paddingBottom: 5 }}>{userTitle || USER.title}</Text>
                </View>
              </View>
            )
          }
        </View>
      </Animated.View>
    );
  }

  renderNavBarTitle() {
    const { windowHeight, backgroundSource, navBarTitleColor, navBarTitleComponent } = this.props;
    const { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    return (
      <Animated.View
        style={{
          opacity: scrollY.interpolate({
            inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
            outputRange: [0, 0, 1]
          })
        }}
      >
        {navBarTitleComponent ||
          <Text style={{ fontSize: 18, fontWeight: '600', color: navBarTitleColor || 'white' }}>
            {this.props.navBarTitle || USER.name}
          </Text>}
      </Animated.View>
    );
  }

  rendernavBar() {
    const {
      windowHeight, backgroundSource, leftIcon,
      rightIcon, leftIconOnPress, rightIconOnPress, navBarColor, navBarHeight, leftIconUnderlayColor, rightIconUnderlayColor
    } = this.props;
    const { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    const newNavBarHeight = navBarHeight || DEFAULT_NAVBAR_HEIGHT;

    if (this.props.navBarView) {
      return (
        <Animated.View
          style={{
            height: newNavBarHeight,
            width: SCREEN_WIDTH,
            flexDirection: 'row',
            backgroundColor: scrollY.interpolate({
              inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
              outputRange: ['transparent', 'transparent', navBarColor || 'rgba(0, 0, 0, 1.0)'],
              extrapolate: 'clamp'
            })
          }}
        >
          {this.props.navBarView}
        </Animated.View>
      );
    }
    else {
      return (
        <Animated.View
          style={{
            height: newNavBarHeight,
            width: SCREEN_WIDTH,
            flexDirection: 'row',
            backgroundColor: scrollY.interpolate({
              inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
              outputRange: ['transparent', 'transparent', navBarColor || 'rgba(0, 0, 0, 1.0)']
            })
          }}
        >
          {leftIcon &&
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Icon
                name={leftIcon && leftIcon.name || 'menu'}
                type={leftIcon && leftIcon.type || 'simple-line-icon'}
                color={leftIcon && leftIcon.color || 'white'}
                size={leftIcon && leftIcon.size || 23}
                onPress={leftIconOnPress}
                underlayColor={leftIconUnderlayColor || 'transparent'}
              />
            </View>
          }
          <View
            style={{
              flex: 5,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center'
            }}
          >
            {this.renderNavBarTitle()}
          </View>
          {rightIcon &&
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Icon
                name={rightIcon && rightIcon.name || 'present'}
                type={rightIcon && rightIcon.type || 'simple-line-icon'}
                color={rightIcon && rightIcon.color || 'white'}
                size={rightIcon && rightIcon.size || 23}
                onPress={rightIconOnPress}
                underlayColor={rightIconUnderlayColor || 'transparent'}
              />
            </View>
          }
          {!rightIcon &&
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text></Text>
            </View>
          }
        </Animated.View>
      );
    }
  }

  renderTodoListContent() {
    return (
      <View style={styles.listView}>
        <List>
          {
            FACEBOOK_LIST.map((item, index) => (
              <ListItem
                key={index}
                onPress={() => console.log('List item pressed')}
                title={item.title}
                leftIcon={{ name: item.icon }} />
            ))
          }
        </List>
        <List>
          {
            SLACK_LIST.map((item, index) => (
              <ListItem
                key={index}
                onPress={() => console.log('List item pressed')}
                title={item.title}
                leftIcon={{ name: item.icon }} />
            ))
          }
        </List>
        <List>
          {
            GENERIC_LIST.map((item, index) => (
              <ListItem
                key={index}
                onPress={() => console.log('List item pressed')}
                title={item.title}
                leftIcon={{ name: item.icon }} />
            ))
          }
        </List>
        <List containerStyle={{ marginBottom: 15 }}>
          <ListItem
            key={1}
            hideChevron={true}
            onPress={() => console.log('Logout Pressed')}
            title='LOGOUT'
            titleStyle={styles.logoutText}
            icon={{ name: '' }} />
        </List>
      </View>
    );
  }

  render() {
    const { style, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderBackground()}
        {this.rendernavBar()}
        <ScrollView
          ref={component => {
            this._scrollView = component;
          }}
          {...props}
          style={styles.scrollView}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
          scrollEventThrottle={16}
        >
          {this.renderHeaderView()}
          <View style={[styles.content, props.scrollableViewStyle]}>
            {this.props.children || this.renderTodoListContent()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

ParallaxScrollView.defaultProps = {
  backgroundSource: { uri: 'http://i.imgur.com/6Iej2c3.png' },
  windowHeight: SCREEN_HEIGHT * DEFAULT_WINDOW_MULTIPLIER,
  leftIconOnPress: () => console.log('Left icon pressed'),
  rightIconOnPress: () => console.log('Right icon pressed')
};

ParallaxScrollView.propTypes = {
  ...ScrollViewPropTypes,
  backgroundSource: PropTypes.object,
  windowHeight: PropTypes.number,
  navBarTitle: PropTypes.string,
  navBarTitleColor: PropTypes.string,
  navBarTitleComponent: PropTypes.node,
  navBarColor: PropTypes.string,
  userImage: PropTypes.string,
  userName: PropTypes.string,
  userTitle: PropTypes.string,
  headerView: PropTypes.node,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object
};
