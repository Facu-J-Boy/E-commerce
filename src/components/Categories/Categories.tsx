import React from 'react';
import styles from './Categories.module.css';
import { BiSolidPencil } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';

interface prop {
  categorie: string;
}

const Categories: React.FC<prop> = ({ categorie }): JSX.Element => {
  return (
    <div className={styles.container}>
      <h4>{categorie}</h4>
      <div style={{ display: 'flex' }}>
        <div className={styles.icon}>
          <BiSolidPencil size={25} style={{ margin: '0px 10px' }} />
        </div>
        <div className={styles.icon}>
          <BsFillTrashFill size={25} style={{ margin: '0px 10px' }} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
