import React, { useEffect, useRef, useState } from 'react';
import styles from './Categories.module.css';
import { BiSolidPencil } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../redux/actions/deleteCategory';
import { AppDispatch } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { editCategory } from '../../redux/actions/editCategory';

interface categorieForm {
  name: string;
}

const Categories: React.FC<{ _id: string; name: string }> = ({
  _id,
  name
}): JSX.Element => {
  const componentRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<categorieForm>();

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (name || !edit) && setValue('name', name);
  }, [setValue, name, edit]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        // Si se hace clic fuera del componente, se ejecuta onClose
        setEdit(false);
      }
    };
    // Agregar el evento de clic al documento
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteCategory = (id: string) => {
    id && dispatch(deleteCategory(id));
  };

  const handleEditCategory = async (data: categorieForm) => {
    const { name } = data;
    dispatch(editCategory({ id: _id, name }));
  };

  return (
    <div ref={componentRef} className={styles.container}>
      <form
        onSubmit={handleSubmit(handleEditCategory)}
        className={styles.category_form}
      >
        <div>
          <input
            style={{ border: !edit ? 'none' : 'solid 1px', background: 'none' }}
            type='text'
            readOnly={!edit}
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required'
              }
            })}
          />
          {edit && (
            <button type='submit' className={styles.submit_button}>
              Edit
            </button>
          )}
        </div>
        {errors.name && edit ? (
          <span className={styles.errors}>{errors.name.message}</span>
        ) : (
          <br />
        )}
      </form>
      <div style={{ display: 'flex' }}>
        <button
          className={styles.icon_button}
          onClick={() => {
            setEdit(!edit);
          }}
        >
          <BiSolidPencil style={{ margin: '0px 10px' }} />
        </button>
        <button
          className={styles.icon_button}
          onClick={() => {
            handleDeleteCategory(_id);
          }}
        >
          <BsFillTrashFill style={{ margin: '0px 10px' }} />
        </button>
      </div>
    </div>
  );
};

export default Categories;
