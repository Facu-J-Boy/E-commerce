import React from 'react';
import { product } from '../../../interfaces/product';
import styles from './ProductItem.module.css';
import { BsFillCartXFill } from 'react-icons/bs';
import { deleteToTheCart } from '../../../redux/actions/deleteToTheCart';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductItem: React.FC<product> = ({
  _id,
  image,
  title,
  price
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { User } = useSelector((state: any) => state.user);

  const handleDeleteToTheCart = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Evitar la propagación del evento de click
    dispatch(deleteToTheCart({ userId: User._id, productId: _id }));
    return false; // Evitar la propagación del evento de click
  };

  const location = useLocation();

  const handleNavigate = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div className={styles.container} onClick={handleNavigate}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.info}>
        <h5>{title}</h5>
        <h4>{`$${price}`}</h4>
      </div>
      {!location.pathname.includes('/buy') && (
        <button onClick={handleDeleteToTheCart}>
          <BsFillCartXFill size={25} />
        </button>
      )}
    </div>
  );
};

export default ProductItem;
