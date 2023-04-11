import React, { lazy, Suspense } from 'react';
import ArticleSlider from '../components/ArticleSlider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductSlider from '../components/ProductSlider';
import HomeSlider from '../components/HomeSlider';

const Home = () => {
  return (
    <div>
      <Header />
      <div className='row'>
        <div className="">
            <HomeSlider />
        </div>
        <div className="container mx-auto max-w-screen-xl mt-8 bg-[#00000069] p-8 rounded-lg flex min-h-[320px]">
          <div className='w-3/12 max-[480px]:hidden'>
            rdrhdh
          </div>
          <div className='w-10/12 max-[480px]:w-full'>
              <ProductSlider />
          </div>
        </div>


        <div className="container mx-auto max-w-screen-xl mt-8 bg-[#00000069] p-8 rounded-lg flex min-h-[380px]">
        <div className='w-3/12 max-[480px]:hidden'>
            rdrhdh
          </div>
          <div className='w-10/12 max-[480px]:w-full'>
              <ArticleSlider />
          </div>
        </div>
        <div className="container mx-auto max-w-screen-xl mt-8 bg-[#00000069] p-8 rounded-lg flex min-h-[380px]">
        <div className='w-3/12 max-[480px]:hidden'>
            rdrhdh
          </div>
          <div className='w-10/12 max-[480px]:w-full'>
              <ArticleSlider />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
