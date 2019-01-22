import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text,Left,Icon,Button,Right,Body,Title } from 'native-base';

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'


export default class LocationGroup extends Component {
  render() {
    const me = this.props.navigation.getParam('me')
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
                {
                    me.locationGroups.filter(locationGroup=>locationGroup.users.length!==1 && locationGroup.users.length !==0 ).map(locationGroup => (
                        <ListItem key={locationGroup.id} onPress={() => navigation.navigate('LocationContent', { locationGroup, me })}>
                            <Text>{locationGroup.name}</Text>
                        </ListItem>
                    ))
                }
            </List>
        </Content>
      </Container>
    );
  }
}