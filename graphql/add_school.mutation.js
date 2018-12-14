import gql from "graphql-tag";
import SCHOOL_FRAGMENT from './school.fragment'

const ADD_SCHOOL = gql`
mutation AddSchool(
  $name: String!,
  $kind:String!
  $locationId:String

){
addSchool(
    name:$name,
    kind:$kind,
    locationId:$locationId
  ){
    ...SchoolFragment
  }
}
${SCHOOL_FRAGMENT}
`;


export default ADD_SCHOOL;