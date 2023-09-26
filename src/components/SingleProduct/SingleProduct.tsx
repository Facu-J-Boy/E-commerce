import React from 'react';
import { product } from '../../interfaces/product';
import styles from './SingleProduct.module.css';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { GrCart } from 'react-icons/gr';

const SingleProduct: React.FC<product> = ({
  image,
  title,
  price,
  rating,
  description
}): JSX.Element => {
  const totalRating = Math.floor(rating.rate);

  // Generar un array de estrellas marcadas y desmarcadas
  const stars = Array.from({ length: 5 }, (_, index) =>
    index < totalRating ? (
      <AiFillStar key={index} size={25} style={{ color: 'orange' }} />
    ) : (
      <AiOutlineStar key={index} size={25} style={{ color: 'orange' }} />
    )
  );

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
          <h4>{`${rating.rate} (${rating.count} reviews)`}</h4>
        </div>
        <h2>{`$${price}`}</h2>
        <p>{description}</p>
        <div className={styles.buttonZone}>
          <button style={{ color: '#333', border: 'solid 1px #333' }}>
            Add to cart
            <GrCart style={{ marginLeft: 10 }} />
          </button>
          <button
            style={{ backgroundColor: '#333', color: 'white', border: 'none' }}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
