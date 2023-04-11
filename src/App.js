import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Articles from './pages/Articles';
import Home from './pages/Home';
import Prices from './pages/Prices';
import LargeFormatOrderForm from './pages/LargeFormatOrderForm'
import Login from './pages/Login';
import Register from './pages/Register';
import UploadForm from './pages/UploadForm';


function App() {
  const { id } = useParams();
  return (
    <Router>
    
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/upload" element={<UploadForm />} />
      <Route exact path="/register" element={<Register />} />
        <Route exact path="/prices" element={<Prices />} />
        <Route exact path="/articles" element={<Articles />} />
        <Route exact path="/largeformatorder" element={<LargeFormatOrderForm />} />
        <Route exact path="/largeformatorder/:id" element={<LargeFormatOrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
