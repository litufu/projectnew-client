import gql from "graphql-tag";

import USER_FRAGMENT from './user.fragment'
import SCHOOLEDU_FRAGMENT from './schooledu.fragment'

const GET_ME = gql`
{
  me {
    ...UserFragment
    studies{
      ...SchoolEduFragment
    }
  }
}
${USER_FRAGMENT}
${SCHOOLEDU_FRAGMENT}
`;

export default GET_ME;
