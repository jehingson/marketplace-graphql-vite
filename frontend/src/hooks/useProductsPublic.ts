import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import GET_PRODUCTS_PUBLIC from 'src/graphql/querys/getProductsPublic';
import { Product } from 'src/types/product';



interface ProductAmount {
  amount: number,
  products: Product[]
}

interface Filter {
  inputValue: string;
  limit: number;
  offset: number;
}

const useProductsPublic = (filter: Filter) => {
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
  const response: ProductAmount = useMemo(() => proccessProductsPublic(data), [data]);
  return { ...response, loading };
};

export default useProductsPublic;

const proccessProductsPublic = (data: any) => {
  const products = data?.productsPublic ?? {};
    return {
      amount: products?.amount ?? 0,
      products: products?.result ?? [],
    };
};
