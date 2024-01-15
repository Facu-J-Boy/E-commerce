import React, { useEffect, useState } from 'react';
import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router-dom';
import { GrCart } from 'react-icons/gr';
import { BsFillCartXFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getCart } from '../../redux/actions/getCart';
import { product } from '../../interfaces/product';
import { addToCart } from '../../redux/actions/addToCart';
import { deleteToTheCart } from '../../redux/actions/deleteToTheCart';

export interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
}

const ProductsCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price
}) => {
  const product = {
    id: id,
    image: image,
    title: title,
    price: price
  };

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Evitar la propagación del evento de clic
    addToCart(product);
    dispatch(getCart());
    return false; // Evitar la propagación del evento de clic
  };

  const handleDeleteToTheCart = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Evitar la propagación del evento de clic
    deleteToTheCart(product.id);
    dispatch(getCart());
    return false; // Evitar la propagación del evento de clic
  };

  const [inCart, setInCart] = useState(false);

  const { cartProducts } = useSelector((state: any) => state.cartProducts);

  const productId = id;

  useEffect(() => {
    setInCart(cartProducts.some((p: product) => p.id === productId)); // Comprueba si el producto ya se encuentra en el carrito mediante su id
  }, [cartProducts, productId]);

  const redirectToBuy = () => {
    // dispatch(Buy('single'));
    navigate(`/buy/${productId}`);
  };

  return (
    <div className={styles.product} onClick={handleRedirect}>
      <div className={styles.imageContainer}>
        <button
          className={styles.cart_icon}
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

export default ProductsCard;
