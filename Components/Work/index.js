import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';

import Works from './Works'
import Job from './Job'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

export default class Example extends Component {

    state={
        selected:1
    }

  render() {
    const {selected} = this.state
    return (
      <Container>
        <Header hasSegment style={{marginTop:statusBarHeight}}>
          <Left style={{justifyContent:'flex-end'}}>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{alignItems:'center'}}>
            <Title >工作经历</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Segment >
          <Button 
          first 
          active={selected===1} 
          onPress={()=>this.setState({selected:1})} 
          >
            <Text  >工作列表</Text>
          </Button>
          <Button 
          last 
          active={selected===2} 
          onPress={()=>this.setState({selected:2})} 
          >
            <Text >添加</Text>
          </Button>
        </Segment>

        <Content padder>
          {this.state.selected===1 &&  <Works />}
          {this.state.selected===2 &&  <Job />}
        </Content>
      </Container>
      
    );
  }
}
