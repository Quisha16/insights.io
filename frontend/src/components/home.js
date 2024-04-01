import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../ComponentCSS/home.css';

const Home = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  return (
    <div className="upload-container">
      <div className="content">
        <div className="upload-box">
          <h1>Upload CSV File</h1>
          <input type="file" onChange={handleFileChange} />
          {uploadedFile && (
            <div>
              <p>Uploaded File: {uploadedFile.name}</p>
              <Link to="/dashboard">
                <button>Go to Dashboard</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;


