import gql from 'graphql-tag';

const LOCATIONGROUP_FRAGMENT = gql`
  fragment LocationGroupFragment on LocationGroup {
    id
    code
    name
    users{
        id
        name
        avatar
    }
  }
`
export default LOCATIONGROUP_FRAGMENT;