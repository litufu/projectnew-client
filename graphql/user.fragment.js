import gql from 'graphql-tag';

import SCHOOLEDU_FRAGMENT from './schooledu.fragment'
import WORK_FRAGMENT from './work.fragment'
import FAMILY_FRAGMENT from './family.fragment'

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
    families{
      ...FamilyFragment
    }
    studies{
      ...SchoolEduFragment
    }
    works{
      ...WorkFragment
    }
 }
 ${FAMILY_FRAGMENT}
 ${SCHOOLEDU_FRAGMENT}
 ${WORK_FRAGMENT}
`
export default USER_FRAGMENT;
