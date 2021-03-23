import ApolloClient from 'apollo-boost';
import { API_URL } from './constants';
import { getError } from '../redux/actions/error';

//NOTE:For sending requests to backend GraphQL APIs
export const getClient = (dispatch) => {
  const client = new ApolloClient({
    request: (operation) => {
      const token = localStorage.getItem('auth-token');

      //after login, there will be token add to request header
      operation.setContext({
        headers: {
          token
        }
      });
    },
    uri: API_URL,
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        const [error] = graphQLErrors;
        dispatch(getError(error.message));
      } else if (networkError) {
        dispatch(getError('Network error. Error connecting to the server.'));
      }
    }
  });
  return client;
};
