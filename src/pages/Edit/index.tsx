import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import { clearProductState } from '../../redux/actions/clearProductState';
import { useParams } from 'react-router-dom';
import styles from './Edit.module.css';

interface Product {
  // Define los tipos para el producto
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  // Otros campos si los hay
}

const Edit: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams<{ id: string }>(); // Asegúrate de que id sea de tipo string

  useEffect(() => {
    dispatch(getSingleProduct(id));
    return () => {
      dispatch(clearProductState());
    };
  }, [dispatch, id]);

  const { product, productLoading } = useSelector(
    (state: { product: { product: Product; productLoading: boolean } }) =>
      state.product
  );

  const [showImage, setShowImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const adjustTextareaHeight = (id: string) => {
    const textarea = document.getElementById(id);
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      adjustTextareaHeight('title');
      adjustTextareaHeight('description');
    }
  }, [product]);

  console.log('title: ', title);

  const setFileToBase = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setShowImage(reader.result as string);
      };
    }
  };

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = ev.target.files?.[0];
    setFileToBase(selectedFile);
  };

  const updateTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
    updateTextareaHeight(event.target);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
    updateTextareaHeight(event.target);
  };

  return (
    <>
      {productLoading ? (
        <p>loading...</p>
      ) : (
        <div className={styles.edit}>
          <div className={styles.image}>
            <img
              src={!showImage ? product.image : showImage}
              alt={product.title}
            />
          </div>
          <input
            type='file'
            onChange={(ev) => {
              handleFileChange(ev);
            }}
          />
          <div className={styles.info}>
            <textarea
              id='title'
              style={{ height: 'auto' }}
              className={styles.title}
              value={title}
              onChange={(ev) => {
                handleTitleChange(ev);
              }}
            />
            <input type='number' value={product.price} />
            <textarea
              id='description'
              className={styles.description}
              value={description}
              onChange={(ev) => {
                handleDescriptionChange(ev);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
