import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from 'apollo-upload-client';
import { PersistGate } from 'redux-persist/integration/react'


import AppRouter from './router/AppRouter';
import StoreUtil from './store/store';
import Loading from './components/loading/Loading';


import 'reset-css';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';



const { store, persistor } = StoreUtil;


const link = createUploadLink({
  uri: 'http://localhost:5000/graphql' /* API_URL */,
  credentials: 'include',
});

// apollo client setup
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})


ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <AppRouter />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </Suspense>
  ,
  document.getElementById('root')
);
