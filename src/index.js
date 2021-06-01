import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'
import { setContext } from '@apollo/client/link/context';
const httpLink = createHttpLink({
  uri: 'https://cms.trial-task.k8s.ext.fcse.io/graphql',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token') || ""
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client ={client}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
