import React, { useEffect, useState } from 'react';
import { product } from '../../interfaces/product';
import styles from './SingleProduct.module.css';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addToCart } from '../../redux/actions/addToCart';
import { deleteToTheCart } from '../../redux/actions/deleteToTheCart';
import { useNavigate } from 'react-router-dom';
import LoaderMini from '../LoaderMini/LoaderMini';

const SingleProduct: React.FC<product> = ({
  _id,
  image,
  title,
  price,
  rating,
  description
}): JSX.Element => {
  const { totalCount, commentsLoading } = useSelector(
    (state: any) => state.comments
  );

  const { cartProducts, adding } = useSelector(
    (state: any) => state.cartProducts
  );

  const { User } = useSelector((state: any) => state.user);

  useEffect(() => {
    !adding && setDisableButton(adding);
  }, [adding]);

  let totalRating = 0;

  if (rating && typeof rating === 'number') {
    totalRating = Math.floor(rating);
  }

  // Generar un array de estrellas marcadas y desmarcadas
  const stars = Array.from({ length: 5 }, (_, index) =>
    index < totalRating ? (
      <AiFillStar key={index} size={25} style={{ color: 'orange' }} />
    ) : (
      <AiOutlineStar key={index} size={25} style={{ color: 'orange' }} />
    )
  );

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(false);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Evitar la propagación del evento de clic
    setDisableButton(true);
    dispatch(addToCart({ userId: User._id, productId: _id }));
    return false; // Evitar la propagación del evento de clic
  };

  const handleDeleteToTheCart = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Evitar la propagación del evento de clic
    dispatch(deleteToTheCart({ userId: User._id, productId: _id }));
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
              ? `${rating} ${!commentsLoading && `(${totalCount} reviews)`}`
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
            disabled={disableButton}
            onClick={!inCart ? handleAddToCart : handleDeleteToTheCart}
          >
            {adding && <LoaderMini color='#333' />}
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
