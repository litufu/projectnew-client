/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  ImageStore,
  Image,
  TouchableOpacity,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as OSS from 'react-native-aliyun-oss';
import * as Config from './config.json'
import * as ImagePickerManager from 'react-native-image-picker';


class aliyun_oss_sample extends Component {
  constructor(props){
    super(props)
    this.state={
      avatarSource:{uri:''},
      avatarSource2:{uri:''}
    }
  }
  componentWillMount(){
    console.log(JSON.stringify(Config.oss))
    console.log(JSON.stringify(OSS))
    OSS.initWithAppKey(Config.oss.endpoint,Config.oss.accessKeyId,Config.oss.accessKeySecret)
  }
  onUpload(){
    OSS.upload("twohours","sdsdest","")
  }
  onShowImagePicker() {
    var options = {
      noData: true,
      title: 'Select Avatar', // 选择器的标题，可以设置为空来不显示标题
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // 调取摄像头的按钮，可以设置为空使用户不可选择拍照
      chooseFromLibraryButtonTitle: 'Choose from Library...', // 调取相册的按钮，可以设置为空使用户不可选择相册照片
      customButtons: {
        'Choose Photo from Facebook': 'fb', // [按钮文字] : [当选择这个按钮时返回的字符串]
      },
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      maxWidth: 100, // photos only默认为手机屏幕的宽，高与宽一样，为正方形照片
      maxHeight: 100, // photos only
      allowsEditing: false, // 当用户选择过照片之后是否允许再次编辑图片
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        // 这是当用户选择customButtons自定义的按钮时，才执行
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data:
        var source = {};
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {
            uri: response.uri.replace('file://', ''),
            isStatic: true
          };
        }
        this.setState({
          avatarSource:source
        })
      }
    });
  }
  onUpload(){
      console.log('begin upload')
        OSS.upload("twohours","lsdjflsdkflj",this.state.avatarSource.uri)
          .then((d)=>{
            console.log('success upload:'+JSON.stringify(d))
            console.log("https://twohours."+Config.oss.endpoint+"/lsdjflsdkflj")
            this.setState({
              avatarSource2:{
                uri: "https://twohours."+Config.oss.endpoint+"/lsdjflsdkflj"
              }
            })
          })
          .catch((e)=>{
            console.error(e)
          })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onShowImagePicker.bind(this)}>
          <Text>
             show image picker
          </Text>
        </TouchableOpacity>
        <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
        <Image source={this.state.avatarSource2} style={styles.uploadAvatar} />
        <TouchableOpacity onPress={this.onUpload.bind(this)}>
          <Text>
            upload
          </Text>
        </TouchableOpacity>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  uploadAvatar:{
    width: 100,
    height: 100
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('aliyun_oss_sample', () => aliyun_oss_sample);