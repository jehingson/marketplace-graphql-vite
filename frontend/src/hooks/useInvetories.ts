import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import GET_INVENTORIES from 'src/graphql/querys/getInventories';
import { useSelector } from 'src/store';
import { Product } from 'src/types/product';


interface ProductAmount {
  amount: number,
  inventories: Product[]
}

const useInventories = () => {
  const { filterInventory: filter } = useSelector((store) => store.product_state)
  const variables = {
    ...filter
  };
  const {
    data = null,
    loading,
  } = useQuery(GET_INVENTORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });
  
  const response: ProductAmount = useMemo(() => proccessInventories(data), [data]);
  return { ...response, loading };
};

export default useInventories;

const proccessInventories = (data: any) => {
  const inventories = data?.inventories ?? {};
    return {
      amount: inventories?.amount ?? 0,
      inventories: inventories?.result ?? [],
    };
};
