import React, { Component } from 'react';
import { Query ,Mutation} from "react-apollo";
import {Alert} from 'react-native'
import { Container, Header, Content, List, ListItem, Text,Left,Icon,Button,Right,Body,Title, Spinner,Badge } from 'native-base';

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'
import GET_ME from '../../graphql/get_me.query'
import REFRESH_FAMILYGROUPS from '../../graphql/refresh_familyGroups.mutation'
import {errorMessage} from '../../utils/tools'

class FamilyGroup extends Component {

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
            <Title style={{color:headerFontColor}}>家庭群</Title>
          </Body>
          <Right >
            <Button transparent><Text>功能说明</Text></Button>
            </Right>
          </Header>
        <Content>
          <Mutation 
          mutation={REFRESH_FAMILYGROUPS}
          update={(cache, { data: { refreshMyFamilyGroups } }) => {
            const {me} = cache.readQuery({GET_ME})
            const data = { me: {...me,relativefamilyGroups:refreshMyFamilyGroups} }
            console.log('familydata',data)
            cache.writeQuery({
              query: GET_ME,
              data,
            });
          }}
          onCompleted={()=>Alert.alert('刷新成功')}
          >
          {(refreshMyFamilyGroups,{loading,error}) => (
              <Button block onPress={()=>refreshMyFamilyGroups()} disabled={loading?true:false}>
                <Text>刷新家人列表</Text>
                {loading && <Spinner />}
                {error && Alert.alert(errorMessage(error))}
              </Button>
            )}

          </Mutation>
          <List>
            {
            me.relativefamilyGroups.map(group=>(
                <ListItem key={group.id} onPress={()=>{this.props.navigation.navigate('FamilyContent',{group,me})}}>
                    <Text>{group.name}</Text>
                </ListItem>
                ))
            }
        </List>
        </Content>
      </Container>
    );
  }
}

export default FamilyGroup