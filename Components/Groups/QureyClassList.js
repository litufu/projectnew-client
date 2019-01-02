import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements'

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_CLASSGROUPS from '../../graphql/get_classGroups.query'
import CLASSGROUP_CHANGED_SUBSCRIPTION from '../../graphql/classGroup_changed.subscription'

class QureyClassList extends Component {
    componentDidMount() {
        const { data: { refetch, subscribeToMore } } = this.props;

        this.unsubscribe = subscribeToMore({
            document: CLASSGROUP_CHANGED_SUBSCRIPTION,
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
        const { data: { classGroups, loading, error } } = this.props;
        const {schoolEdu,schoolEduName,me,renderButton} = this.props

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <List>
                {
                    schoolEdu.students.map(student => {
                        return (
                            <ListItem thumbnail key={student.id}>
                                <Left>
                                    <Avatar
                                        medium
                                        overlayContainerStyle={{ backgroundColor: "blue" }}
                                        title="水滴"
                                        onPress={() => console.log("Works!")}
                                        activeOpacity={0.7}
                                    />
                                </Left>
                                <Body>
                                    <Text>{student.name}</Text>
                                </Body>
                                <Right>
                                    {
                                        student.id !== me.id && (
                                            renderButton(classGroups, student.id, me.id, schoolEdu.id, schoolEduName)
                                        )
                                    }

                                </Right>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }
}


export default graphql(GET_CLASSGROUPS, {
    options: (props) => ({
        variables: {
            schoolEduId: props.schoolEdu.id,
        },
    }),
})(QureyClassList)
