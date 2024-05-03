import React, { useCallback, useEffect, useState } from 'react';
import styles from './NavBar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './e-commerce.png';
import userImage from './user.jpg';
import SearchInput from './SearchInput/SearchInput';
import Cart from './Cart/Cart';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../redux/actions/getCart';
// import { getAllcategory } from '../../redux/actions/getAllCategory';
import { getSession } from '../../redux/actions/getSession';
import { userId } from '../../redux/actions/userId';
import LoaderMini from '../LoaderMini/LoaderMini';
import { logOut } from '../../redux/reducers/userReducer';

const NavBar: React.FC = (): JSX.Element => {
  const [list, setList] = useState(false);

  const { User, userLoading } = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState<any>(null);

  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    const id = userId.get();
    id && dispatch(getSession(id));
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userDataParam = params.get('userData');
    if (userDataParam) {
      setUserData(JSON.parse(decodeURIComponent(userDataParam)));
    }
  }, [location.search]);

  useEffect(() => {
    if (userData) {
      dispatch(getSession(userData._id));
      userId.set(userData._id);
    }
  }, [userData, dispatch]);

  useEffect(() => {
    User && dispatch(getCart(User._id));
    // dispatch(getAllcategory());
  }, [dispatch, User]);

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
  }, [list, toggleList]); // Cuando la lista es visible podemos cerrarla haciendo click en cualquier lugar

  const handleLogOut = () => {
    userId.set('');
    dispatch(logOut());
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
          <Cart />
        </div>
        {!User ? (
          <button
            className={styles.login_button}
            onClick={() => {
              navigate('/login');
            }}
          >
            {!userLoading ? 'Log In' : <LoaderMini color={'#333'} />}
          </button>
        ) : (
          <div className={styles.profileImg}>
            <img
              src={!User.photo ? userImage : User.photo}
              alt={!User.name ? 'undefined' : User.name}
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
                  <ol onClick={handleLogOut}>Exit</ol>
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
