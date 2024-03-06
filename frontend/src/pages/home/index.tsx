import PageLayout from "src/layouts/PageLayout"
import Banner from '@/components/banner'
import Filter from '@/components/filter'
import Navbar from '@/components/navbar'

export const Component = () => {
  return (
    <PageLayout title="Tienda Markes Places" type="empty">
      <Navbar />
       <Banner />
       <Filter />
    </PageLayout>
  )
}