import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import NotFound from './components/NotFound/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar/NavBar';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <NavBar /> {/* Renderiza la NavBar en todas las rutas */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/admin' element={<AdminDashboard />} />
        {/* Ruta de error */}
        <Route path='*' element={<NotFound />} />
        {/* Redirige a la ruta de error cuando no se encuentra una ruta */}
        <Route path='404' element={<Navigate to='/404' />} />
      </Routes>
    </Router>
  );
}

export default App;
