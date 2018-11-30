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

import Nav from '../Nav'
import getRelationshipName from '../../utils/relationship'
import GET_FAMILIES from '../../graphql/get_families.query'
import DELETE_FAMILY from '../../graphql/delete_family.mutation'

export default class Family extends Component {

  _onPressButton = (who) => {
    this.props.navigation.navigate("AddFamily", {
      isAdd: false,
      familyId: who.id,
      name: who.to.name,
      toId: who.to.id,
      relationship: who.relationship,
    })
  }

  handleLongPress = (familyId, toId, deleteFamily) => {
    Alert.alert(
      '提示',
      '确定要删除吗?',
      [
        { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: '确定', onPress: () => deleteFamily({ variables: { familyId, toId } }) },
      ]
    )
  }

  connect=(who)=>{
    this.props.navigation.navigate('SearchFamily', { who })
  }

  render() {
    return (
      <Query query={GET_FAMILIES}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <Text>`Error! ${error.message}`</Text>;
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
                            onPress={() => this._onPressButton(who)}
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
                                onPress={() => this._onPressButton(who)}
                                onLongPress={() => this.handleLongPress(who.id, who.to.id, deleteFamily)}
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
                                    onPress={()=>this.connect(who)}
                                   >
                                    <Text>连接</Text>
                                  </Button>)
                                  break;
                                case "1":
                                  return (<Text>等待认证</Text>)
                                  break;
                                case '2':
                                  return (
                                  <Button disabled style={styles.button}>
                                    <Text>确认</Text>
                                  </Button>)
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

Family.navigationOptions = ({ navigation }) => ({
  header: (
    <Nav
      title="家庭成员"
      navigation={navigation}
      leftIcon={{
        type: 'ionicon',
        name: 'md-arrow-back',
        size: 26,
      }}
      hasLeftIcon={true}
      hasLogoutText={false}
    />
  ),
})

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
