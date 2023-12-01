import React from 'react';
import { product } from '../../../interfaces/product';
import styles from './ProductItem.module.css';
import { BsFillCartXFill } from 'react-icons/bs';
import { deleteToTheCart } from '../../../redux/actions/deleteToTheCart';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { getCart } from '../../../redux/actions/getCart';
import { useNavigate } from 'react-router-dom';

const ProductItem: React.FC<product> = ({
  id,
  image,
  title,
  price
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleDeleteToTheCart = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Evitar la propagación del evento de click
    deleteToTheCart(id);
    dispatch(getCart());
    return false; // Evitar la propagación del evento de click
  };

  const handleNavigate = () => {
    navigate(`/product/${id}`);
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
      <button onClick={handleDeleteToTheCart}>
        <BsFillCartXFill size={25} />
      </button>
    </div>
  );
};

export default ProductItem;
