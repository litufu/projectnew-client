import gql from "graphql-tag";
import WORK_FRAGMENT from './work.fragment'

const ADD_WORK = gql`
mutation addWork(
  $companyName: String!,
  $startTime:String,
  $endTime:String,
  $department:String,
  $post:String
){
addWork(
    companyName:$companyName,
    startTime:$startTime,
    endTime:$endTime,
    department:$department,
    post:$post
  ){
    ...WorkFragment
  }
}
${WORK_FRAGMENT}
`;


export default ADD_WORK;