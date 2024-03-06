
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const baseURL = import.meta.env.VITE_GRAPHQL_URL

const authToken = () => localStorage.getItem("authToken") || ''
const accessToken = () => localStorage.getItem("accessToken") || ''

const httpLink = createHttpLink({
  uri: baseURL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-mkp-auth-token': authToken(),
      'x-mkp-access-token': accessToken()
    },
  };
});

export const client = new ApolloClient({
  ssrMode: false,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
//---------------End Apollo Client set-up-------------------

export { baseURL }