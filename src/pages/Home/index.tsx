import React, { useEffect } from 'react';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import { getAllCategories } from '../../redux/actions/getAllCategories';
import Carousel from '../../components/Carousel/Carousel';
import { getCart } from '../../redux/actions/getCart';
import { clearProductsList } from '../../redux/actions/clearProductsList';
import CarrouselProducts from '../../components/CarrouselProducts/CarrouselProducts';
import { getHistory } from '../../redux/actions/getHistory';
import styles from './Home.module.css';
import { getSearch } from '../../redux/actions/getSearch';

const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, allProducts, productsLoading, productsError } = useSelector(
    (state: any) => state.products
  );

  const { historyProductsLoading, historyProducts } = useSelector(
    (state: any) => state.historyProducts
  );

  // localStorage.clear();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    dispatch(getCart());
    dispatch(getHistory());
    dispatch(getSearch());
    return () => {
      dispatch(clearProductsList());
    };
  }, [dispatch]);

  return (
    <div>
      <Carousel />
      <ProductsGrid
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
      />

      {!historyProducts.length || !allProducts.length ? null : (
        <h1 className={styles.title}>History</h1>
      )}
      {!allProducts.length ? null : (
        <CarrouselProducts
          products={historyProducts}
          loading={historyProductsLoading}
        />
      )}
    </div>
  );
};

export default Home;
