import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Query, Mutation } from 'react-apollo'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import { relationCompute, } from './settings'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

import GET_CLASSGROUPS from '../../graphql/get_classGroups.query'
import ADD_CLASSGROUP from '../../graphql/add_classGroup.mutation'
import CONFIRM_CLASSGROUP from '../../graphql/confirm_classGroup.mutation'
import CLASSGROUP_CHANGED_SUBSCRIPTION from '../../graphql/classGroup_changed.subscription'

export default class ClassList extends Component {

  _renderAddBtn = (name, schoolEduId, studentId) => (
    <Mutation 
    mutation={ADD_CLASSGROUP}
    update={(cache, { data: { addClassGroup } }) => {
      const { classGroups } = cache.readQuery({ query: GET_CLASSGROUPS,variables:{schoolEduId} });
      cache.writeQuery({
        query: GET_CLASSGROUPS,
        variables:{schoolEduId},
        data: { classGroups: classGroups.concat([addClassGroup]) }
      });
    }}

    >
      {
        (addClassGroup, { loading, error }) => {
          if (loading) return <Spinner />
          return (
            <Button
              transparent
              onPress={() => addClassGroup({ 
                variables: { name, schoolEduId, studentId },
  
               })}
            >
              <Text>申请认证</Text>
              {error && Alert.alert(errorMessage(error))}
            </Button>
          )
        }
      }
    </Mutation>
  )

  _renderConfirmBtn = (groupId,schoolEduId, studentId,refetch,networkStatus) => (
    <Mutation 
    mutation={CONFIRM_CLASSGROUP}
    >
      {
        (confirmClassGroup, { loading, error }) => {
          if (loading) return <Spinner />
          if(networkStatus===4) return <Spinner />
          return (
            <Button
              transparent
              onPress={() =>{
                confirmClassGroup({ 
                  variables: { schoolEduId, studentId },
                 })
              } }
            >
              <Text>确认</Text>
              {error && Alert.alert(errorMessage(error))}
            </Button>
          )
        }
      }
    </Mutation>
  )

  _getMyGroups = (classGroups, myId) => {
    const myGroups = classGroups.filter(classGroup => {
      for (const member of classGroup.members) {
        if (member.student.id === myId && member.status === '1') {
          return true
        }
      }
      return false
    })
    if (myGroups.length > 0) {
      return myGroups
    }
    return []
  }

  _getMyWillGroups = (classGroups, myId) => {
    const myGroups = classGroups.filter(classGroup => {
      for (const member of classGroup.members) {
        if (member.student.id === myId && member.status === '0') {
          return true
        }
      }
      return false
    })
    if (myGroups.length > 0) {
      return myGroups
    }
    return []
  }

  _checkStudentInGroup = (myGroup, studentId) => {

    for (const member of myGroup.members) {
      if (member.student.id === studentId) {
        return member.status
      }
    }
    return '-1'
  }

  _checkStudentInWillGroup = (myWillGroups, studentId) => {
    for (const myWillGroup of myWillGroups) {
      for (const member of myWillGroup.members) {
        if (member.student.id === studentId && member.status === '1') {
          return '2'
        }
      }
    }
    return '-1'
  }


  _renderButton = (classGroups, studentId, myId, schoolEduId, schoolEduName,refetch, networkStatus ) => {
    const myGroups = this._getMyGroups(classGroups, myId)
    console.log('myGroups', myGroups)
    const myWillGroups = this._getMyWillGroups(classGroups, myId)
    console.log('myWillGroups', myWillGroups)
    let studentStatus
    if (myGroups.length > 0) {
      studentStatus = this._checkStudentInGroup(myGroups[0], studentId)
    }
    if (!(studentStatus === '1' || studentStatus === '0')) {
      studentStatus = this._checkStudentInWillGroup(myWillGroups, studentId)
    }

    if (studentStatus === '0') {
      return (
        this._renderConfirmBtn(myGroups[0].id,schoolEduId, studentId,refetch,networkStatus)
      )
    } else if (studentStatus === '1') {
      return (
        <Button transparent disabled>
          <Text>已认证</Text>
        </Button>
      )
    } else if (studentStatus === '2') {
      return (
        <Button transparent disabled>
          <Text>等待确认</Text>
        </Button>
      )
    }
    return (this._renderAddBtn(schoolEduName, schoolEduId, studentId))
  }

  _subscribeClassGroupChanged = async (subscribeToMore, refetch) => {
    subscribeToMore({
      document: CLASSGROUP_CHANGED_SUBSCRIPTION,
      updateQuery: async (prev,{ subscriptionData }) => {
        refetch()
        return prev
      
      }
    })
  }

  render() {
    const schoolEdu = this.props.navigation.getParam('schoolEdu')
    const schoolEduName = this.props.navigation.getParam('schoolEduName', '')
    const me = this.props.navigation.getParam('me', '')
    return (
      <Container>
        <Header style={{ marginTop: statusBarHeight, backgroundColor: headerBackgroundColor }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' style={{ color: headerButtonColor }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: headerFontColor }}>{schoolEduName}</Title>
          </Body>
          <Right >
          </Right>
        </Header>
        <Content>
          <Query
            query={GET_CLASSGROUPS}
            variables={{ schoolEduId: schoolEdu.id }}
            
          >
            {
              ({ loading, error, data, refetch , networkStatus,subscribeToMore ,client  }) => {
                if (loading) return <Spinner />
                if (error) return <Text>{errorMessage(error)}</Text>
                this._subscribeClassGroupChanged(subscribeToMore,refetch)

                return (
                  <List>
                    {
                      schoolEdu.students.map(student => {
                        return (
                          <ListItem thumbnail key={student.id}>
                            <Left>
                              <Avatar
                                medium
                                overlayContainerStyle={{ backgroundColor: "blue" }}
                                title="水滴"
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                              />
                            </Left>
                            <Body>
                              <Text>{student.name}</Text>
                            </Body>
                            <Right>
                              {
                                student.id !== me.id && (
                                  this._renderButton(data.classGroups, student.id, me.id, schoolEdu.id, schoolEduName,refetch, networkStatus )
                                )
                              }

                            </Right>
                          </ListItem>
                        )
                      })
                    }
                  </List>
                )
              }
            }

          </Query>
        </Content>
      </Container>
    );
  }
}