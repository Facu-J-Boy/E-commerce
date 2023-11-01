import React from 'react';
import { product } from '../../interfaces/product';
import styles from './CarrouselProducts.module.css';
import Product from './Product/Product';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

interface props {
  products: product[];
  loading: boolean;
}

const CarrouselProducts: React.FC<props> = ({
  products,
  loading
}): JSX.Element => {
  const scrollAmount = 800; // Cantidad de píxeles para desplazar

  const scrollLeft = () => {
    const carrousel = document.querySelector(`.${styles.carrousel}`);
    if (carrousel) {
      carrousel.scrollBy({
        top: 0,
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    const carrousel = document.querySelector(`.${styles.carrousel}`);
    if (carrousel) {
      carrousel.scrollBy({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className={styles.container}>
      <button className={styles.carrouselButton} onClick={scrollLeft}>
        <MdArrowBackIosNew size={25} />
      </button>
      <div className={styles.carrousel}>
        {loading ? (
          <p>loading...</p>
        ) : (
          <div
            className={styles.products}
            style={{ width: `${products.length * 100}vh` }}
          >
            {products.map((p: product) => (
              <Product
                key={p.id}
                id={p.id}
                image={p.image}
                title={p.title}
                price={p.price}
              />
            ))}
          </div>
        )}
      </div>
      <button className={styles.carrouselButton} onClick={scrollRight}>
        <MdArrowForwardIos size={25} />
      </button>
    </div>
  );
};

export default CarrouselProducts;
