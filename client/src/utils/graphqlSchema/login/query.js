import { gql } from 'apollo-boost';

export const AUTHENTICATE_LOGIN_QUERY = gql`
    query($token: String!){
        authenticateUserLogin(token: $token){
            username
            email
            role
            _id
        }
    }
`