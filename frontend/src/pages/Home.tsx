import { FC } from 'react'
import PageLayout from '../layouts/PageLayout'
import Products from '@/components/products'
import Banner from '@/components/banner'
import Filter from '@/components/filter'
import Navbar from '@/components/navbar'

const Home: FC = () => {

  return (
     <PageLayout title='Markes Places' type='empty'>
       {/* componets  */}
       <Navbar />
       <Banner />
       <Filter />
       <Products  />
     </PageLayout>
  )
}


export default Home