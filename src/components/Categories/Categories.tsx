import React from 'react';
import styles from './Categories.module.css';
import { BiSolidPencil } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../redux/actions/deleteCategory';
import { AppDispatch } from '../../redux/store';

const Categories: React.FC<{ _id: string; name: string }> = ({
  _id,
  name
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteCategory = (id: string) => {
    id && dispatch(deleteCategory(id));
  };

  return (
    <div className={styles.container}>
      <h4>{name}</h4>
      <div style={{ display: 'flex' }}>
        <div className={styles.icon}>
          <BiSolidPencil size={25} style={{ margin: '0px 10px' }} />
        </div>
        <button
          className={styles.icon}
          onClick={() => {
            handleDeleteCategory(_id);
          }}
        >
          <BsFillTrashFill size={25} style={{ margin: '0px 10px' }} />
        </button>
      </div>
    </div>
  );
};

export default Categories;
