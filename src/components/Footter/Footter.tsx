import React from 'react';
import styles from './Footer.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

const Footter: React.FC = (): JSX.Element => {
  const handleClick = (link: string) => {
    window.open(link, '_blank');
  };
  return (
    <div className={styles.footterContainer}>
      <div className={styles.iconZone}>
        <>
          <FaLinkedin
            size={30}
            onClick={() =>
              handleClick('https://www.linkedin.com/in/facundo-boy-b7a368248/')
            }
            style={{ cursor: 'pointer' }}
          />
        </>
        <>
          <FaGithub
            size={30}
            onClick={() => handleClick('https://github.com/Facu-J-Boy')}
            style={{ cursor: 'pointer' }}
          />
        </>
      </div>
    </div>
  );
};

export default Footter;
