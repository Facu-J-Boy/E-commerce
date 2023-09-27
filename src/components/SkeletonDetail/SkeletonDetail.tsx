import React from 'react';
import styles from './skeletonDetail.module.css';

const SkeletonDetail: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.imageSkeleton}></div>
      <div className={styles.info}>
        <h1 className={styles.titleSkeleton}> </h1>
        <h4 className={styles.ratingSkeleton}> </h4>
        <h2 className={styles.priceSkeleton}> </h2>
        <p className={styles.descriptionSkeleton}></p>
      </div>
    </div>
  );
};

export default SkeletonDetail;
