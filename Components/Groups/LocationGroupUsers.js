import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import update from 'immutability-helper';
import { filter } from 'graphql-anywhere';
import { withRouter } from 'react-router';

import RepoInfo from '../components/RepoInfo';
import Comment from '../components/Comment';

import SUBSCRIPTION_QUERY from '../graphql/CommentSubscription.graphql';
import SUBMIT_COMMENT_MUTATION from '../graphql/SubmitComment.graphql';
import COMMENT_QUERY from '../graphql/Comment.graphql';


class CommentsPage extends React.Component {
    constructor(props) {
        super(props);
        // keep track of subscription handle to not subscribe twice.
        // we don't need to unsubscribe on unmount, because the subscription
        // gets stopped when the query stops.
        this.subscription = null;
    }

    componentWillReceiveProps(nextProps) {
        // we don't resubscribe on changed props, because it never happens in our app
        if (!this.subscription && !nextProps.loading) {
            this.subscription = this.props.subscribeToMore({
                document: SUBSCRIPTION_QUERY,
                variables: { repoFullName: nextProps.entry.repository.full_name },
                updateQuery: (previousResult, { subscriptionData }) => {
                    const newComment = subscriptionData.data.commentAdded;
                    // if it's our own mutation, we might get the subscription result
                    // after the mutation result.
                    if (isDuplicateComment(newComment, previousResult.entry.comments)) {
                        return previousResult;
                    }
                    const newResult = update(previousResult, {
                        entry: {
                            comments: {
                                $unshift: [newComment],
                            },
                        },
                    });
                    return newResult;
                },
            });
        }
    }

    render() {
        const { loading, locationGroupUsers} = this.props;

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <List>
            {
                locationGroupUsers.map(user => {
                    return (
                        <ListItem thumbnail key={user.id}>
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
                                <Text>{user.name}</Text>
                            </Body>
                            <Right>
                            </Right>
                        </ListItem>
                    )
                })
            }
        </List>
        );
    }
}



export default class LocationGroupUsers extends React.Component {

    render() {
        const {locationGroupId} = this.props
        return (
            <Query
                query={GET_LOCATIONGROUPUSERS}
                variables={{ locationGroupId }}
            >
                {({ data: { locationGroupUsers }, subscribeToMore, loading,error }) => (
                    <CommentsPage
                        locationGroupUsers={locationGroupUsers}
                        loading={loading}
                        error={error}
                        subscribeToMore={subscribeToMore}
                    />
                )}
            </Query>
        )
    }

}

