import React from 'react';
import { product } from '../../interfaces/product';
import ProductsCard from '../ProductCard/ProductsCard';
import styles from './CarrouselProducts.module.css';

const CarrouselProducts: React.FC<product[]> = (products): JSX.Element => {
  return (
    <div className={styles.carrousel}>
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
  );
};

export default CarrouselProducts;
