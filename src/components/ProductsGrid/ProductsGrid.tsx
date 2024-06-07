import React, { useEffect } from 'react';
import styles from './ProductsGrid.module.css';
import { product } from '../../interfaces/product';
import ProductsCard from '../ProductCard/ProductsCard';
import Skeleton from '../Skeleton/Skeleton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterface } from '../../redux/store';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import Pages from './Pages/Pages';
import { clearProducts } from '../../redux/reducers/productsReducer';

const ProductsGrid: React.FC = (): JSX.Element => {
  const pendingProduct = Array.from({ length: 15 }, (_, index) => index);

  const dispatch = useDispatch<AppDispatch>();

  const { title, products, productsLoading, currentPage, message } =
    useSelector((state: storeInterface) => state.products);

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
      {products.length && <Pages />}
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
      {products.length && <Pages />}
    </>
  );
};

export default ProductsGrid;
