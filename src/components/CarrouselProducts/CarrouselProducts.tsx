import React from 'react';
import { product } from '../../interfaces/product';
import ProductsCard from '../ProductCard/ProductsCard';
import styles from './CarrouselProducts.module.css';

interface props {
  products: product[];
  loading: boolean;
}

const CarrouselProducts: React.FC<props> = ({
  products,
  loading
}): JSX.Element => {
  return (
    <div className={styles.carrousel}>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div
          className={styles.products}
          style={{ width: `${products.length * 100}vh` }}
        >
          {products.map((p: product) => (
            <ProductsCard
              key={p.id}
              id={p.id}
              image={p.image}
              title={p.title}
              price={p.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarrouselProducts;
