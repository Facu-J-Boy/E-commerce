import React, { useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../redux/actions/searchProducts';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import styles from './NavBar.module.css';

const NavBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const { allProducts } = useSelector((state: any) => state.products);

  const handleInputChange = (ev: any) => {
    setSearch(ev.target.value);
  };

  const searchProduct = (ev: any) => {
    ev.preventDefault();
    !search
      ? dispatch(getAllProducts()) // Si no hay parametro de busqueda se setea el estado global de los productos a su totalidad
      : dispatch(searchProducts(search, allProducts)); // Caso contrario ejecutamos la acción de busqueda
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.logo_container}>
        <img className={styles.logo} src='logo_e-commerce.png' alt='logo' />
      </div>
      <form className={styles.nav_input} onSubmit={searchProduct}>
        <input type='text' value={search} onChange={handleInputChange} />
      </form>
      <button>Dashboard</button>
    </div>
  );
};

export default NavBar;
