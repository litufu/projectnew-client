import React, { Component } from 'react';
import { Query ,Mutation} from "react-apollo";
import {Alert} from 'react-native'
import { Container, Header, Content, List, ListItem, Text,Left,Icon,Button,Right,Body,Title, Spinner,Badge } from 'native-base';

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'
import GET_FAMILYGROUPS from '../../graphql/get_familyGroups.query'
import REFRESH_FAMILYGROUPS from '../../graphql/refresh_familyGroups.mutation'
import FAMILYGROUP_CHANGED_SUBSCRIPTION from '../../graphql/familyGroup_changed.subscription'
import {errorMessage} from '../../utils/tools'
import QueryFamilyGroups from './QueryFamilyGroups'

class FamilyGroup extends Component {

  // _subscribeFamilyGroupChanged = async (subscribeToMore, client) => {
  //   this.unsubscribeHandle = subscribeToMore({
  //     document: FAMILYGROUP_CHANGED_SUBSCRIPTION,
  //     updateQuery: async (prev,{ subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const { data } = await client.query({
  //         query: GET_FAMILYGROUPS,
  //         fetchPolicy:'network-only'
  //       });
  //       console.log('prev',prev)
  //       console.log('data',data)
  //       return Object.assign({},prev,data)
  //     }
  //   })
  // }

  // componentWillUnmount () {
  //   // Unsibscribe subscription
  //   this.unsubscribeHandle();
  // }

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
            cache.writeQuery({
              query: GET_FAMILYGROUPS,
              data: { getFamilyGroups: refreshMyFamilyGroups }
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
          <QueryFamilyGroups 
          me={me}
          navigation={this.props.navigation}
          />
        </Content>
      </Container>
    );
  }
}

export default FamilyGroup