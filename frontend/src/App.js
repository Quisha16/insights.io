// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
// import Home from './components/home';
// import Dashboard from './components/dashboard';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home/home';

import Dashboard from './Dashboard';


function App() {
  useEffect(() => {
    document.title = "Insights.io";
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;

