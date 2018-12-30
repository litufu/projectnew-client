import gql from 'graphql-tag';

const FAMILYGROUP_FRAGMENT = gql`
  fragment FamilyGroupFragment on FamilyGroup {
    id
    name
    father{
        id
        name
        user{
            id
        }
    }
    mother{
        id
        name
        user{
            id
        }
    }
    creater{
        id
        name
    }
    families{
        id
        to{
        id
        name
        user{
            id
            gender
        }
        }
        from{
            id
            name
            gender
        }
        relationship
    }   
    users{
        id
        name
    }
  }
`
export default FAMILYGROUP_FRAGMENT;
