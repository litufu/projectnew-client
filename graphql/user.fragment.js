import gql from 'graphql-tag';

import SCHOOLEDU_FRAGMENT from './schooledu.fragment'
import WORK_FRAGMENT from './work.fragment'
import EXAMBASICINFO_FRAGMENT from './exam_basicInfo.fragment'
import REGSTATUS_FRAGMENT from './regStatus.fragment'
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
    works{
      ...WorkFragment
    }
    exam{
      ...ExamBasicInfoFragment
    }
    regStatus{
      ...RegStatusFragment
    }
 }
 ${SCHOOLEDU_FRAGMENT}
 ${WORK_FRAGMENT}
 ${EXAMBASICINFO_FRAGMENT}
 ${REGSTATUS_FRAGMENT}
`
export default USER_FRAGMENT;
