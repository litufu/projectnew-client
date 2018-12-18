import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';

import Works from './Works'
import Job from './Job'

export default class Example extends Component {

    state={
        selected:1
    }

  render() {
    return (
      <Container>
        <Header hasSegment>
          <Left style={{justifyContent:'flex-end'}}>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{alignItems:'center'}}>
            <Title>工作经历</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Segment>
          <Button first active={this.state.selected===1} onPress={()=>this.setState({selected:1})}>
            <Text>工作列表</Text>
          </Button>
          <Button last active={this.state.selected===2} onPress={()=>this.setState({selected:2})}>
            <Text>添加</Text>
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
