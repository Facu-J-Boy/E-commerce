import React from 'react';
import { product } from '../../interfaces/product';
import styles from './CarrouselProducts.module.css';
import Product from './Product/Product';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import SkeletonCarrousel from '../SkeletonCarrousel/SkeletonCarrousel';

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
    <>
      <br />
      {loading ? (
        <SkeletonCarrousel />
      ) : !products.length ? null : (
        <div className={styles.container}>
          <div className={styles.buttons}>
            <button className={styles.carrouselButton} onClick={scrollLeft}>
              <MdArrowBackIosNew size={25} />
            </button>
            <button className={styles.carrouselButton} onClick={scrollRight}>
              <MdArrowForwardIos size={25} />
            </button>
          </div>
          <div className={styles.carrousel}>
            <div
              className={styles.products}
              style={{ width: `${products.length * 100}vh` }}
            >
              {products.map((p: product) => (
                <Product
                  key={p._id}
                  _id={p._id}
                  image={p.image}
                  title={p.title}
                  price={p.price}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <br />
    </>
  );
};

export default CarrouselProducts;
