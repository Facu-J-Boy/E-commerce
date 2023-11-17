import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import SearchInput from './SearchInput/SearchInput';

const NavBar: React.FC = (): JSX.Element => {
  const [list, setList] = useState(false);
  const [productList, setProductsList] = useState(false);
  const [user, setUser] = useState<user>({
    photoURL: '',
    displayName: ''
  });

  const { cartProducts, total } = useSelector(
    (state: any) => state.cartProducts
  );

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ photoURL: user.photoURL, displayName: user.displayName });
        console.log('User: ', user);
      }
    });
  }, []);

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
          <SearchInput />
          <div className={styles.cart}>
            <GrCart size={30} onClick={toggleProducts} />
            {productList && (
              <div className={styles.product_list_container}>
                {!cartProducts.length ? (
                  <ul className={styles.products}>
                    <h4
                      style={{
                        display: 'flex',
                        color: '#333',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      Your cart is empty
                    </h4>
                  </ul>
                ) : (
                  <ul className={styles.products}>
                    <div className={styles.totalContainer}>
                      <div className={styles.total}>
                        <h2>Total:</h2>
                        <h3>{`$${total}`}</h3>
                      </div>
                      <button>Buy</button>
                    </div>
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
                )}
              </div>
            )}
            <span>
              {cartProducts.length >= 10
                ? '9+'
                : !cartProducts.length
                ? null
                : cartProducts?.length}
            </span>
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
