import gql from 'graphql-tag';

import SCHOOLEDU_FRAGMENT from './schooledu.fragment'
const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    username
    gender
    avatar
    birthdaycalendar
    birthday
    birthplace{
      id
      province{
        code
        name
      }
      city{
        code
        name
      }
      area{
        code
        name
      }
      street{
        code
        name
      }
      village{
        code
        name
      }
    }
    studies{
      ...SchoolEduFragment
    }
 }
 ${SCHOOLEDU_FRAGMENT}
`
export default USER_FRAGMENT;
