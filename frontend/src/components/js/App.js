import React from 'react';
import './App.css';

import {BrowserRouter as Router} from 'react-router-dom'

import Header from './components/inc/Header';
import Footer from './components/inc/Footer';
import '../public/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
