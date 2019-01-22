import gql from 'graphql-tag';
import GROUP_MESSAGE_FRAGMENT from './groupMessage.fragment'

const GROUPMESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription onGroupMessageAdded($userId: String,$groupIds:[String]){
        groupMessageAdded(userId: $userId,groupIds:$groupIds){
            ...GroupMessageFragment
        }
    }
    ${GROUP_MESSAGE_FRAGMENT}
`   

export default GROUPMESSAGE_ADDED_SUBSCRIPTION;