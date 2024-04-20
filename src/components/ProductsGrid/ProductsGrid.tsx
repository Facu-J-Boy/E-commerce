import React, { useEffect } from 'react';
import styles from './ProductsGrid.module.css';
import { product } from '../../interfaces/product';
import ProductsCard from '../ProductCard/ProductsCard';
import Skeleton from '../Skeleton/Skeleton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import Pages from './Pages/Pages';
import { clearProducts } from '../../redux/reducers/productsReducer';

const ProductsGrid: React.FC = (): JSX.Element => {
  const pendingProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const dispatch = useDispatch<AppDispatch>();

  const { title, products, productsLoading, currentPage, message } =
    useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage, title }));
  }, [dispatch, currentPage, title]);

  useEffect(() => {
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);

  return (
    <>
      {currentPage && <Pages />}
      {message && <ErrorMessage message={message} />}
      <div className={styles.container}>
        {productsLoading ? (
          <>
            {pendingProduct.map((e) => (
              <Skeleton key={e} />
            ))}
          </>
        ) : (
          <>
            {products?.map((p: product) => (
              <ProductsCard
                key={p._id}
                _id={p._id}
                image={p.image}
                title={p.title}
                price={p.price}
              />
            ))}
          </>
        )}
      </div>
      {currentPage && <Pages />}
    </>
  );
};

export default ProductsGrid;
