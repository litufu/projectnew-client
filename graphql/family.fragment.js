import gql from 'graphql-tag';

const FAMILY_FRAGMENT = gql`
  fragment FamilyFragment on Family {
    id
    to{
      id
      name
      user{
        id
      }
    }
    spouse{
      id
    }
    relationship
    status
  }
`
export default FAMILY_FRAGMENT;
