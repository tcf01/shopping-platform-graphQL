import { gql } from 'apollo-boost';


export const SIGNUP_MUTATION = gql`
    mutation ($email: String!, $password: String!, $username: String!, $role: [String!]!){
        register(registerData: {email: $email, password: $password, username: $username, role: $role}){
            email
        }
    }
`

export const LOGIN_MUTATION = gql`
   mutation ($username: String!, $password: String!, $role: String!) {
        login(username: $username, password: $password, role: $role) 
        {
        # NOTE:同你係playground寫既query一樣, 呢到係講你要番D咩properties
            userInfo{
                _id
                username
                email
                role
            }
            token
       }
    }
`

export const UPLOAD_IMAGES = gql`
    mutation ($files: [Upload]!){
        addProductImages(files: $files){
            filename
        }
    }
`