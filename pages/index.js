import React from 'react';

import { client } from '@/lib/client';
import { Product, FooterBanner, HeroBanner  } from '@/components';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0] }/> {/* This first checks that we have banner data*/}
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => <Product  key={product._id} product={product}/>)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

// instead of useEffect() Next.js uses getServerSideProps to preRender a page with data from the client
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products, bannerData}
  }
}

export default Home