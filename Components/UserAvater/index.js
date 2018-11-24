import React, { Component } from 'react';
import ImageCropPicker from "react-native-image-crop-picker";
import {Circle} from 'react-native-progress';
import {
	StyleSheet,
	ScrollView,
	View,
	Alert,
	Text,
	Platform,
  TouchableOpacity
} from 'react-native'

import config from "../../utils/config";

class UserAvater extends Component{

  state={
    isUploadingAvatar: false,
    uploadProgressAvatar: 0,
  }

  _upload = (res, type) => {
		// console.warn(res)
		let newState = {}
		newState.uploadProgressAvatar = 0;
		newState.isUploadingAvatar = true;
		this.setState(newState);
		request.upload(config.api.baseURI + config.api.uploadImage, {
			uri: res.path,
			ext: 'jpg'
		}, xhr => {
			if (xhr.upload) {
				xhr.upload.onprogress = (ev => {
					if (ev.lengthComputable) {
						let percent = Number((ev.loaded / ev.total).toFixed(2));
						if (type === 'background') {
							this.setState({
								uploadProgressBackground: percent
							})
						} else {
							this.setState({
								uploadProgressAvatar: percent
							})
						}

					}
				})
			}
		}).then(res => {
			// console.log(res)
			if (res.code === 0) {
				newState.uploadProgressAvatar = 0;
				newState.isUploadingAvatar = false;
				this.setState(newState)
				let user = this.state.user
				user[type] = res.data;
				let obj;
				obj = {avatar: res.data}
				this.updateUser(user, obj)
			} else {
				toast.fail(res.msg)
			}
		}).catch(err => {
			// console.warn(err)
			newState.uploadProgressAvatar = 0;
			newState.isUploadingAvatar = false;
		})
	}

  selectLibrary = (type) => {
		ImageCropPicker.openPicker({
			multiple: false,
			// cropping: true,
			mediaType: 'photo',
			compressImageQuality: Platform.OS === 'ios' ? 0 : 1,
			minFiles: 1,
			maxFiles: 1,
		}).then(image => {
			this._upload(image, type)
		}).catch(err => {
			if (err.code === 'E_PICKER_CANCELLED') {
				return
			}
			Alert.alert('出错啦~')
		})
	}

  openCamera = (type) => {
		ImageCropPicker.openCamera({
			cropping: true,
			// compressImageQuality: 1
		}).then(image => {
			// console.log(image.path);
			this._upload(image, type)
		});
	}

  showAction = (type = 'avatar') => {
		let items = [
			{title: '拍照', onPress: _ => config.loadData(_ => this.openCamera(type))},
			{title: '从相册中选取', onPress: _ => config.loadData(_ => this.selectLibrary(type))}
		];
		config.showAction(items)
	}




  render(){
    return(
      <View>
      <TouchableOpacity onPress={_ => this.showAction('avatar')}>
			   {isUploadingAvatar ?
  					<Circle
  						size={45}
  						showsText={true}
  						progress={uploadProgressAvatar}
  					/> :
  					!user.avatar ? '未设置' :
  						<ImageCached
  							component={Avatar}
  							medium
  							rounded
  							source={{uri: user.avatar}}
  						/>
  				}
        </TouchableOpacity>
			</View>
    )
  }
}
