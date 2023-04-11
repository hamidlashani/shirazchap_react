import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
function Articles() {

  

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('https://shirazchap.org/api/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
        <Header />
        <div className='row'>
    <div className="flex flex-wrap container mx-auto max-w-screen-xl">
      {articles.map(article => (
        <div key={article.id} className="w-full md:w-1/2 lg:w-1/4 p-2">
          <div className="bg-white rounded-lg shadow-md">
            <img src={'https://shirazchap.org'+article.introimage} alt={article.title} className="w-full h-52 rounded-t-lg" />
            <div className="p-4">
              <h2 title={article.title} className="text-lg font-bold mb-2">{article.title.slice(0,30)}</h2>
              <p className="text-gray-700">{article.intro.slice(0,150)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
    <Footer />
    </div>
  );
}

export default Articles;
