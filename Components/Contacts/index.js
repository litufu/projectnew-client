import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import {Query} from 'react-apollo'
import {withNavigation} from 'react-navigation'
import GET_FAMILYGROUPS from '../../graphql/get_familyGroups.query'
import GET_CLASSGROUPS from '../../graphql/get_classGroups.query'
import GET_MYOLDCOLLEAGUES from '../../graphql/get_myOldColleagues.query'
import GET_WORKGROUPS from '../../graphql/get_workGroups.query'

const defaultImage = 'http://i.imgur.com/uma9OfG.jpg'

class Contacts extends Component {

  state={
    loading:false
  }

  _getFamilyUsers=(familyGroups,me)=>{
    let users = []
    let userIds = []
    for(const familyGroup of familyGroups){
      for(const family of familyGroup.families){
        console.log(family)
        if(family.to.user && !~userIds.indexOf(family.to.user.id) && family.to.user.id!==me.id){
          users.push(family.to.user)
          userIds.push(family.to.user.id)
        }
      }
    }
    return users
  }

  _renderFamilyList=(me)=>(
    <Query query={GET_FAMILYGROUPS}>
      {
        ({loading,error,data})=>{
          if(loading) return <Text>loading</Text>
          if(error) <Text>{error}</Text>
          return(
            <List>
           { (this._getFamilyUsers(data.getFamilyGroups,me)).map(user=>(
                <ListItem thumbnail key={user.id}   onPress={()=>this.props.navigation.navigate('UserProfile',{id:user.id,me,come:'Group'})}>
                <Left>
                  <Thumbnail square source={{ uri: (user.avatar && user.avatar.url) || defaultImage  }} />
                </Left>
                <Body>
                  <Text>{user.name}</Text>
                </Body>
              </ListItem>
            ))}
            </List>
          )
        }

      }

    </Query>
  )


  _getClassmates=(classGroups,me)=>{
    let users = []
    let userIds = []
    for(const classGroup of classGroups){
      for(const member of classGroup.members){
        if(member.student && !~userIds.indexOf(member.student.id) && member.status==='1' && member.student.id !== me.id){
          users.push(member.student)
          userIds.push(member.student.id)
        }
      }
    }
    return users
  }

  _renderClassMates=(me)=>(
    <Query 
    query={GET_CLASSGROUPS}
    >
      {
        ({loading,error,data})=>{
          if(loading) return <Text>loading</Text>
          if(error) return <Text>{error}</Text>
          return(
            <List>
            {(this._getClassmates(data.classGroups,me)).map(user=>(
                <ListItem thumbnail key={user.id}   onPress={()=>this.props.navigation.navigate('UserProfile',{id:user.id,me,come:'Group'})}>
                <Left>
                  <Thumbnail square source={{ uri: (user.avatar && user.avatar.url) || defaultImage  }} />
                </Left>
                <Body>
                  <Text>{user.name}</Text>
                </Body>
              </ListItem>
            ))}
            </List>
          )
        }
      }
    </Query>
  )

  _getOldColleages=(myOldColleagues,me)=>{
    console.log(myOldColleagues)
    let users = []
    let userIds = []
    for(const myOldColleague of myOldColleagues){
        if(myOldColleague.to && !~userIds.indexOf(myOldColleague.to.id) && myOldColleague.status==='3' && myOldColleague.to.id !== me.id){
          users.push(myOldColleague.to)
          userIds.push(myOldColleague.to.id)
      }
    }
    console.log(users)
    return users
  }


  _renderOldColleages=(me)=>(
    <Query 
    query={GET_MYOLDCOLLEAGUES}
    >
      {
        ({loading,error,data})=>{
          if(loading) return <Text>loading</Text>
          if(error) return <Text>{error}</Text>
          console.log(data)
          return(
            <List>
            {(this._getOldColleages(data.myOldColleagues,me)).map(user=>(
                <ListItem thumbnail key={user.id}  onPress={()=>this.props.navigation.navigate('UserProfile',{id:user.id,me,come:"Group"})}>
                <Left>
                  <Thumbnail square source={{ uri: (user.avatar && user.avatar.url) || defaultImage  }} />
                </Left>
                <Body>
                  <Text>{user.name}</Text>
                </Body>
              </ListItem>
            ))}
            </List>
          )
        }
      }
    </Query>
  )

  _getNowColleages=(workGroups,me)=>{
    let users = []
    let userIds = []
    for(const workGroup of workGroups){
      for(const colleague of workGroup.colleagues){
        if(colleague.worker && !~userIds.indexOf(colleague.worker.id) && colleague.status==='1' && colleague.worker.id !== me.id){
          users.push(colleague.worker)
          userIds.push(colleague.worker.id)
        }
      }
    }
    return users
  }

  _renderNowColleages=(me)=>{
    <Query 
    query={GET_WORKGROUPS}
    >
      {
        ({loading,error,data})=>{
          if(loading) return <Text>loading</Text>
          if(error) return <Text>{error}</Text>
          return(
            <List>
            {(this._getNowColleages(data.workGroups,me)).map(user=>(
                <ListItem thumbnail key={user.id}  onPress={()=>this.props.navigation.navigate('UserProfile',{id:user.id,me,come:'Group'})}>
                <Left>
                  <Thumbnail square source={{ uri: (user.avatar && user.avatar.url) || defaultImage  }} />
                </Left>
                <Body>
                  <Text>{user.name}</Text>
                </Body>
              </ListItem>
            ))}
            </List>
          )
        }
      }
    </Query>
  }

  render() {
    const me = this.props.me
    return (
          <List>
          <ListItem itemDivider>
              <Text>家人</Text>
            </ListItem> 
            {this._renderFamilyList(me)}
            <ListItem itemDivider>
              <Text>同学</Text>
            </ListItem> 
          {this._renderClassMates(me)}
            <ListItem itemDivider>
              <Text>同事</Text>
            </ListItem> 
            {this._renderOldColleages(me)}
            {this._renderNowColleages(me)}
          </List>

    );
  }
}

export default withNavigation(Contacts)