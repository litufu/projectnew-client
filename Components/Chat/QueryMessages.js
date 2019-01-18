import { Query } from 'react-apollo';
import React, { Component } from 'react';
import { Text,  Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import { defaultAvatar } from '../../utils/settings'

import GET_ME from '../../graphql/get_me.query'
import Chat from './Chat'


export default class QueryMessages extends Component {

    _getNewMessages = (messages,userInfo) => {
        const newmessages = messages.filter(
            message => (message.to.id === userInfo.id || message.from.id === userInfo.id)
        ).sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        ).map(message => ({
            _id: message.id,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
                _id: message.from.id,
                name: message.from.name,
                avatar: ((message.from.avatar && message.from.avatar.url) || defaultAvatar),
            },
            sent: true,
            received: true,
            image: message.image ? message.image.url : null
        }))
        return newmessages
    }

    render() {
        const {userInfo} = this.props
        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>

                        return (
                            < Chat
                            messages = { this._getNewMessages(data.me.messages,userInfo) }
                            userInfo = { userInfo }
                            navigation = { this.props.navigation }
                            addNewUnReadMessages = { this.props.addNewUnReadMessages }
                            />
                        )


                    }
                }
            </Query>

        )
    }

}

