import React from 'react';
import styles from './Carousel.module.css';
import image1 from './Images/carouselImage_1.jpg';
import image2 from './Images/carouselImage_2.jpg';
import image3 from './Images/carouselimage_3.jpg';
import image4 from './Images/carouselImage_4.jpg';

const Carousel: React.FC = (): JSX.Element => {
  const images = [image1, image2, image3, image4];

  return (
    <div className={styles.slider_box}>
      <ul>
        {images.map((image, index) => (
          <li key={index}>
            <img src={image} alt='...' />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
