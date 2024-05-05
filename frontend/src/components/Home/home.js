
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './home.css';

// function getCookie(name) {
//   var cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//       var cookies = document.cookie.split(';');
//       for (var i = 0; i < cookies.length; i++) {
//           var cookie = cookies[i].trim();
//           if (cookie.substring(0, name.length + 1) === (name + '=')) {
//               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//               break;
//           }
//       }
//   }
//   return cookieValue;
// }

// var csrftoken = getCookie('csrftoken');

// const CSRFToken = () => {
//   return (
//       <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
//   );
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setUploadedFile(file);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('myfile', uploadedFile);
//     formData.append('product_link', event.target.product_link.value);
//     const csrftoken = getCookie('csrftoken');
   
//     try {
//       const response = await fetch('http://localhost:8000/form_submit/', {
//         credentials: 'include',
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'X-CSRFToken': csrftoken
//         },
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const responseData = await response.json();
//       console.log(responseData);

//       navigate('/dashboard');
  
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <div className="upload-container">
//       <div className="content">
//         <div className="upload-box">
//           <h1>Upload CSV File</h1>
//           <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
//             <CSRFToken />
//             <div>
//               Select file: <input type="file" name="myfile" onChange={handleFileChange} />
//             </div>
//             <div>
//               Or provide text link: <input type="text" name="product_link" />
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UilUploadAlt } from "@iconscout/react-unicons";
import "./home.css";

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var csrftoken = getCookie("csrftoken");

const CSRFToken = () => {
  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};

const Home = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("myfile", uploadedFile);
    formData.append("product_link", event.target.product_link.value);
    const csrftoken = getCookie("csrftoken");

    try {
      const response = await fetch("http://localhost:8000/form_submit/", {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);

      navigate("/DashboardTwo");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="glass-container">
      <div className="glass-content">
        <div className="upload-box">
          <div className="text">Upload CSV File</div>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <CSRFToken />
            <div>
              <div>
                <label htmlFor="myfile" className="upload-button">
                  <UilUploadAlt className="upload-icon" /> 
                  <input
                    id="myfile"
                    type="file"
                    name="myfile"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>
                {uploadedFile && <span>{uploadedFile.name}</span>}
              </div>
            </div>
            <div>
              <div className="text">Provide Product Link</div> <input type="text" name="product_link" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
