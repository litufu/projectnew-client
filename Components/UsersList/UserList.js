import React from 'react'
import { ScrollView, TouchableWithoutFeedback, View,Alert } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import { Mutation } from 'react-apollo'

import GET_FAMILIES from '../../graphql/get_families.query'
import CONNECT_FAMILY from '../../graphql/connect_family.mutation'


class UserList extends React.Component {

    render() {

        const { users, navigation, who } = this.props

        return (
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
                                    <Mutation
                                        mutation={CONNECT_FAMILY}
                                        update={(cache, { data: { connectFamily } }) => {
                                            const { family } = cache.readQuery({ query: GET_FAMILIES });
                                            cache.writeQuery({
                                                query: GET_FAMILIES,
                                                data: {
                                                    family: family.map(f => {
                                                        if (f.id === connectFamily.id) {
                                                            return connectFamily
                                                        }
                                                        return f
                                                    })
                                                }
                                            });
                                        }}

                                    >
                                        {(connectFamily,{loading,error,data}) => (
                                            <Button
                                                onPress={
                                                    () =>{
                                                    try{
                                                        connectFamily({
                                                            variables: {
                                                                relativeId: user.id,
                                                                familyId: who.id,
                                                                name: who.to.name,
                                                                relationship: who.relationship
                                                            },
                                                            optimisticResponse: {
                                                                __typename: "Mutation",
                                                                connectFamily: {
                                                                    id:who.id ,
                                                                    __typename: "Family",
                                                                    to:{
                                                                      id:who.to.id,
                                                                      __typename:"Person",
                                                                      name:who.to.name
                                                                    },
                                                                    status: "1",
                                                                    relationship:who.relationship,
                                                                    spouse:null
                                                                }
                                                            }
                                                        })
                                                    }catch(error){
                                                        console.log(error.message)
                                                    }
                                                    
                                                    navigation.navigate('Family')
                                                } }
                                            >
                                            {error && <Text>{error.message}</Text>}
                                            <Text style={{ color: "blue" }}>
                                                添加{loading && <Text style={{ color: "blue" }}>...</Text>}
                                            </Text>
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
