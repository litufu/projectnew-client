import gql from "graphql-tag";

const SIGNUP = gql`
mutation signup(
    $username: String!
    $password: String!
) {
    signup(
        username: $username
        password: $password
    ) {
        token
    }
}
`

export default SIGNUP;