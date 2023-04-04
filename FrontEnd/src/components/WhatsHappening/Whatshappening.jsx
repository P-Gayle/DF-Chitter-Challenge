import './whatsHappening.css'
import News from './News';
import React, { useState, useEffect } from 'react';
import { fetchNewsData } from '../../utils/newsApi';

const WhatsHappening = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNewsData();
        setNewsData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    getNews();
  }, []);

  if (error) {
    return <p>Error fetching data</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const newsDisplay = newsData.map(newsItem => (

      <News
        key={newsItem.id}
        headline={newsItem.fields.headline}
        />
  ));

    return (
        <div className='whatsHappening'>
            <h3>What's happening...</h3>
            <p className='newsItem'>{newsDisplay}</p>
        </div>
    )
};

export default WhatsHappening;