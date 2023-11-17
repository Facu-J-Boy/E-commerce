import React from 'react';
import { productsState } from '../../redux/reducers/productsReducer';
import styles from './ProductsGrid.module.css';
import { product } from '../../interfaces/product';
import ProductsCard from '../ProductCard/ProductsCard';
import Skeleton from '../Skeleton/Skeleton';

const ProductsGrid: React.FC<productsState> = ({
  products,
  productsLoading
}): JSX.Element => {
  const pendingProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
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
  );
};

export default ProductsGrid;
