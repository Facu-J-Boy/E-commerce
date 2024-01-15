import React from 'react';
import styles from './SkeletonBuy.module.css';

const SkeletonBuy: React.FC = (): JSX.Element => {
  return <div className={styles.skeleton}></div>;
};

export default SkeletonBuy;
