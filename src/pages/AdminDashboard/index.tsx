import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { product } from '../../interfaces/product';
import DashboardProducts from '../../components/DashboardProducts/DashboardProducts';
import Loader from '../../components/Loader/Loader';
import Categories from '../../components/Categories/Categories';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import Loadingscreen from '../../components/LoadingScreen/Loadingscreen';
import { userId } from '../../redux/actions/userId';
import Pages from '../../components/ProductsGrid/Pages/Pages';
import { getAllcategory } from '../../redux/actions/getAllCategory';
import { category } from '../../interfaces/category';

const AdminDashboard: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('home');

  const navigate = useNavigate();

  const { User, userLoading } = useSelector((state: any) => state.user);

  const { title, products, productsLoading, currentPage, message } =
    useSelector((state: any) => state.products);

  const { categories, categoriesLoading, categoriesError } = useSelector(
    (state: any) => state.categories
  );

  const dispatch = useDispatch<AppDispatch>();

  const user = userId.get();

  useEffect(() => {
    if (!user?.length) {
      navigate('*');
    } // Si el usuario no está logueado lo redirige a otra pagina
  }, [user, navigate]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage, title }));
  }, [dispatch, currentPage, title]);

  useEffect(() => {
    dispatch(getAllcategory());
  }, [dispatch]);

  return (
    <>
      {userLoading ? (
        <Loadingscreen />
      ) : (
        Object.keys(User).length && (
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
            </ul>
            <div className={styles.myTabContent}>
              <div
                className={`${styles.tabPane} ${
                  activeTab === 'home' && styles.active
                }`}
                role='tabpanel'
              >
                {currentPage && <Pages />}
                {message && <ErrorMessage message={message} />}
                {productsLoading ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '550px'
                    }}
                  >
                    <Loader />
                  </div>
                ) : (
                  products?.map((p: product, index: number) => (
                    <DashboardProducts
                      key={index}
                      _id={p._id}
                      image={p.image}
                      title={p.title}
                      price={p.price}
                    />
                  ))
                )}
                {currentPage && <Pages />}
              </div>
              <div
                className={`${styles.tabPane} ${
                  activeTab === 'profile' && styles.active
                }`}
                role='tabpanel'
              >
                {categoriesError ? (
                  <ErrorMessage message={categoriesError.text} />
                ) : null}
                {categoriesLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader />
                  </div>
                ) : (
                  <>
                    {categories?.map((c: category) => (
                      <Categories key={c._id} name={c.name} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default AdminDashboard;
