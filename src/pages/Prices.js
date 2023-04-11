import React, { useState, useEffect } from 'react';
//import fetchData from './fetchData';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
const apiUrl = 'https://shirazchap.org/api/largeformats_price';

async function fetchData() {
  const response = await axios.get(apiUrl);
  return response.data.largeformats;
}



function Prices() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData().then(data => {
      const groupedProducts = {};

      data.forEach(product => {
        if (!groupedProducts[product.product_id]) {
          groupedProducts[product.product_id] = [];
        }

        groupedProducts[product.product_id].push(product);
      });

      setProducts(Object.values(groupedProducts));
    });
  }, []);

  return (
    <div>
        <Header />
        
        <div className='row'>
        <div className="container mx-auto max-w-screen-xl">

      {products.map((group, index) => (
        <div>
                        <h1 className='text-center mt-8 pb-3 pt-3 bg-[#F6F0F0] border-b border-slate-600'>{group[0].title}</h1>

        <table className="min-w-full text-left text-sm font-light text-center bg-[#F6F0F0]"> 
          <thead class="border-b font-medium dark:border-neutral-500">  
                    <tr>
              <th scope="col" className="px-6 py-4">نام مدیا</th>
              <th scope="col" className="px-6 py-4">نوع دستکاه چاپ</th>
              <th scope="col" className="px-6 py-4">ضخامت مدیا</th>
              <th scope="col" className="px-6 py-4">کیفیت چاپ</th>
              <th scope="col" className="px-6 py-4">قیمت هر متر مربع</th>
            </tr>
          </thead>
          <tbody>
            {group.map(product => (
              <tr className='h-14 border-b dark:border-neutral-500"> hover:bg-slate-300 border-slate-700' key={product.id}>
                <td className='whitespace-nowrap px-6 py-4'>{product.title}</td>
                <td className='whitespace-nowrap px-6 py-4'>{product.device_name}</td>
                <td className='whitespace-nowrap px-6 py-4'>{product.thickness_name}</td>
                <td className='whitespace-nowrap px-6 py-4'>{product.pass_name}</td>
                <td className='whitespace-nowrap px-6 py-4'>{product.price} تومان</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ))}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Prices;
