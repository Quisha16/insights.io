import React,  { Component } from 'react';
//import { Link } from 'react-router-dom';
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

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

var csrftoken = getCookie('csrftoken');

const CSRFToken = () => {
  return (
      <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFileChange(event) {
    const file = event.target.files[0];
    this.setState({ uploadedFile: file });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('myfile', this.state.uploadedFile);
    formData.append('product_link', event.target.product_link.value);
   
    try {
      const response = await fetch('http://localhost:8000/form_submit/', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-CSRFToken': csrftoken // Replace 'csrftoken' with the actual name of your CSRF token cookie
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData);
  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  render() {
    return (
      <div className="upload-container">
        <div className="content">
          <div className="upload-box">
            <h1>Upload CSV File</h1>
            <form method="post" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <CSRFToken />
              <div>
                Select file: <input type="file" name="myfile" onChange={this.handleFileChange} />
              </div>
              <div>
                Or provide text link: <input type="text" name="product_link" />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
