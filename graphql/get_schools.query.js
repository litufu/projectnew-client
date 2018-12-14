import gql from 'graphql-tag'

import SCHOOL_FRAGMENT from './school.fragment'

const GET_SCHOOLS = gql`
  query getSchools($locationName: String!) {
    getSchools(locationName: $locationName) {
      ... SchoolFragment
    }
  }
  ${SCHOOL_FRAGMENT}
`;

export default GET_SCHOOLS;