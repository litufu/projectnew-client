import { Query } from 'react-apollo';
import React, { Component } from 'react';
import { Text,  Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import { defaultAvatar } from '../../utils/settings'

import GET_ME from '../../graphql/get_me.query'
import Chat from './Chat'
import {storeMessage,retrieveMessages} from '../../utils/tools'


export default class QueryMessages extends Component {

    state={
        storageMessages:[]
    }

    async componentDidMount(){
        const storageMessages = await retrieveMessages(`${this.props.me.id}User${this.props.userInfo.id}`)
        if(storageMessages){
            this.setState({storageMessages:JSON.parse(storageMessages)})
        }
    }

    _getNewMessages = (messages,userInfo) => {
        console.log('messages',messages)
        console.log('userInfo',userInfo.id)
        let newMessages
        newMessages = messages.filter(
            message => (message.to.id === userInfo.id || message.from.id === userInfo.id)
        ).sort(
            (a, b) => (new Date(b.createdAt) - new Date(a.createdAt))
        )
        console.log('newMessages1',newMessages)
        
        const storageMessages = this.state.storageMessages
        console.log('storageMessages',storageMessages)
        
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
        const {userInfo,me,navigation} = this.props
        
     
        return (
            < Chat
            me={me}
            messages = {this._getNewMessages(me.messages,userInfo) }
            userInfo = { userInfo }
            navigation = { navigation }
            addNewUnReadMessages = { this.props.addNewUnReadMessages }
            />
        )


    }

}

