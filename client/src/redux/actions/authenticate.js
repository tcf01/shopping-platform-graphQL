import { LOGIN_MUTATION } from '../../utils/graphqlSchema/login/mutation';
import { AUTHENTICATE_LOGIN_QUERY } from '../../utils/graphqlSchema/login/query';
import { getClient } from '../../utils/client';
import { getError, clearError } from './error';
import { AUTHENTICATE_USER_SUCCESS/* , AUTHENTICATE_USER_FAIL */ } from '../../utils/constants';
import { SIGNUP_MUTATION } from './../../utils/graphqlSchema/login/mutation';

const authenticateUserSuccess = userData => {
    return {
        type: AUTHENTICATE_USER_SUCCESS,
        userData
    }
}

export const authenticateUserLogin = (token) => {
    return dispatch => {
        const client = getClient(dispatch)

        client
            .query({
                query: AUTHENTICATE_LOGIN_QUERY,
                variables: { token }
            })
            .then(res => {
                if (res) {
                    dispatch(clearError());
                    dispatch(authenticateUserSuccess(res.data.authenticateUserLogin))
                }
            })
            .catch(
                (error) => {
                    error.response && dispatch(getError(error.graphQLErrors[0].message))
                    return false
                }
            );
    }
}

export const register = (registerInfo) => {
    return dispatch => {
        const client = getClient(dispatch);
        const graphQLOption = {
            mutation: SIGNUP_MUTATION,
            variables: registerInfo
        }

        return client
            .mutate(graphQLOption)
            .then(res => console.log('asdfafsfasdfafsf,', res))
            .catch(
                (error) => {
                    error.response && dispatch(getError(error.graphQLErrors[0].message))
                    return false
                }
            );
    }
}

export const login = (loginInfo) => {
    return (dispatch) => {
        const client = getClient(dispatch);

        //NOTE:pass落query果個object key名一定要係'variables'
        // const variables = {
        //     username,
        //     password, 
        //     activeRole
        // }

        return client
            .mutate({
                mutation: LOGIN_MUTATION,
                variables: { ...loginInfo, role: loginInfo.activeRole }
            })
            .then(res => {
                if (res) {
                    dispatch(clearError());
                    localStorage.setItem('auth-token', res.data.login.token)
                    dispatch(authenticateUserSuccess(res.data.login.userInfo))

                    return true
                }
            })
            .catch(
                (error) => {
                    error.response && dispatch(getError(error.graphQLErrors[0].message))
                    return false
                }
            );
    }
}