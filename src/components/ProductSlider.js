import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get('https://shirazchap.org/api/largeformatsList')
      .then(response => {
        const data = response.data.largeformats.slice(0, 9); // برای نمایش ۳ آیتم از اطلاعات دریافتی
        const filteredData = data.filter(product => product.title && product.slug && product.image); // حذف آیتم‌های خالی
        setProducts(filteredData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    margin:20,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:5000,
    rtl:true ,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="product-slider">
      <Slider {...settings}>
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl border-4 border-[#888]">
            <div className='border border-slate-700 rounded-lg'>
            <img className='rounded-t-lg' src={'https://shirazchap.org'+product.image} width="300" alt={product.title} />
            <h3 className='text-center text-lg text-teal-800'>{product.title}</h3>
            <p className='p-4'>{product.slug}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
