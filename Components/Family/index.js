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
import {StyleSheet,TouchableOpacity } from 'react-native'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Nav from '../Nav'

const GET_FAMILIES = gql`
  {
    family {
      id
      to{
        name
      }
      relationship
      status
    }
  }
`;

export default class Family extends Component {

  _onPressButton=()=>{

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
                    data.family.map((who,index)=>(
                      <ListItem key={index}>
                        <Left style={styles.left}>
                          <TouchableOpacity onPress={this._onPressButton}>
                            <Badge>
                              <Text style={styles.relationship}>{who.relationship}</Text>
                            </Badge>
                          </TouchableOpacity>
                        </Left>
                        <Body style={styles.center}>
                          <TouchableOpacity onPress={this._onPressButton}>
                            <Text style={styles.name}>{who.to.name}</Text>
                          </TouchableOpacity>
                        </Body>

                        <Right style={styles.right}>
                            {
                              (()=>{switch (who.status) {
                                case "0":
                                  return (<Button  style={styles.button} >
                                    <Text>连接</Text>
                                  </Button>)
                                  break;
                                case "1":
                                  return ( <Text>等待认证</Text>)
                                  break;
                                case '2':
                                 return (<Button disabled style={styles.button}>
                                   <Text>确认</Text>
                                   </Button>)
                                   break;
                                case '3':
                                  return (<Text>已连接</Text>)
                                  break;
                                default:
                                  return null
                              }})()
                            }
                        </Right>
                      </ListItem>
                    ))
                  }
                </List>
                <Button block
                  style={styles.addButton}
                  onPress={()=>this.props.navigation.navigate("AddFamily")}
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
  relationship:{
    fontSize:15,
  },
  name:{
    fontSize:20,
  },
  left:{
    flex:0.2
  },
  center:{
    flex:0.6,
    alignItems:"flex-start",
  },
  right:{
    flex:0.2,
  },
  button:{
    width:80,
    alignItems:"center",
    justifyContent:"center"
  },
  addButton:{
    margin:10,
  }

})
