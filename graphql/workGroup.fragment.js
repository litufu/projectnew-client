import gql from 'graphql-tag';

const WORKGROUP_FRAGMENT = gql`
  fragment WorkGroupFragment on WorkGroup {
    id
    company{
        id
        name
    }
    colleagues{
        id
        worker{
            id
        }
        status
    }
  }
`
export default WORKGROUP_FRAGMENT;



