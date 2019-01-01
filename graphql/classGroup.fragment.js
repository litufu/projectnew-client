import gql from 'graphql-tag';

const CLASSGROUP_FRAGMENT = gql`
  fragment ClassGroupFragment on ClassGroup {
    id
    study{
        id
    }
    name
    members{
        id
        student{
            id
        }
        status
    }
  }
`
export default CLASSGROUP_FRAGMENT;

