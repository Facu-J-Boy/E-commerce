import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import { clearProductState } from '../../redux/actions/clearProductState';
import { useParams } from 'react-router-dom';
import styles from './Edit.module.css';
import { FiEdit } from 'react-icons/fi';

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
  const [price, setPrice] = useState<number | string>('');

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = ev.target.value;

    // Validar que el valor ingresado es un número o está vacío
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setPrice(inputValue);
    } else {
      // Puedes manejar la lógica de error aquí, como mostrar un mensaje al usuario.
      console.error('Ingrese un valor numérico válido.');
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
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
            <div className={styles.editImage}>
              <button>
                <FiEdit size={25} />
              </button>
              <input
                type='file'
                onChange={(ev) => {
                  handleFileChange(ev);
                }}
              />
            </div>
          </div>

          <div className={styles.info}>
            <textarea
              className={styles.title}
              value={title}
              onChange={(ev) => {
                handleTitleChange(ev);
              }}
            />
            <div className={styles.price}>
              $
              <input
                type='text'
                value={price}
                onChange={(ev) => {
                  handlePriceChange(ev);
                }}
              />
            </div>
            <textarea
              className={styles.description}
              value={description}
              onChange={(ev) => {
                handleDescriptionChange(ev);
              }}
            />
            <button className={styles.editProduct}>Edit product</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
