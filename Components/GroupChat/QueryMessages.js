import { Query } from 'react-apollo';
import React, { Component } from 'react';
import { defaultAvatar } from '../../utils/settings'

import Chat from './Chat'


export default class QueryMessages extends Component {

    _getNewMessages = (group) => {
        const newmessages = group.messages.sort(
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
        const {group,type,navigation,me,addNewUnReadMessages,groupName} = this.props
        return (
            < Chat
            me={me}
            groupName={groupName}
            messages = { this._getNewMessages(group) }
            type = { type }
            group={group}
            navigation = { navigation }
            addNewUnReadMessages = { addNewUnReadMessages }
            />
        )
    }
}

