import React, { useEffect, useState } from 'react';
import { product } from '../../interfaces/product';
import styles from './SingleProduct.module.css';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addToCart } from '../../redux/actions/addToCart';
import { getCart } from '../../redux/actions/getCart';
import { deleteToTheCart } from '../../redux/actions/deleteToTheCart';
import { useNavigate } from 'react-router-dom';

const SingleProduct: React.FC<product> = ({
  _id,
  image,
  title,
  price,
  rating,
  description
}): JSX.Element => {
  let totalRating = 0;

  if (rating && typeof rating.rate === 'number') {
    totalRating = Math.floor(rating.rate);
  }

  // Generar un array de estrellas marcadas y desmarcadas
  const stars = Array.from({ length: 5 }, (_, index) =>
    index < totalRating ? (
      <AiFillStar key={index} size={25} style={{ color: 'orange' }} />
    ) : (
      <AiOutlineStar key={index} size={25} style={{ color: 'orange' }} />
    )
  );

  const product = {
    _id: _id,
    image: image,
    title: title,
    price: price
  };

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

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
    deleteToTheCart(product._id);
    dispatch(getCart());
    return false; // Evitar la propagación del evento de clic
  };

  const [inCart, setInCart] = useState(false);

  const { cartProducts } = useSelector((state: any) => state.cartProducts);

  const productId = _id;

  useEffect(() => {
    setInCart(cartProducts.some((p: product) => p._id === productId)); // Comprueba si el producto ya se encuentra en el carrito mediante su id
  }, [cartProducts, productId]);

  const redirectToBuy = () => {
    // dispatch(Buy('single'));
    navigate(`/buy/${_id}`);
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.productInfo}>
        <h1>{title}</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div style={{ marginRight: 10 }}>{stars}</div>
          <h4>
            {rating
              ? `${rating.rate} (${rating.count} reviews)`
              : 'Rating is not available'}
          </h4>
        </div>
        <h2>{`$${price}`}</h2>
        <p>{description}</p>
        <div className={styles.buttonZone}>
          <button
            style={{
              color: '#333',
              border: 'solid 1px #333',
              alignItems: 'center',
              justifyContent: 'spaceBetween'
            }}
            onClick={!inCart ? handleAddToCart : handleDeleteToTheCart}
          >
            {!inCart ? 'Add to cart' : 'Remove from cart'}
          </button>
          <button
            style={{ backgroundColor: '#333', color: 'white', border: 'none' }}
            onClick={redirectToBuy}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
