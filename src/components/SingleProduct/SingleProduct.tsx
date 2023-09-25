import React from 'react';
import { product } from '../../interfaces/product';
import styles from './SingleProduct.module.css';

const SingleProduct: React.FC<product> = ({
  image,
  title,
  price,
  rating
}): JSX.Element => {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.productInfo}>
        <h1>{title}</h1>
        <h4>{`${rating.rate}(${rating.count} reviews)`}</h4>
        <h2>{`$${price}`}</h2>
      </div>
    </div>
  );
};

export default SingleProduct;
