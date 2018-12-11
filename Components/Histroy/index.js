import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';

import TimeLocationLine from './TimeLocationLine'
import EditHistory from './EditHistory'

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
            <Title>人生轨迹</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Segment>
          <Button first active={this.state.selected===1} onPress={()=>this.setState({selected:1})}>
            <Text>我的历史</Text>
          </Button>
          <Button last active={this.state.selected===2} onPress={()=>this.setState({selected:2})}>
            <Text>自己写</Text>
          </Button>
        </Segment>

        <Content padder>
          {this.state.selected===1 &&  <TimeLocationLine />}
          {this.state.selected===2 &&  <EditHistory />}
        </Content>
      </Container>
      
    );
  }
}
