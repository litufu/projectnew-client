import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements'

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import {defaultAvatar} from '../../utils/settings'
import GET_MESSAGES from '../../graphql/get_messages.query'
import MESSAGE_ADDED_SUBSCRIPTION from '../../graphql/message_added.subscription'
import Chat from './Chat'



class QueryMessages extends Component {
    componentDidMount() {
        const { data: { refetch, subscribeToMore } } = this.props;

        this.unsubscribe = subscribeToMore({
            document: MESSAGE_ADDED_SUBSCRIPTION,
            variables:{
                userId: this.props.me.id,
            },
            updateQuery: (prev,{ subscriptionData }) => {
                console.log('subscriptionData',subscriptionData)
                const newMessage = subscriptionData.data.messageAdded;
                console.log('newMessage',newMessage)
                console.log('prev1',prev)
                prev.messages.push(newMessage)
                console.log('prev2',prev)
                return prev
            },
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { data: { messages,loading,error } } = this.props;
        if(loading) return <Spinner />
        // if(error) return <Text>{error.message}</Text>
        const {userInfo,me} = this.props
        console.log('messages',messages)
        const newmessages = messages.filter(
            message=>(message.to.id===userInfo.id ||message.from.id===userInfo.id)
        ).sort(
            (a,b)=>(new Date(b.createdAt)-new Date(a.createdAt))
        ).map(message=>({
            _id: message.id,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
              _id: message.from.id,
              name: message.from.name,
              avatar:((message.from.avatar && message.from.avatar.url) || defaultAvatar),
            },
            sent: true,
            received: true,
        }))
        console.log('newmessages',newmessages)
        return (
            <Chat 
                messages={newmessages}
                userInfo={userInfo}
                me={me}
                navigation={this.props.navigation}
                addNewUnReadMessages={this.props.addNewUnReadMessages}
            />
        )
    }
}


export default graphql(GET_MESSAGES)(QueryMessages)
    
