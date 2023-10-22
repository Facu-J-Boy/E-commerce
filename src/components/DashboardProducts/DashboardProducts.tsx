import React from 'react';
import { ProductCardProps } from '../ProductCard/ProductsCard';
import styles from './DashboardProducts.module.css';
import { BiSolidPencil } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';

const DashboardProducts: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price
}): JSX.Element => {
  return (
    <div className={styles.content}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <h3>{title}</h3>
      <h2>{`$${price}`}</h2>
      <div style={{ display: 'flex' }}>
        <div className={styles.icon}>
          <BiSolidPencil size={25} style={{ margin: '0px 10px' }} />
        </div>
        <div className={styles.icon}>
          <BsFillTrashFill size={25} style={{ margin: '0px 10px' }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardProducts;
