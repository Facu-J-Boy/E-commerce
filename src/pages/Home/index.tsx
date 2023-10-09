import React, { useEffect } from 'react';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import { getAllCategories } from '../../redux/actions/getAllCategories';
import Carousel from '../../components/Carousel/Carousel';

const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div>
      <Carousel />
      <ProductsGrid products={products} loading={loading} error='' />
    </div>
  );
};

export default Home;
