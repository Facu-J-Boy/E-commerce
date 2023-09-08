import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import NotFound from './components/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        {/* Ruta de error */}
        <Route path='*' element={<NotFound />} />
        {/* Redirige a la ruta de error cuando no se encuentra una ruta */}
        <Route path='404' element={<Navigate to='/404' />} />
      </Routes>
    </Router>
  );
}

export default App;
