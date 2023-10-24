import React, { useCallback, useEffect, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../redux/actions/searchProducts';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import styles from './NavBar.module.css';
import { auth } from '../../Firebase';
import { user } from '../../interfaces/user';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from './e-commerce.png';
import userImage from './user.jpg';
import { GrCart } from 'react-icons/gr';
import { product } from '../../interfaces/product';
import ProductItem from './ProductItem/ProductItem';

const NavBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const [list, setList] = useState(false);
  const [productList, setProductsList] = useState(false);
  const [user, setUser] = useState<user>({
    photoURL: '',
    displayName: ''
  });
  const { allProducts } = useSelector((state: any) => state.products);

  const { cartProducts } = useSelector((state: any) => state.cartProducts);

  const navigate = useNavigate();

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

  const toggleList = useCallback(() => {
    setList(!list);
  }, [list]);

  useEffect(() => {
    if (list === true) {
      document.body.addEventListener('click', toggleList);
    }
    return () => {
      document.body.removeEventListener('click', toggleList);
    };
  }, [list, toggleList]); // Cuando la lista es visible podemos cerrarla haciendo click en cualquier lugar para cerrarla

  const toggleProducts = useCallback(() => {
    setProductsList(!productList);
  }, [productList]);

  useEffect(() => {
    if (productList === true) {
      document.body.addEventListener('click', toggleProducts);
    }
    return () => {
      document.body.removeEventListener('click', toggleProducts);
    };
  }, [productList, toggleProducts]);

  const logOut = async () => {
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
        <img
          className={styles.logo}
          onClick={() => {
            navigate('/');
          }}
          style={{ cursor: 'pointer' }}
          src={logo}
          alt='E-commerce'
        />
      </div>
      <div className={styles.nav_elements}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <form onSubmit={searchProduct}>
            <input
              type='text'
              placeholder='Search product'
              value={search}
              onChange={handleInputChange}
            />
          </form>
          <div className={styles.cart}>
            <GrCart size={30} onClick={toggleProducts} />
            {productList && (
              <div className={styles.product_list_container}>
                <ul className={styles.products}>
                  {cartProducts.map((p: product) => (
                    <ol>
                      <ProductItem
                        id={p.id}
                        title={p.title}
                        price={p.price}
                        image={p.image}
                      />
                    </ol>
                  ))}
                </ul>
              </div>
            )}
            <span>{cartProducts?.length}</span>
          </div>
        </div>
        {user.displayName === '' && user.photoURL === '' ? (
          <button
            className={styles.login_button}
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </button>
        ) : (
          <div className={styles.profileImg}>
            <img
              src={!user.photoURL ? userImage : user.photoURL}
              alt={!user.displayName ? 'undefined' : user.displayName}
              onClick={toggleList}
            />
            {list && (
              <div className={styles.list_container}>
                <ul className={styles.list}>
                  <ol
                    onClick={() => {
                      navigate('/admin');
                    }}
                  >
                    Dashboard
                  </ol>
                  <ol onClick={logOut}>Exit</ol>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
