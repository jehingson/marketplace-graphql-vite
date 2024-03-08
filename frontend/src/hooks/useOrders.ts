import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import GET_ORDERS from 'src/graphql/querys/getOrders';
import { Product } from 'src/types/product';
import { User } from 'src/types/user';


interface Sales {
  id: number
  prices: number
  quantity: number
  createdAt: String
  product: Product
}

interface Orders {
  id: number
  account: User
  total: number
  createdAt: string
  sales: Sales[]

}

interface OrderAmount {
  amount: number,
  orders: Orders[]
}

interface Filter {
  inputValue: string;
  limit: number;
  offset: number;
}

const useOrders = (filter: Filter) => {
  const variables = {
    ...filter
  };
  const {
    data = null,
    loading,
  } = useQuery(GET_ORDERS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });
  const response: OrderAmount = useMemo(() => proccessOrders(data), [data]);
  return { ...response, loading };
};

export default useOrders;

const proccessOrders = (data: any) => {
  const orders = data?.orders ?? {};
    return {
      amount: orders?.amount ?? 0,
      orders: orders?.result ?? [],
    };
};
