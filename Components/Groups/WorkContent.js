import React, { Component } from 'react';
import {withNavigation}  from 'react-navigation'
import { Container, Header, Content, Icon,Text,Item, Button, Left,Right,Body ,Title } from 'native-base';

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

class ClassContent extends Component {
  render() {
    const work = this.props.navigation.getParam('work','')
    const me =  this.props.navigation.getParam('me','')
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
            <Title style={{color:headerFontColor}}>{work.company.name}</Title>
          </Body>
          <Right />
          </Header>
        <Content>
          <Item style={{padding:5,alignItems:"stretch",justifyContent:'space-between'}}>
            <Button 
            transparent 
            vertical
            onPress={()=>this.props.navigation.navigate('WorkList',{work,me})}
             >
              <Icon name="list" type="FontAwesome" />
              <Text>成员列表</Text>
            </Button>
            <Button transparent vertical>
              <Icon name="chat" type='Entypo'/>
              <Text>群聊</Text>
            </Button>
            <Button transparent vertical>
              <Icon active name="settings" type='MaterialIcons'/>
              <Text>群设置</Text>
            </Button>
            <Button transparent vertical>
              <Icon name="man" type='Entypo'/>
              <Text>群主</Text>
            </Button>
          </Item>
          
        </Content>
              </Container>

    );
  }
}

export default withNavigation(ClassContent)