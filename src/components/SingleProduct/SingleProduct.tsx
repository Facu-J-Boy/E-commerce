import React from 'react';
import { product } from '../../interfaces/product';

const SingleProduct: React.FC<product> = ({ image, title }): JSX.Element => {
  return (
    <div>
      <img src={image} alt={title} />
    </div>
  );
};

export default SingleProduct;
