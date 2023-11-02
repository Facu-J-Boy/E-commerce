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

const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, productsLoading } = useSelector(
    (state: any) => state.products
  );

  const { historyProductsLoading, historyProducts } = useSelector(
    (state: any) => state.historyProducts
  );

  console.log('localStorage: ', localStorage.getItem('cart'));

  // localStorage.clear();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    dispatch(getCart());
    dispatch(getHistory());
    return () => {
      dispatch(clearProductsList());
    };
  }, [dispatch]);

  return (
    <div>
      <Carousel />
      {!historyProducts.length ? null : (
        <h1 style={{ color: '#333', marginLeft: '60px' }}>History</h1>
      )}
      <CarrouselProducts
        products={historyProducts}
        loading={historyProductsLoading}
      />
      <ProductsGrid
        products={products}
        productsLoading={productsLoading}
        error=''
      />
    </div>
  );
};

export default Home;
