import gql from "graphql-tag";

import FAMILY_FRAGMENT from './family.fragment'

const MODIFY_FAMILY = gql`
mutation updateFamily($id:ID!,$name:String,$relationship:String){
  updateFamily(
    id:$id,name:$name,relationship:$relationship
  ){
    ...FamilyFragment
  }
}
${FAMILY_FRAGMENT}
`

export default MODIFY_FAMILY;