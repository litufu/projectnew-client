import {Query } from 'react-apollo';
import React, { Component } from 'react';
import { List, ListItem, Text, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_ME from '../../graphql/get_me.query'

export default class QueryFamilyGroups extends Component{

    render(){
        const {navigation}  = this.props
        return(
            <Query query={GET_ME}>
            {
                ({loading,error,data})=>{
                    const me = data.me
                    if (loading) return <Spinner />
                    if (error) return <Text>{errorMessage(error)}</Text>

                    return (
                        <List>
                            {
                            me.relativefamilyGroups.map(group=>(
                                <ListItem key={group.id} onPress={()=>{navigation.navigate('FamilyContent',{group,me})}}>
                                    <Text>{group.name}</Text>
                                </ListItem>
                                ))
                            }
                        </List>
                    )
                }
            }
            </Query>
        )
    }
}