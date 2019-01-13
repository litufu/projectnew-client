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
            name
            avatar{
                id
                url
            }

        }
        status
    }
  }
`
export default CLASSGROUP_FRAGMENT;


