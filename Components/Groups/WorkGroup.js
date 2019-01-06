import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Alert } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Left, Icon, Button, Right, Body, Title, Spinner, Badge } from 'native-base';

import { errorMessage, timeTodate } from '../../utils/tools'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

class WorkGroup extends Component {

  render() {
    const me = this.props.navigation.getParam('me')
    const nowWorks = me.works.filter(work => new Date(work.endTime).getFullYear() === 9999)
    return (
      <Container>
        <Header style={{ marginTop: statusBarHeight, backgroundColor: headerBackgroundColor }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' style={{ color: headerButtonColor }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: headerFontColor }}>同事群</Title>
          </Body>
          <Right >
            <Button transparent><Text>功能说明</Text></Button>
          </Right>
        </Header>
        <Content>
        <List>
            {
              me.works.filter(work => (new Date(work.endTime) - new Date(work.startTime)) > 24 * 60 * 60 * 180 * 1000).sort((a, b) => (new Date(a.startTime) - new Date(b.startTime))).map(work => (
                <ListItem key={work.id} onPress={() => this.props.navigation.navigate('OldWorkList', { work, me })}>
                  <Text>{timeTodate(work.startTime, work.endTime)} {work.company.name}</Text>
                </ListItem>
              ))
            }
            {
              (nowWorks.length > 0) &&
              <ListItem onPress={() => this.props.navigation.navigate('WorkContent', { work:nowWorks[0], me })}>
                <Text>{nowWorks[0].company.name}</Text>
              </ListItem>
            }
          </List>
        </Content>
      </Container>
    );
  }
}

export default WorkGroup