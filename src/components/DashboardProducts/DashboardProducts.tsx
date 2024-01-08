import React from 'react';
import { ProductCardProps } from '../ProductCard/ProductsCard';
import styles from './DashboardProducts.module.css';
import { BiSolidPencil } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const DashboardProducts: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price
}): JSX.Element => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/product/${id}`);
  };

  const editRedirect = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className={styles.content}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center'
        }}
        onClick={handleRedirect}
      >
        <div className={styles.imageContainer}>
          <img src={image} alt={title} />
        </div>
        <h3>{title}</h3>
        <h2>{`$${price}`}</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <button className={styles.icon} onClick={editRedirect}>
            <BiSolidPencil size={25} style={{ margin: '0px 10px' }} />
          </button>
        </div>
        <div className={styles.icon}>
          <BsFillTrashFill size={25} style={{ margin: '0px 10px' }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardProducts;
