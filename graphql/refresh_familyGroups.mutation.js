import gql from "graphql-tag";

import FAMILYGROUP_FRAGMENT from './familyGroup.fragment'

const REFRESH_FAMILYGROUPS = gql`
mutation {
 refreshMyFamilyGroups {
    ...FamilyGroupFragment
  }
}
${FAMILYGROUP_FRAGMENT}
`;

export default REFRESH_FAMILYGROUPS;