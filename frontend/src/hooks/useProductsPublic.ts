import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import GET_PRODUCTS_PUBLIC from 'src/graphql/querys/getProductsPublic';
import { useSelector } from 'src/store';
import { Product } from 'src/types/product';



interface ProductAmount {
  amount: number,
  products: Product[]
}

const useProductsPublic = () => {
  const { filterInventory: filter } = useSelector((store) => store.product_state)
  const variables = {
    ...filter
  };
  const {
    data = null,
    loading,
  } = useQuery(GET_PRODUCTS_PUBLIC, {
    fetchPolicy: 'cache-and-network',
    variables,
  });
  
  console.log('data', data)
  const response: ProductAmount = useMemo(() => proccessProductsPublic(data), [data]);
  return { ...response, loading };
};

export default useProductsPublic;

const proccessProductsPublic = (data: any) => {
  const products = data?.products ?? {};
    return {
      amount: products?.amount ?? 0,
      products: products?.result ?? [],
    };
};
