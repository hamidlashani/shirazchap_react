import React, { useState, useEffect } from "react";
import Slider from 'react-slick';

const useImageResource = (src) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageSrc(src);
    };
    image.src = src;
  }, [src]);

  return imageSrc;
};

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  fade: true,
};

const HomeSlider = () => {
  const slide1 = useImageResource('../img/slide1.jpg');
  const slide2 = useImageResource('../img/slide2.jpg');
  const slide3 = useImageResource('../img/slide3.jpg');

  return (
    <div className="mt-4">
      <Slider {...settings}>
        <div key={3}><img className="bg-teal-800" alt="hhs" src={slide3} /></div>
        <div key={2}><img className="bg-teal-800" alt="hhs" src={slide1} /></div>
        <div key={1}><img className="bg-teal-800" alt="hhs" src={slide2} /></div>
      </Slider>
    </div>
  );
};

export default HomeSlider;
