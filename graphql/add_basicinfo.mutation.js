import gql from "graphql-tag";

import USER_FRAGMENT from './user.fragment'

const ADD_BASICKINFO = gql`
mutation AddBasicInfo(
  $name: String!,
  $gender: String!,
  $birthday:BirthdayInput!,
  $birthplace:BirthplaceInput!

){
  addBasicInfo(
    name:$name,
    gender:$gender,
    birthday:$birthday,
    birthplace:$birthplace
  ){
    ...UserFragment
  }
}
  ${USER_FRAGMENT}
`;


export default ADD_BASICKINFO;
