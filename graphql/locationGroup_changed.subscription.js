import gql from 'graphql-tag';

const LOCATIONGROUP_CHANGED_SUBSCRIPTION = gql`
    subscription onLocationGroupChanged{
        locationGroupChanged{
            text
        }
    }
`   

export default LOCATIONGROUP_CHANGED_SUBSCRIPTION;