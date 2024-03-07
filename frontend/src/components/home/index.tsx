import ProductPublic from './productPublic'
import useProductsPublic from 'src/hooks/useProductsPublic'
import { useSelector } from 'src/store'

export default function Home() {
  const { filterProductPublic: filter, card } = useSelector((store) => store.product_state)
  const { products, amount, loading  } = useProductsPublic(filter)

  return (
    <ProductPublic 
      card={card}
      products={products} 
      amount={amount} 
      loading={loading} 
      filter={filter} 
    />
  )
}
