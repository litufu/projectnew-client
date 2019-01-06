import { graphql ,Query} from 'react-apollo';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements'

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_WORKGROUPS from '../../graphql/get_workGroups.query'
import WORKGROUP_CHANGED_SUBSCRIPTION from '../../graphql/workGroup_changed.subscription'
import QueryColleagues from './QueryColleagues'

class QueryWorkList extends Component {
    componentDidMount() {
        const { data: { refetch, subscribeToMore } } = this.props;

        this.unsubscribe = subscribeToMore({
            document: WORKGROUP_CHANGED_SUBSCRIPTION,
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
        const { data: { workGroups, loading, error } } = this.props;
        const {work,me,renderButton} = this.props
        console.log('work',work.worker.id)
        console.log('me',me.id)

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <QueryColleagues
            work={work}
            me={me}
            renderButton={renderButton}
            workGroups={workGroups}
            />
        )
    }
}


export default graphql(GET_WORKGROUPS, {
    options: (props) => ({
        variables: {
            companyId: props.work.company.id,
        },
    }),
})(QueryWorkList)
