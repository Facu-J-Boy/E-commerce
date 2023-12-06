import React from 'react';
import { productsState } from '../../redux/reducers/productsReducer';
import styles from './ProductsGrid.module.css';
import { product } from '../../interfaces/product';
import ProductsCard from '../ProductCard/ProductsCard';
import Skeleton from '../Skeleton/Skeleton';
import { MdErrorOutline } from 'react-icons/md';

const ProductsGrid: React.FC<productsState> = ({
  products,
  productsLoading,
  productsError
}): JSX.Element => {
  const pendingProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      {productsError?.type === 'search' ? (
        <div className={styles.searchError}>
          <p>{productsError.text}</p>
        </div>
      ) : productsError?.type === 'fetch' ? (
        <div className={styles.errorMessage}>
          <div className={styles.icon}>
            <MdErrorOutline />
          </div>
          <h1>{productsError.text}</h1>
        </div>
      ) : null}
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
    </>
  );
};

export default ProductsGrid;
