import gql from 'graphql-tag';

import SCHOOLEDU_FRAGMENT from './schooledu.fragment'
import WORK_FRAGMENT from './work.fragment'
import EXAMBASICINFO_FRAGMENT from './exam_basicInfo.fragment'
import REGSTATUS_FRAGMENT from './regStatus.fragment'
import LOCATION_FRAGMENT from './Location.fragment'
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
      ...LocationFragment
    }
    residence{
      ...LocationFragment
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
 ${LOCATION_FRAGMENT}
 ${LOCATION_FRAGMENT}
 ${SCHOOLEDU_FRAGMENT}
 ${WORK_FRAGMENT}
 ${EXAMBASICINFO_FRAGMENT}
 ${REGSTATUS_FRAGMENT}
`
export default USER_FRAGMENT;
