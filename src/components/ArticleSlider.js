import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';


const ArticleSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://shirazchap.org/api/articles')
      .then(response => {
        const data = response.data;//.slice(0, 8);
        setProducts(data);
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
          <div key={product.id} className="item bg-white border-4 border-[#888] rounded-xl">
            <div className='border border-slate-700 rounded-lg text-right rtl'>
            <img className='rounded-t-lg h-44 w-full' src={'https://shirazchap.org'+product.introimage} alt={product.title} />
            <h3 className='text-lg text-center text-teal-800 font-[IRANSansWeb(FaNum)_Black]'>{product.title.slice(0,30)}</h3>
            <p className='p-4 text-right text-justify'>{product.intro.slice(0,100)}</p>
          </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ArticleSlider;
