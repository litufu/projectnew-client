import gql from "graphql-tag";

import USER_FRAGMENT from './user.fragment'

const ADD_BASICKINFO = gql`
mutation AddBasicInfo(
  $name: String!,
  $gender: String!,
  $birthday:BirthdayInput!,
  $birthplace:PlaceInput!
  $residence:PlaceInput!

){
  addBasicInfo(
    name:$name,
    gender:$gender,
    birthday:$birthday,
    birthplace:$birthplace,
    residence:$residence
  ){
    ...UserFragment
  }
}
  ${USER_FRAGMENT}
`;


export default ADD_BASICKINFO;
