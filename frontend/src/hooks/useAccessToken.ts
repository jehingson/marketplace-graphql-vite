import { useQuery } from "@apollo/client";
import GET_ACCESS_TOKEN from "src/graphql/querys/getAccessToken";

const useAccessToken = () => {
  const { data = {} } = useQuery(GET_ACCESS_TOKEN, { fetchPolicy: 'cache-first' });
  const { getAccessToken = null } = data;
  if (getAccessToken) localStorage.setItem('accessToken', getAccessToken)
};
export default useAccessToken