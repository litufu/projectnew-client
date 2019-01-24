import { Query } from 'react-apollo';
import React, { Component } from 'react';
import { defaultAvatar } from '../../utils/settings'

import Chat from './Chat'
import {storeMessage,retrieveMessages} from '../../utils/tools'


export default class QueryMessages extends Component {

    state={
        storageMessages:[]
    }

    async componentDidMount(){
        const storageMessages = await retrieveMessages(`${this.props.group.type}${this.props.group.id}`)
        this.setState({storageMessages})
    }

    _getNewMessages = (group) => {
        console.log('group',group)
        let newMessages
        newMessages = group.messages.sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        )
        const storageMessages = this.state.storageMessages

        if(newMessages.length===0) {
            newMessages=storageMessages
        }else{
            const storageMessageIds = storageMessages.map(message=>message.id)
            for(let i = newMessages.length-1;i >= 0;i--){
                const message = newMessages[i];
                if(~(storageMessageIds.indexOf(message.id))){
                    newMessages.splice(i,1);
                }
            }
            newMessages = storageMessages.concat(newMessages).sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))
            console.log('newMessages2',newMessages)
        }
        
        newMessages = storageMessages.concat(newMessages).sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))
        console.log('newMessages2',newMessages)

        const displaymessages = newMessages.map(message => ({
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
        console.log('displaymessages',displaymessages)
        return displaymessages
    }

    render() {
        const {group,type,navigation,me,addNewUnReadMessages,groupName} = this.props
        return (
            < Chat
            me={me}
            groupName={groupName}
            messages = {this._getNewMessages(group) }
            type = { type }
            group={group}
            navigation = { navigation }
            addNewUnReadMessages = { addNewUnReadMessages }
            />
        )
    }
}

