import gql from "graphql-tag";

import FAMILY_FRAGMENT from './family.fragment'

const CREATE_FAMILY = gql`
mutation CreateFamily($name: String!, $relationship: String!){
  createFamily(name:$name,relationship:$relationship){
    ...FamilyFragment
  }
}
${FAMILY_FRAGMENT}
`

export default CREATE_FAMILY;