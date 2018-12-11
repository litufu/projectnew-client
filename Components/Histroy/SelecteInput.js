import React, { Component } from 'react';
import {View,TouchableHighlight} from 'react-native'
import {withNavigation} from 'react-navigation'
import { Container, Header, Item, Input, Icon, Button, Text, Content,List, ListItem,Left,Body,Right,Title } from 'native-base';

export default  class SelectInput extends Component {
  render() {
    return (
      <Container>
         <Header >
          <Left style={{justifyContent:'flex-end'}}>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{alignItems:'center'}}>
            <Title>人生轨迹</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Content >
          <Item>
            <Input placeholder="学校名称" />
                <Button transparent>
                <Text>确定</Text>
            </Button>
          </Item>
          <View style={{padding:5}}>
          <Text>
            已存在的学校:
          </Text>
          </View>
          <List>
            <ListItem>
              <TouchableHighlight>
              <Text>shcoolname1</Text>
              </TouchableHighlight>
            </ListItem>
            <ListItem>
              <TouchableHighlight>
              <Text>shcoolname2</Text>
              </TouchableHighlight>
            </ListItem>
            <ListItem>
              <TouchableHighlight>
              <Text>shcoolname3</Text>
              </TouchableHighlight>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

