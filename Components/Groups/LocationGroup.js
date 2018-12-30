import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text,Left,Icon,Button,Right,Body,Title } from 'native-base';

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

export default class FamilyGroup extends Component {
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
            <Title style={{color:headerFontColor}}>老乡群</Title>
          </Body>
          <Right />
          </Header>
        <Content>
          <List>
            <ListItem>
              <Text>石棺群</Text>
            </ListItem>
            <ListItem>
              <Text>柯桥街道群</Text>
            </ListItem>
            <ListItem>
              <Text>安阳人在绍兴</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}