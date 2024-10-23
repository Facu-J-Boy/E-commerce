import React, { useCallback, useEffect, useRef } from 'react';
import styles from './ToggleCreateCategory.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { createCategory } from '../../../redux/actions/createCategory';

interface categoryForm {
  name: string;
}

const ToggleCreateCatgory = ({ onClose }: { onClose: () => void }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<categoryForm>();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose(); // Cierra el toggle si el clic fue fuera del componente
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleCreateCategory = async (data: categoryForm) => {
    const { name } = data;
    dispatch(createCategory(name));
    onClose();
  };

  return (
    <div className={styles.body}>
      <div ref={containerRef} className={styles.toggle_create_cetagory}>
        <form onSubmit={handleSubmit(handleCreateCategory)}>
          <input
            type='text'
            placeholder='Add category'
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required'
              }
            })}
          />
          <button type='submit'>Add</button>
        </form>
        {errors.name ? (
          <span className={styles.errors}>{errors.name.message}</span>
        ) : (
          <br />
        )}
      </div>
    </div>
  );
};

export default ToggleCreateCatgory;
