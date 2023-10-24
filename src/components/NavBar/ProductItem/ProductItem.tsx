import React from 'react';
import { product } from '../../../interfaces/product';
import styles from './ProductItem.module.css';

const ProductItem: React.FC<product> = ({
  image,
  title,
  price
}): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.info}>
        <h5>{title}</h5>
        <h4>{`$${price}`}</h4>
      </div>
    </div>
  );
};

export default ProductItem;
