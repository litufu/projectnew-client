import { graphql } from 'react-apollo';
import React, { Component } from 'react';

import { List, ListItem, Text, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_FAMILYGROUPS from '../../graphql/get_familyGroups.query'
import FAMILYGROUP_CHANGED_SUBSCRIPTION from '../../graphql/familyGroup_changed.subscription'

class QueryFamilyGroups extends Component {
    componentDidMount() {
        const { data: { refetch, subscribeToMore } } = this.props;

        this.unsubscribe = subscribeToMore({
            document: FAMILYGROUP_CHANGED_SUBSCRIPTION,
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
        const { data: { getFamilyGroups, loading, error } } = this.props;
        const {me,navigation}  = this.props
        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <List>
                {
                getFamilyGroups.map(group=>(
                    <ListItem key={group.id} onPress={()=>{navigation.navigate('FamilyContent',{group,me})}}>
                        <Text>{group.name}</Text>
                    </ListItem>
                    ))
                }
            </List>
        )
    }
}


export default graphql(GET_FAMILYGROUPS)(QueryFamilyGroups)

