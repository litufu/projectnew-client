import React, { Component } from 'react';
import { Query ,Mutation} from "react-apollo";
import {Alert} from 'react-native'
import { Container, Header, Content, List, ListItem, Text,Left,Icon,Button,Right,Body,Title, Spinner,Badge } from 'native-base';

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'
import GET_ME from '../../graphql/get_me.query'
import {errorMessage} from '../../utils/tools'

class FamilyGroup extends Component {

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
            <Title style={{color:headerFontColor}}>家庭群</Title>
          </Body>
          <Right >
            </Right>
          </Header>
        <Content>
          <Query query={GET_ME}>
            {
              ({loading,error,data})=>{
                if(loading) return <Spinner />
                if(error) return <Text>{errorMessage(error)}</Text>
                return (<List>
                  {
                  data.me.relativefamilyGroups.map(group=>(
                      <ListItem key={group.id} onPress={()=>{this.props.navigation.navigate('FamilyContent',{group,me:data.me})}}>
                          <Text>{group.name}</Text>
                      </ListItem>
                      ))
                  }
              </List>)
              }
            }
          </Query>
        </Content>
      </Container>
    );
  }
}

export default FamilyGroup