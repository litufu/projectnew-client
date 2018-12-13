import React, { Component } from 'react';
import {View ,TouchableHighlight}  from 'react-native'
import { Container, 
    Header, 
    Item, 
    Input, 
    Icon, 
    Button, 
    Text, 
    Content,
    List,
    ListItem,
    Left,
    Right,
    Body,
    Title,
 } from 'native-base';

export default class SelectClass extends Component {
  render() {
    return (
      <Container>
          <Header >
            <Left style={{ justifyContent: 'flex-end' }}>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body style={{ alignItems: 'center' }}>
                <Title>人生轨迹</Title>
            </Body>
            <Right>
                <Button><Text>确认</Text></Button>
            </Right>
        </Header>
        <Content>
            <List>
                <ListItem>
                    <TouchableHighlight>
                        <Text>一年级2班</Text>
                    </TouchableHighlight>
                </ListItem>
                <ListItem>
                    <TouchableHighlight>
                        <Text>一年级2班</Text>
                    </TouchableHighlight>
                </ListItem>
                <ListItem>
                    <TouchableHighlight>
                        <Text>一年级2班</Text>
                    </TouchableHighlight>
                </ListItem>
            </List>
            <Button block
                onPress={()=>this.props.navigation.navigate('CreateClass')}
            >
            <Text>添加班级</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}