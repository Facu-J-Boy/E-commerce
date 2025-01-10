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
import { useSearchParams } from 'react-router-dom';

const ProductsGrid: React.FC = (): JSX.Element => {
  const pendingProduct = Array.from({ length: 15 }, (_, index) => index);

  const dispatch = useDispatch<AppDispatch>();

  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') ?? '';

  const { title, products, currentPage, productsLoading, message } =
    useSelector((state: storeInterface) => state.products);

  useEffect(() => {
    (page !== currentPage || search !== title) &&
      dispatch(getAllProducts({ page, title: search }));
  }, [dispatch, page, currentPage, search, title]);

  return (
    <>
      <Pages />
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
      <Pages />
    </>
  );
};

export default ProductsGrid;
