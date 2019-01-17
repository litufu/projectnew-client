import gql from "graphql-tag";

import Message_FRAGMENT from './message.fragment'

const GET_MESSAGES = gql`
  {
    messages {
      ...MessageFragment
    }
  }
  ${Message_FRAGMENT}
`;

export default GET_MESSAGES;