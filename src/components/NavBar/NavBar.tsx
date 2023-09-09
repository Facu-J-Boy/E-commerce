import React, { useEffect, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../redux/actions/searchProducts';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import styles from './NavBar.module.css';
import { auth } from '../../Firebase';
import { user } from '../../interfaces/user';
import { getAuth, signOut } from 'firebase/auth';

const NavBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const [list, setList] = useState(false);
  const [user, setUser] = useState<user>({
    photoURL: '',
    displayName: ''
  });
  const { allProducts } = useSelector((state: any) => state.products);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ photoURL: user.photoURL, displayName: user.displayName });
        console.log('User: ', user);
      }
    });
  }, []);

  const handleInputChange = (ev: any) => {
    setSearch(ev.target.value);
  };

  const searchProduct = (ev: any) => {
    ev.preventDefault();
    !search
      ? dispatch(getAllProducts()) // Si no hay parametro de busqueda se setea el estado global de los productos a su totalidad
      : dispatch(searchProducts(search, allProducts)); // Caso contrario ejecutamos la acción de busqueda
  };

  const toggleList = () => {
    setList(!list);
  };

  const logOut = async () => {
    console.log('logOut ejecutado');
    try {
      const auth = getAuth();
      await signOut(auth).then(() => {
        setUser({ photoURL: '', displayName: '' });
      });
    } catch (error) {
      console.error('Error of close session:', error);
    }
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.logo_container}>
        <img className={styles.logo} src='logo_e-commerce.png' alt='logo' />
      </div>
      <div className={styles.nav_elements}>
        <form onSubmit={searchProduct}>
          <input
            type='text'
            placeholder='Search product'
            value={search}
            onChange={handleInputChange}
          />
        </form>
        <div className={styles.user_info}>
          <button>Dashboard</button>
          {!user.displayName && !user.photoURL ? (
            <button>Login</button>
          ) : (
            <div className={styles.profileImg}>
              <img
                src={!user.photoURL ? 'user-image.jpg' : user.photoURL}
                alt={!user.displayName ? 'undefined' : user.displayName}
                onClick={toggleList}
              />
              {list && (
                <ul className={styles.list}>
                  <ol>Dashboard</ol>
                  <ol onClick={logOut}>Exit</ol>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
