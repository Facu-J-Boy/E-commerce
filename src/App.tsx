import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Product from './components/Product';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Product />} />
      {/* Ruta de error */}
      <Route path="*" element={<NotFound />} />
        {/* Redirige a la ruta de error cuando no se encuentra una ruta */}
      <Route path="404" element={<Navigate to="/404" />} />
    </Routes>
  </Router>
  );
}

export default App;
