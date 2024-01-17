import React from 'react';
import { productsState } from '../../redux/reducers/productsReducer';
import styles from './ProductsGrid.module.css';
import { product } from '../../interfaces/product';
import ProductsCard from '../ProductCard/ProductsCard';
import Skeleton from '../Skeleton/Skeleton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ProductsGrid: React.FC<productsState> = ({
  products,
  productsLoading,
  productsError
}): JSX.Element => {
  const pendingProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      {productsError && (
        <ErrorMessage type={productsError.type} message={productsError.text} />
      )}
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
