import React, { Component } from 'react';
import {withNavigation}  from 'react-navigation'
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch,Button } from 'native-base';

class Groups extends Component {
  render() {
    const me = this.props.me
    return (
        <Content>
          <ListItem icon onPress={()=>this.props.navigation.navigate('FamilyGroup',{me})}>
            <Left>
              <Button style={{ backgroundColor: '#FEA8A1'  }}>
                <Icon active name="link" type='FontAwesome'/>
              </Button>
            </Left>
            <Body>
              <Text>家庭群</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon onPress={()=>this.props.navigation.navigate('ClassGroup',{me})}>
            <Left>
              <Button style={{ backgroundColor: '#57DCE7'}}>
                <Icon active name="book" type='FontAwesome' />
              </Button>
            </Left>
            <Body>
              <Text>同学群</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon onPress={()=>this.props.navigation.navigate('WorkGroup',{me})}>
            <Left>
              <Button style={{ backgroundColor:  '#FAD291' }}>
                <Icon active name="worker"  type='MaterialCommunityIcons'/>
              </Button>
            </Left>
            <Body>
              <Text>同事群</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon onPress={()=>this.props.navigation.navigate('LocationGroup',{me})}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="account-location"  type='MaterialCommunityIcons'/>
              </Button>
            </Left>
            <Body>
              <Text>老乡群</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
        </Content>
    );
  }
}


export default withNavigation(Groups)