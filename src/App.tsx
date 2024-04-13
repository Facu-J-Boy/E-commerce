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
import Edit from './pages/Edit';
import Footter from './components/Footter/Footter';
import Buy from './pages/Buy';
import { useSelector } from 'react-redux';
import Notification from './components/Notification/Notification';

function App() {
  const { type, text } = useSelector((state: any) => state.notification);
  return (
    <Router>
      {type && text ? <Notification type={type} text={text} /> : null}
      <NavBar /> {/* Renderiza la NavBar en todas las rutas */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/buy/:id' element={<Buy />} />
        {/* Ruta de error */}
        <Route path='*' element={<NotFound />} />
        {/* Redirige a la ruta de error cuando no se encuentra una ruta */}
        <Route path='404' element={<Navigate to='/404' />} />
      </Routes>
      <Footter />
    </Router>
  );
}

export default App;
