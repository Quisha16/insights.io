
import React, { useState, useEffect } from 'react';
import './Charts.css';
const WordCloud = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    //  URL of the WordCloud image from  Django backend
    fetch('http://localhost:8000/media/wordcloud.png') 
      .then(response => response.blob())
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      })
      .catch(error => {
        console.error('Error fetching WordCloud image:', error);
      });
  }, []);

  return (
    <div className="wordcloud-container"> {/* Add a container div */}
      {imageSrc && (
        <img className="wordcloud-image" src={imageSrc} alt="WordCloud" /> 
      )}
    </div>
  );
};

export default WordCloud;
