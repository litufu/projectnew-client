import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements'

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_LOCATIONGROUPS from '../../graphql/get_locationGroups.query'
import LOCATIONGROUP_CHANGED_SUBSCRIPTION from '../../graphql/locationGroup_changed.subscription'

class QueryLocationGroups extends Component {
    componentDidMount() {
        const { data: { refetch, subscribeToMore } } = this.props;

        this.unsubscribe = subscribeToMore({
            document: LOCATIONGROUP_CHANGED_SUBSCRIPTION,
            updateQuery: (prev) => {
                refetch();
                return prev;
            },
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { data: { locationGroups, loading, error } } = this.props;
        const { navigation, me } = this.props

        console.log('locationGroups',locationGroups)

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <List>
                {
                    locationGroups.filter(locationGroup=>locationGroup.users.length!==1 && locationGroup.users.length !==0 ).map(locationGroup => (
                        <ListItem key={locationGroup.id} onPress={() => navigation.navigate('LocationContent', { locationGroup, me })}>
                            <Text>{locationGroup.name}</Text>
                        </ListItem>
                    ))
                }
            </List>

        )
    }
}


export default graphql(GET_LOCATIONGROUPS)(QueryLocationGroups)
    

