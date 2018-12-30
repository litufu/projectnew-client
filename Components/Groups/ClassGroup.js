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
            <Title style={{color:headerFontColor}}>同学群</Title>
          </Body>
          <Right />
          </Header>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>小学群</Text>
            </ListItem>                    
            <ListItem>
              <Text>石棺小学2007年级1班</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>初中群</Text>
            </ListItem>  
            <ListItem>
              <Text>蒋村二中1997年初一3班</Text>
            </ListItem>
            <ListItem>
                <Text>蒋村二中1997年初一3班</Text>
            </ListItem>
            <ListItem>
                <Text>蒋村二中1997年初一3班</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>高中群</Text>
            </ListItem>  
            <ListItem>
                <Text>蒋村二中1997年初一3班</Text>
            </ListItem>
            <ListItem>
                <Text>蒋村二中1997年初一3班</Text>
            </ListItem>
            <ListItem>
                <Text>蒋村二中1997年初一3班</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>大学群</Text>
            </ListItem>  
            <ListItem>
                <Text>蒋村二中1997年初一3班</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}