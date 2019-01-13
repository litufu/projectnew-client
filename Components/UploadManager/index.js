
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
    ScrollView,
    Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


export default class UploadManager extends Component {

    componentDidMount() {
        const uploadProgress = p => console.log(p.currentSize / p.totalSize);
        AliyunOSS.addEventListener('uploadProgress', uploadProgress);
    }

    uploadFile = () => {
        console.log("准备上传")
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                let source = { uri: response.uri };

                AliyunOSS.asyncUpload("gewu-test", "test1.jpg", source.uri).then((res) => {
                    Alert.alert(
                        'Alert Title',
                        "恭喜你成功上传到阿里云服务器",
                        [
                            { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    )
                })
            }
        });
    }


    render() {
        return (
            <View >
                <Button
                    onPress={this.uploadFile}
                    title="上传文件"
                    color="#841584"
                />
            </View>
        )
    }




}