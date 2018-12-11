import gql from 'graphql-tag';

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
    birthProvince{
      code
      name
    }
    birthCity{
      code
      name
    }
    birthArea{
      code
      name
    }
    birthStreet{
      code
      name
    }
    birthVillage{
      code
      name
    }
  }
`
export default USER_FRAGMENT;
