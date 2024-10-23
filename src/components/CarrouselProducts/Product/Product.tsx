import React, { useEffect, useState } from 'react';
import styles from './Product.module.css';
import { useNavigate } from 'react-router-dom';
import { GrCart } from 'react-icons/gr';
import { BsFillCartXFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterface } from '../../../redux/store';
import { product } from '../../../interfaces/product';
import { addToCart } from '../../../redux/actions/addToCart';
import { deleteToTheCart } from '../../../redux/actions/deleteToTheCart';

export interface ProductCardProps {
  _id: string;
  image: string;
  title: string;
  price: number;
}

const Product: React.FC<ProductCardProps> = ({ _id, image, title, price }) => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/product/${_id}`);
  };

  const { User } = useSelector((state: storeInterface) => state.user);

  const { cartProducts, adding } = useSelector(
    (state: storeInterface) => state.cartProducts
  );

  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    !adding && setDisableButton(adding);
  }, [adding]);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Evitar la propagación del evento de clic
    setDisableButton(true);
    dispatch(addToCart({ userId: User?._id, productId: _id }));
    return false; // Evitar la propagación del evento de clic
  };

  const handleDeleteToTheCart = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Evitar la propagación del evento de clic
    dispatch(deleteToTheCart({ userId: User?._id, productId: _id }));
    return false; // Evitar la propagación del evento de clic
  };

  const [inCart, setInCart] = useState(false);

  const productId = _id;

  useEffect(() => {
    setInCart(cartProducts.some((p: product) => p._id === productId)); // Comprueba si el producto ya se encuentra en el carrito mediante su id
  }, [cartProducts, productId]);

  const redirectToBuy = () => {
    navigate(`/buy/${_id}`);
  };

  return (
    <div className={styles.product} onClick={handleRedirect}>
      <div className={styles.imageContainer}>
        <button
          className={styles.cart_icon}
          disabled={disableButton}
          onClick={!inCart ? handleAddToCart : handleDeleteToTheCart}
        >
          {!inCart ? <GrCart size={25} /> : <BsFillCartXFill size={25} />}
        </button>
        <img src={image} alt={title} />
      </div>
      <h1>{`$${price}`}</h1>
      <span>{title}</span>
      <button
        className={styles.button}
        onClick={(event) => {
          event.stopPropagation();
          redirectToBuy();
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default Product;
