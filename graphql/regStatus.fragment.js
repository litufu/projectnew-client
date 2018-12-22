import gql from 'graphql-tag';

const REGSTATUS_FRAGMENT = gql`
  fragment RegStatusFragment on RegStatus {
    id
    education
    university{
        id
        name
    }
    major{
        id
        name
    }
  }
`
export default REGSTATUS_FRAGMENT;
