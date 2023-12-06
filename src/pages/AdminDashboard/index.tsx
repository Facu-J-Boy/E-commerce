import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import { product } from '../../interfaces/product';
import DashboardProducts from '../../components/DashboardProducts/DashboardProducts';
import Loader from '../../components/Loader/Loader';
import { getAllCategories } from '../../redux/actions/getAllCategories';
import Categories from '../../components/Categories/Categories';
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('home');

  const [login, setLogin] = useState<boolean | string>('pending');

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
        navigate('*');
      }
    });
  }, [navigate]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const dispatch = useDispatch<AppDispatch>();

  const { products, productsLoading } = useSelector(
    (state: any) => state.products
  );

  const { categories, categoriesLoading } = useSelector(
    (state: any) => state.categories
  );

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      {login === 'pending'
        ? null
        : login === true && (
            <div className={styles.container}>
              <ul className={styles.myTab} role='tablist'>
                <li className={styles.navItem}>
                  <button
                    className={`${styles.navLink} ${
                      activeTab === 'home' && styles.active
                    }`}
                    onClick={() => handleTabClick('home')}
                    type='button'
                    role='tab'
                    aria-controls='home-tab-pane'
                    aria-selected={activeTab === 'home'}
                  >
                    Products
                  </button>
                </li>
                <li className={styles.navItem}>
                  <button
                    className={`${styles.navLink} ${
                      activeTab === 'profile' && styles.active
                    }`}
                    onClick={() => handleTabClick('profile')}
                    type='button'
                    role='tab'
                    aria-controls='profile-tab-pane'
                    aria-selected={activeTab === 'profile'}
                  >
                    Categories
                  </button>
                </li>
                <li className={styles.navItem}>
                  <button
                    className={`${styles.navLink} ${
                      activeTab === 'contact' && styles.active
                    }`}
                    onClick={() => handleTabClick('contact')}
                    type='button'
                    role='tab'
                    aria-controls='contact-tab-pane'
                    aria-selected={activeTab === 'contact'}
                  >
                    Contact
                  </button>
                </li>
              </ul>
              <div className={styles.myTabContent}>
                <div
                  className={`${styles.tabPane} ${
                    activeTab === 'home' && styles.active
                  }`}
                  role='tabpanel'
                >
                  {productsLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Loader />
                    </div>
                  ) : (
                    <>
                      {products.map((p: product) => (
                        <DashboardProducts
                          key={p.id}
                          id={p.id}
                          image={p.image}
                          title={p.title}
                          price={p.price}
                        />
                      ))}
                    </>
                  )}
                </div>
                <div
                  className={`${styles.tabPane} ${
                    activeTab === 'profile' && styles.active
                  }`}
                  role='tabpanel'
                >
                  {categoriesLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Loader />
                    </div>
                  ) : (
                    <>
                      {categories.map(
                        (c: string, index: React.Key | null | undefined) => (
                          <Categories key={index} categorie={c} />
                        )
                      )}
                    </>
                  )}
                </div>
                <div
                  className={`${styles.tabPane} ${
                    activeTab === 'contact' && styles.active
                  }`}
                  role='tabpanel'
                >
                  Contact Content
                </div>
              </div>
            </div>
          )}
    </>
  );
};

export default AdminDashboard;
