import React from 'react';
import styles from './DashboardProducts.module.css';
import { BiSolidPencil } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { product } from '../../interfaces/product';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deleteProduct } from '../../redux/actions/deleteProduct';

const DashboardProducts: React.FC<product> = ({
  _id,
  image,
  title,
  price
}): JSX.Element => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleRedirect = () => {
    navigate(`/product/${_id}`);
  };

  const editRedirect = () => {
    navigate(`/edit/${_id}`);
  };

  const handleDeleting = (id: string) => {
    dispatch(deleteProduct(id));
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
        <div className={styles.info}>
          <h3>{title}</h3>
          <h2>{`$${price}`}</h2>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <button className={styles.icon} onClick={editRedirect}>
          <BiSolidPencil style={{ margin: '0px 10px' }} />
        </button>
        <button
          className={styles.icon}
          onClick={() => {
            handleDeleting(_id);
          }}
        >
          <BsFillTrashFill style={{ margin: '0px 10px' }} />
        </button>
      </div>
    </div>
  );
};

export default DashboardProducts;
