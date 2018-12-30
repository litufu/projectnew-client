import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Badge,
  Spinner,
} from 'native-base';
import { Avatar } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Query, Mutation } from 'react-apollo'
import {withNavigation} from 'react-navigation'

import Nav from '../Nav'
import {getRelationshipName} from '../../utils/relationship'
import GET_FAMILIES from '../../graphql/get_families.query'
import DELETE_FAMILY from '../../graphql/delete_family.mutation'
import FAMILY_CONNECTED_SUBSCRIPTION from '../../graphql/family_connected.subscription'
import FAMILY_CHANGED_SUBSCRIPTION from '../../graphql/family_changed.subscription'
import CONFIRM_FAMILY from '../../graphql/confirm_family.mutation'

class Family extends Component {

  state={
    connect:false
  }

  _onPressButton = (who,spouseId) => {
    // 连接前可以修改，连接后点击条目直接跳转到对方的
    switch (who.status) {
      case "0":
        this.props.navigation.navigate("AddFamily", {
          isAdd: false,
          familyId: who.id,
          name: who.to.name,
          toId: who.to.id,
          relationship: who.relationship,
          spouseId:spouseId,
        })
        break;
      case "1":
        this.props.navigation.navigate("UserProfile")
        break;
      case '2':
        this.props.navigation.navigate("UserProfile")
        break;
      case '3':
        this.props.navigation.navigate("UserProfile")
        break;
      default:
        return null
    }

  }

  handleLongPress = (who,deleteFamily) => {
    switch (who.status) {
      case "0":
        Alert.alert(
          '提示',
          '确定要删除吗?',
          [
            { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: '确定', onPress: () => deleteFamily({ variables: { familyId:who.id, toId:who.to.id } }) },
          ]
        )
        break;
      case "1":
        this.props.navigation.navigate("UserProfile")
        break;
      case '2':
        this.props.navigation.navigate("UserProfile")
        break;
      case '3':
        this.props.navigation.navigate("UserProfile")
        break;
      default:
        return null
    }

   
  }

  connect = (who) => {
    this.props.navigation.navigate('SearchFamily', { who })
  }

  confirm = (who) => {
    // (1)修改双方family的status,全部修改为3
    // (2)修改双方的family的to:检查Person中是否已经存在user,如果存在则删除重复的person,并将to指向已经包含user的Person
    // 如果都不存在user,则在Person中添加User.
    // (3)合并双方共同的亲人，用由User的代替没有User的。删除Person中重复的亲人。

  }

  _subscribeChangedFamily = async (subscribeToMore, client) => {
    this.unsubscribeHandle = subscribeToMore({
      document: FAMILY_CHANGED_SUBSCRIPTION,
      updateQuery: async (prev,{ subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data } = await client.query({
          query: GET_FAMILIES,
          fetchPolicy:'network-only'
        });
        return Object.assign({},prev,data)
      }
    })
  }

  componentWillUnmount () {
    // Unsibscribe subscription
    this.unsubscribeHandle();
  }

  render() {
    return (
      <Query query={GET_FAMILIES} >
        {({ loading, error, data, subscribeToMore ,client}) => {
          if (loading) return <Spinner />;
          if (error) return <Text>`Error! ${error.message}`</Text>;
          console.log(data)
          // if(data.family && data.family.filter(f=>f.status==="0").length>0) {
          //   this._subscribeConnectedFamily(subscribeToMore, data)
          // }
          this._subscribeChangedFamily(subscribeToMore,client)
          let spouseId = ''
          if(data.family && data.family.length>0){
            const wifeOrHusband = data.family.filter(f=>{return f.relationship==="wife"||f.relationship==="husband" })
            if(wifeOrHusband.length>0){
              spouseId = wifeOrHusband[0].id
            }
          }
          
          return (
            <Container>
              <Content>
                <List>
                  {
                    data.family.length > 0 && data.family.map((who, index) => (
                      <ListItem key={index}>
                        <Left style={styles.left}>
                          <Avatar
                            size="xlarge"
                            rounded
                            title={getRelationshipName(who.relationship)}
                            onPress={() => this._onPressButton(who,spouseId)}
                            overlayContainerStyle={{ backgroundColor: 'red' }}
                            activeOpacity={0.7}
                          />
                        </Left>
                        <Body style={styles.center}>
                          <Mutation
                            mutation={DELETE_FAMILY}
                            update={(cache, { data: { deleteFamily } }) => {
                              const { family } = cache.readQuery({ query: GET_FAMILIES });
                              cache.writeQuery({
                                query: GET_FAMILIES,
                                data: { family: family.filter((who) => { return who.id !== deleteFamily.id }) }
                              });
                            }}
                          >
                            {deleteFamily => (
                              <TouchableOpacity
                                onPress={() => this._onPressButton(who,spouseId)}
                                onLongPress={() => this.handleLongPress(who,deleteFamily)}
                              >
                                <Text style={styles.name}>{who.to.name}</Text>
                              </TouchableOpacity>
                            )}
                          </Mutation>
                        </Body>

                        <Right style={styles.right}>
                          {
                            (() => {
                              switch (who.status) {
                                case "0":
                                  return (
                                    <Button
                                      style={styles.button}
                                      onPress={() => this.connect(who)}
                                    >
                                      <Text>连接</Text>
                                    </Button>)
                                  break;
                                case "1":
                                  return (<Text>等待认证</Text>)
                                  break;
                                case '2':
                                  return (
                                    <Mutation 
                                    mutation={CONFIRM_FAMILY}
                                    update={(cache, { data: { confirmFamily } }) => {
                                      const { family } = cache.readQuery({ query: GET_FAMILIES });
                                      cache.writeQuery({
                                        query: GET_FAMILIES,
                                        data: { family: family.map((who) => { 
                                          if(who.id===confirmFamily.id){
                                            return Object.assign({},who,{status:confirmFamily.status})
                                          }else{
                                            return who
                                          }
                                         }) }
                                      });
                                    }}
                                    >
                                    {
                                      confirmFamily=>(
                                        <Button 
                                      warning
                                      onPress={()=>confirmFamily({ 
                                        variables: { familyId: who.id },
                                        optimisticResponse: {
                                          __typename: "Mutation",
                                          confirmFamily: {
                                            __typename: "Family",
                                            id: who.id,
                                            relationship: who.relationship,
                                            status: '3',
                                            to: {
                                              __typename: "Person",
                                              id: who.to.id,
                                              name: who.to.name,
                                              user:null
                                            },
                                            from:{
                                              __typename:'User',
                                              id:Math.floor(Math.random() * 200).toString(),
                                              name:who.from.name
                                            },
                                            spouse:{
                                              __typename:Family,
                                              id:''
                                            }
                                          }
                                        }
                                      })}
                                      >
                                        <Text>确认</Text>
                                      </Button>
                                      )
                                    }
                                      
                                    </Mutation>
                                    
                                    )
                                  break;
                                case '3':
                                  return (<Text>已连接</Text>)
                                  break;
                                default:
                                  return null
                              }
                            })()
                          }
                        </Right>
                      </ListItem>
                    ))
                  }
                </List>
                <Button block
                  style={styles.addButton}
                  onPress={() => this.props.navigation.navigate("AddFamily", {
                    isAdd: true,
                    familyId: '',
                    name: '',
                    toId: '',
                    relationship: 'father',
                    spouseId:spouseId
                  })}
                >
                  <Text>添加成员</Text>
                </Button>
              </Content>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default withNavigation(Family)



const styles = StyleSheet.create({
  name: {
    fontSize: 18,
  },
  left: {
    flex: 0.2
  },
  center: {
    flex: 0.6,
    alignItems: "flex-start",
  },
  right: {
    flex: 0.2,
  },
  button: {
    alignItems: "center",
    justifyContent: "center"
  },
  addButton: {
    margin: 10,
  }

})
