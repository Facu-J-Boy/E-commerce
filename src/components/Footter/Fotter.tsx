import React from 'react';
import styles from './Footer.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

const Footter: React.FC = (): JSX.Element => {
  return (
    <div className={styles.footterContainer}>
      <div className={styles.iconZone}>
        <>
          <FaLinkedin size={30} style={{ cursor: 'pointer' }} />
        </>
        <>
          <FaGithub size={30} style={{ cursor: 'pointer' }} />
        </>
      </div>
    </div>
  );
};

export default Footter;
