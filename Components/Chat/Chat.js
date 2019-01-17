import React, { Component } from 'react';
import { Asset, AppLoading, ImagePicker } from 'expo';
import { Mutation } from 'react-apollo'
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import { GiftedChat, Actions, Bubble, Send } from 'react-native-gifted-chat';
import 'moment/locale/zh-cn'

import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import messagesData from './data';
import SEND_MESSAGE from '../../graphql/send_message.mutation'
import GET_MESSAGES from '../../graphql/get_messages.query'


const skip = 20

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages:[] ,
            appIsReady: false,
            image: null,
            loadEarlier: true,
            isLoadingEarlier: false,
        };
        this.renderSend = this.renderSend.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({messages:nextProps.messages.slice(0,this.state.messages.length+1)})
    }

    componentWillMount() {
        this._isMounted = true;
        this.setState(() => {
          return {
            messages: this.props.messages.slice(0,skip),
          };
        });
      }
    
      componentWillUnmount() {
        this._isMounted = false;
      }

    renderSend(props) {
        return (
            <Send
                {...props}
            >
                <View style={{marginRight: 10, marginBottom: 5}}>
                    <Ionicons name="md-send" size={32} color="green" />
                </View>
            </Send>
        );
    }

    renderCustomActions = (sendMessage, userInfo,me) => {
        const options = {
            '发送图片': async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: false,
                });
                this.setState({ image: result.uri })
                this.onSend([{
                    image: result.uri,
                    _id: Math.round(Math.random() * 1000000).toString(),
                    user: {
                        _id: 1,
                        name: "what",
                        avatar: 'http://i.imgur.com/uma9OfG.jpg',
                    }
                }], sendMessage, userInfo,me)
            },
            '取消': () => { },
        };
        return (
            <Actions
                options={options}
            />
        );
    }

    async componentDidMount() {
        // init with only system messages
        await Asset.fromModule(require('../../assets/avatar.png')).downloadAsync();
        this.setState({ appIsReady: true });
    }

    onLoadEarlier() {
        this.setState((previousState) => {
          return {
            isLoadingEarlier: true,
          };
        });
    
      
        if (this._isMounted === true) {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.prepend(previousState.messages,this.props.messages.slice(previousState.messages.length,previousState.messages.length+skip)),
                    loadEarlier: (previousState.messages.length+skip >= this.props.messages.length) ?false:true,
                    isLoadingEarlier: false,
                };
            });
        }
    }

    onSend = (messages = [], sendMessage, userInfo,me ) => {
        sendMessage({
            variables: { toId: userInfo.id, text: messages[0].text, image: this.state.image },
            optimisticResponse: {
                __typename: "Mutation",
                sendMessage: {
                  __typename: "Message",
                  id: '123456',
                  text:messages[0].text,
                  to:{
                      __typename:"User",
                      id:userInfo.id,
                      name:userInfo.name,
                      avatar:userInfo.avatar,
                  },
                  from:{
                      __typename:"User",
                      id:me.id,
                      name:me.name,
                      avatar:me.avatar
                  },
                  image:this.state.image ? {
                    __typename:"Photo",
                    id:"789456",
                    name:"123456",
                    url:this.state.image
                  } : null,
                  createdAt: new Date().toLocaleString(),
                }
              },
            update: (cache, { data: { sendMessage } }) => {
                // Read the data from our cache for this query.
                const data = cache.readQuery({ query: GET_MESSAGES });
                let newMessage
                if(sendMessage.image){
                    newMessage = {
                        ...sendMessage,
                        image:{
                            ...sendMessage.image,
                            url:"https://gewu-avatar.oss-cn-hangzhou.aliyuncs.com/images/${sendMessage.image.name}"
                        }
                    }
                }else{
                    newMessage = sendMessage
                }
                data.messages.push({ ...newMessage });
                // Write our data back to the cache.
                cache.writeQuery({ query: GET_MESSAGES,data });
            }
        })
    }

onReceive = (text) => {
    this.setState((previousState) => {
        return {
            messages: GiftedChat.append(previousState.messages, {
                _id: Math.round(Math.random() * 1000000).toString(),
                text: text,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                },
            }),
        };
    });
}

parsePatterns = (linkStyle) => {
    return [
        {
            pattern: /#(\w+)/,
            style: { ...linkStyle, color: 'darkorange' },
            onPress: () => Linking.openURL('http://gifted.chat'),
        },
    ];
}

_goBack=()=>{
    console.log('this.state.messages',this.state.messages)
    this.props.addNewUnReadMessages({variables:{
        type:"User",
        id:this.props.userInfo.id,
        lastMessageId:this.state.messages[0]._id
    }})
    this.props.navigation.goBack()
}

render() {
    const {userInfo,me} = this.props
    if (!this.state.appIsReady) {
        return <AppLoading />;
    }
    return (
        <View style={styles.container} accessible accessibilityLabel="main" testID="main">
            <Header>
                <Left>
                    <Button
                        onPress={() => this._goBack()}
                        transparent
                    >
                        <Icon name='md-arrow-back' type='Ionicons' />
                    </Button>
                </Left>
                <Body>
                    <Title>{userInfo.name}</Title>
                </Body>
                <Right />
            </Header>
            <Mutation mutation={SEND_MESSAGE}>
                {

                    (sendMessage, { loading, error, data }) => {
                        // if (loading) return <Text>loading</Text>
                        // if (error) return <Text>{error.message}</Text>

                        if (data && data.sendMessage.image) {
                            const xhr = new XMLHttpRequest()
                            xhr.open('PUT', data.sendMessage.image.url)
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
                            xhr.send({ uri: this.state.image, type: 'image/jpeg', name: data.sendMessage.image.name })
                        }

                        return (
                            <GiftedChat
                                messages={this.state.messages}
                                renderSend={this.renderSend}
                                onSend={(messages) => this.onSend(messages, sendMessage, userInfo,me)}
                                keyboardShouldPersistTaps="never"
                                user={{
                                    _id: me.id,
                                }}
                                parsePatterns={this.parsePatterns}
                                renderActions={() => this.renderCustomActions(sendMessage, userInfo,me)}
                                locale="zh-cn"
                                placeholder="输入信息..."
                                renderTime={null}
                                showAvatarForEveryMessage={true}
                                loadEarlier={this.state.loadEarlier}
                                onLoadEarlier={this.onLoadEarlier}
                                isLoadingEarlier={this.state.isLoadingEarlier}
                            />
                        )
                    }

                }

            </Mutation>

        </View>
    );
}

}
