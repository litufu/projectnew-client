import React from 'react'
import { ScrollView, TouchableWithoutFeedback,View } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text,Button } from 'native-base';
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'

const CONNECT_FAMILY =  gql`
mutation connectFamily($id:ID!,$name: String!, $relationship: String!){
    connectFamily(id:$id,name:$name,relationship:$relationship){
        id
        to{
            name
        }
  }
}
`

class UserList extends React.Component{

    render(){

        const {users,navigation,who} = this.props

        return(
            <Container>
            <Content>
                <List>
                    {users.map(user => (
                        <ListItem avatar key={user.id}>
                            <Left>
                                <TouchableWithoutFeedback
                                    onPress={() => navigation.navigate('UserProfile', { id: user.id })}
                                >
                                    <Thumbnail source={{ uri: '../../assets/icon.png' }} />
                                </TouchableWithoutFeedback>
                            </Left>
                            <Body>
                                <TouchableWithoutFeedback
                                    onPress={() => navigation.navigate('UserProfile', { id: user.id })}
                                >
                                    <View>
                                        <Text>{user.name}</Text>
                                        <Text note>{user.username}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Body>
                            <Right>
                                <Mutation mutation={CONNECT_FAMILY}>
                                {(connectFamily, { data }) => (
                                    <Button 
                                    transparent
                                    onPress={()=>connectFamily(user.id,who.to.name,who.to.relationship)}
                                    >
                                    <Text style={{color:"blue"}}>添加</Text>
                                    </Button>
                                    )}
                                </Mutation>
                                
                            </Right>
                        </ListItem>
                    ))}
                </List>
            </Content>
        </Container>
        )
    }
}

export default UserList
