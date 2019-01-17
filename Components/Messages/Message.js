import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,Badge, Spinner } from 'native-base';
import {Query,Mutation} from 'react-apollo'

import GET_MESSAGES from '../../graphql/get_messages.query'
import GET_NEWUNREADMESSAGES from '../../graphql/get_newUnReadMessages.query'
import {defaultAvatar} from '../../utils/settings'

const messageLength = 17
export default class ListThumbnailExample extends Component {

    getPersonLastUnReadMessageId=(unReadeMessages,person)=>{
        for(const unReadMessage of unReadeMessages){
            if(unReadMessage.type==="User" && unReadMessage.typeId===person.id){
                return unReadMessage.lastMessageId
            }
        }
        return null
    }

    getUnreadMessageNum = (personMessages,lastUnreadMessageId)=>{
        
        let count = 0
        for(const personMessage of personMessages){
            if(personMessage.id===lastUnreadMessageId){
                break
            }
            count ++
        }
        return count
    }

    renderBadge=(messages,person)=>{
        const sortedMessages = messages.sort(
            (a,b)=>(new Date(b.createdAt)-new Date(a.createdAt))
        )
        const personMessages = messages.filter(message=>(message.from.id===person.id || message.to.id===person.id))

       return  <Query query={GET_NEWUNREADMESSAGES}>
        {
            ({data})=>{
                
                const lastUnreadMessageId = this.getPersonLastUnReadMessageId(data.newUnreadMessages,person)
                console.log('lastUnreadMessageId',lastUnreadMessageId)
                let unReadMessageNum
                if(lastUnreadMessageId){
                   unReadMessageNum = this.getUnreadMessageNum(personMessages,lastUnreadMessageId,person)
                }else{
                    unReadMessageNum=personMessages.length
                }
                
                console.log('unReadMessageNum',unReadMessageNum)
                if(unReadMessageNum===0){
                    return <Text></Text>
                }
                return (
                    <Badge>
                    <Text>{unReadMessageNum}</Text>
                </Badge>
                )
            }
        }

        </Query>
    }

    messageToPersons=(messages,me)=>{
        const persons=[]
        const personIds = []
        const sortedMessages = messages.sort(
            (a,b)=>(new Date(b.createdAt)-new Date(a.createdAt))
        )
        for(const message of sortedMessages){
            if(message.from.id!==me.id && !~personIds.indexOf(message.from.id) ){
                persons.push(message.from)
                personIds.push(message.from.id)
            }else if(message.to.id !== me.id && !~personIds.indexOf(message.to.id) ){
                persons.push(message.to)
                personIds.push(message.to.id)
            }
        }
        return persons
    }

    personLastMessage=(messages,me)=>{
        const  personLM = {}
        const sortedMessages = messages.sort(
            (a,b)=>(new Date(b.createdAt)-new Date(a.createdAt))
        )
        for(const message of sortedMessages){
            if(message.from.id!==me.id 
                &&  !(~Object.keys(personLM).indexOf(message.from.id) && personLM[message.from.id])){
                personLM[message.from.id] = message.text.length>messageLength ? `${message.text.slice(0,messageLength)}...`:message.text
            }else if(message.to.id !== me.id 
                &&  !(~Object.keys(personLM).indexOf(message.to.id) && personLM[message.to.id])){
                    personLM[message.to.id] = message.text.length>messageLength ? `${message.text.slice(0,messageLength)}...`:message.text
            }
        }
        return personLM
    }



  render() {
      const {me,navigation} = this.props
    return (
        <Query query={GET_MESSAGES}>
        {
            ({loading,error,data})=>{
                if(loading) return <Spinner />
                if(error) return <Text>{error.message}</Text>
                return(
                    <List>
                        {this.messageToPersons(data.messages,me).map(
                            person=>(
                                <ListItem 
                                thumbnail 
                                key={person.id}
                                onPress={()=>navigation.navigate('Chat',{user:person,me})}
                                >
                                    <Left>
                                        <Thumbnail square source={{ uri: (person.avatar && person.avatar.url) || defaultAvatar }} />
                                    </Left>
                                    <Body>
                                        <Text>{person.name}</Text>
                                        <Text note numberOfLines={1}>{`${this.personLastMessage(data.messages,me)[person.id]}`}</Text>
                                    </Body>
                                    <Right>
                                        {this.renderBadge(data.messages,person)}
                                    </Right>
                                </ListItem>
                            )
                        )}
                    </List>
                )
            }
        }
        </Query>
    );
  }
}