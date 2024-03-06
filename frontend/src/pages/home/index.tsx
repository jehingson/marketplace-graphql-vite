import ContructionComponent from "src/components/ContructionComponent"
import PageLayout from "src/layouts/PageLayout"
import Products from '@/components/products'
import Banner from '@/components/banner'
import Filter from '@/components/filter'
import Navbar from '@/components/navbar'

export const Component = () => {
  return (
    <PageLayout title="Tienda Markes Places" type="empty">
      <Navbar />
       <Banner />
       <Filter />
       <Products  />
    </PageLayout>
  )
}