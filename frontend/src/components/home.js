import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../ComponentCSS/home.css';

// const Home = () => {
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setUploadedFile(file);
//   };

//   return (
//     <div className="upload-container">
//       <div className="content">
//         <div className="upload-box">
//           <h1>Upload CSV File</h1>
//           <input type="file" onChange={handleFileChange} />
//           {uploadedFile && (
//             <div>
//               <p>Uploaded File: {uploadedFile.name}</p>
//               <Link to="/dashboard">
//                 <button>Go to Dashboard</button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



const Home = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hi");
    const formData = new FormData();
    formData.append('myfile', uploadedFile);
    formData.append('product_link', event.target.product_link.value);
   
    try {
      const response = await fetch('http://localhost:8000/formsubmit/', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData);
  
      // Redirect to dashboard if needed
      // history.push('/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="upload-container">
      <div className="content">
        <div className="upload-box">
          <h1>Upload CSV File</h1>
          <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div>
              Select file: <input type="file" name="myfile" onChange={handleFileChange} />
            </div>
            <div>
              Or provide text link: <input type="text" name="product_link" />
            </div>
            <Link to="/dashboard">
            <button type="submit">Submit</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
