import { SearchBar } from 'react-native-elements'


import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class AnatomyExample extends Component {

    state={
        text:""
    }

  render() {
    const   {loading,error,dataList} = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <SearchBar
            lightTheme
            onChangeText={someMethod}
            onClearText={someMethod}
            placeholder='Type Here...' 
            />
            <List>
                <ListItem>
                <Left>
                <Text>Discussion with Client</Text>
                </Left>
                <Right>
                <Radio selected={true} />
                </Right>
            </ListItem>
            </List>
  
        </Content>
       
      </Container>
    );
  }
}