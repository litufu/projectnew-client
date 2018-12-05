import gql from 'graphql-tag';

import FAMILY_FRAGMENT from './family.fragment'

const FAMILY_CONNECTED_SUBSCRIPTION = gql`
    subscription onFamilyConnected($familyIds: [ID!]){
        familyConnected(familyIds:$familyIds){
            ...FamilyFragment
        }
    }
    ${FAMILY_FRAGMENT}
`   

export default FAMILY_CONNECTED_SUBSCRIPTION;