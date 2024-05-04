// import React from 'react';
// import '../MainContent/MainContent.css';

// const Card = () => {
 
//   const totalReviews = 100;
//   const totalPositiveReviews = 70;
//   const totalNegativeReviews = 30;

//   return (
//     <div className="card">
//       <div className="card-header">
        
//       </div>
//       <div className="card-body">
//         <div className="info-item">
//           <span className="info-label">Total Reviews:</span>
//           <span className="info-value">{totalReviews}</span>
//         </div>
//         <div className="info-item">
//           <span className="info-label">Total Positive Reviews:</span>
//           <span className="info-value">{totalPositiveReviews}</span>
//         </div>
//         <div className="info-item">
//           <span className="info-label">Total Negative Reviews:</span>
//           <span className="info-value">{totalNegativeReviews}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React from 'react';
import '../MainContent/MainContent.css';

const Card = () => {
 
  const totalReviews = 100;
  const totalPositiveReviews = 70;
  const totalNegativeReviews = 30;

  return (
    <div className="card">
      <div className="card-header">
        
      </div>
      <div className="card-body">
        <div className="info-container">
          <div className="info-box">
            <span className="info-label">Total Reviews:</span>
            <span className="info-value">{totalReviews}</span>
          </div>
          <div className="info-box">
            <span className="info-label">Total Positive Reviews:</span>
            <span className="info-value">{totalPositiveReviews}</span>
          </div>
          <div className="info-box">
            <span className="info-label">Total Negative Reviews:</span>
            <span className="info-value">{totalNegativeReviews}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
