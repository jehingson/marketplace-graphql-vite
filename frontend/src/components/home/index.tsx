import React from 'react'
import ProductPublic from './productPublic'
import useProductsPublic from 'src/hooks/useProductsPublic'

export default function Home() {
  const { products, loading  } = useProductsPublic()

  return (
    <ProductPublic products={products} loading={loading} />
  )
}
