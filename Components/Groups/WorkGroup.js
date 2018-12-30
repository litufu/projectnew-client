import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text,Left,Icon,Button,Right,Body,Title } from 'native-base';

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

export default class ListExample extends Component {
  render() {
    return (
      <Container>
           <Header style={{marginTop:statusBarHeight,backgroundColor:headerBackgroundColor}}>
        <Left>
            <Button 
            transparent
            onPress={()=>this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' style={{color:headerButtonColor}}/>
            </Button>
            </Left>
          <Body>
            <Title style={{color:headerFontColor}}>同事群</Title>
          </Body>
          <Right />
          </Header>
        <Content>
          <List>
            <ListItem>
              <Text>2010-2012华建会计师事务所</Text>
            </ListItem>
            <ListItem>
              <Text>2012-2017瑞华会计师事务所</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}