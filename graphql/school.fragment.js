import gql from 'graphql-tag';

const SCHOOL_FRAGMENT = gql`
  fragment SchoolFragment on School {
    id
    name
    kind
    location{
      id
      name
    }
  }
`
export default SCHOOL_FRAGMENT;
