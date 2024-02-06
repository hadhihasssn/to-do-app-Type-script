import { BrowserRouter as Router } from 'react-router-dom';
import WebRouters from './util/routes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
function App() {

  return (
    <Router>
      <WebRouters/>
    </Router>
  );
}

export default App;