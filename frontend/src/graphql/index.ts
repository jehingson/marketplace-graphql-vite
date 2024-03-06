import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
//---------------Apollo Client variables set-up-------------------

const baseURL = import.meta.env.VITE_GRAPHQL_URL


const authToken = () => localStorage.getItem("authToken") || ''
const accessToken = () => localStorage.getItem("accessToken") || ''


export const client = new ApolloClient({
  ssrMode: false,
  link: createHttpLink({
    uri: baseURL,
    credentials: 'same-origin',
    headers: {
      'x-mkp-auth-token': authToken(),
      'x-mkp-access-token': accessToken()
    }
  }),
  cache: new InMemoryCache(),
});
//---------------End Apollo Client set-up-------------------

export { baseURL }