import React from 'react';
import styles from './Skeletons.module.css';

const Skeleton: React.FC = (): JSX.Element => {
  return <div className={styles.skeleton}></div>;
};

export default Skeleton;
