import gql from 'graphql-tag';

import FAMILY_FRAGMENT from './family.fragment'

const FAMILY_CHANGED_SUBSCRIPTION = gql`
    subscription onFamilyConnected{
        familyChanged
    }
`   

export default FAMILY_CHANGED_SUBSCRIPTION;