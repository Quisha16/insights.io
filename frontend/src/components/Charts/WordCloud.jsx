import React, { useState, useEffect } from 'react';
const WordCloud = ({ imageName }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    //  URL of the WordCloud image from  Django backend
    fetch(`http://localhost:8000/media/${imageName}.png`) 
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
    <div className="wordcloud-container"> 
      {imageSrc && (
        <img className="wordcloud-image" src={imageSrc} alt="WordCloud" /> 
      )}
    </div>
  );
};

export default WordCloud;
