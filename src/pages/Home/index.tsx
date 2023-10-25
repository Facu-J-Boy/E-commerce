import React, { useEffect } from 'react';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import { getAllCategories } from '../../redux/actions/getAllCategories';
import Carousel from '../../components/Carousel/Carousel';
import { getCart } from '../../redux/actions/getCart';

const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, productsLoading } = useSelector(
    (state: any) => state.products
  );

  console.log('localStorage: ', localStorage.getItem('cart'));

  // localStorage.clear();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <Carousel />
      <ProductsGrid
        products={products}
        productsLoading={productsLoading}
        error=''
      />
    </div>
  );
};

export default Home;
