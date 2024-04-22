import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import { clearProductState } from '../../redux/actions/clearProductState';
import { useParams } from 'react-router-dom';
import styles from './ProductForm.module.css';
import { FiEdit } from 'react-icons/fi';
import SkeletonDetail from '../../components/SkeletonDetail/SkeletonDetail';
import { getAllcategory } from '../../redux/actions/getAllCategory';
import { category } from '../../interfaces/category';
import imgDefault from './Product default.svg';
import { createProduct } from '../../redux/actions/createProduct';
import Loader from '../Loader/Loader';

const ProductForm: React.FC<{ type: 'create' | 'edit' }> = ({
  type
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams<{ id: string }>(); // Asegúrate de que id sea de tipo string

  //   console.log('type: ', type);

  useEffect(() => {
    type === 'edit' && dispatch(getSingleProduct(id));
    dispatch(getAllcategory());
    return () => {
      dispatch(clearProductState());
    };
  }, [dispatch, id, type]);

  const { product, productLoading, creating } = useSelector(
    (state: any) => state.product
  );

  const { categories, categoriesLoading } = useSelector(
    (state: any) => state.categories
  );

  const [showImage, setShowImage] = useState<string>(imgDefault);
  const [image, setImage] = useState<File | undefined>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [priceError, setPriceError] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    document.title =
      type === 'edit'
        ? `Edit: ${product.title ? product.title : ''}`
        : 'Create product'; // Cambia el titulo de la web

    return () => {
      document.title = 'E-commerce'; // Al desmontar el componente el titulo vuelve a la normalidad
    };
  }, [product, type]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

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
    setImage(ev.target.files?.[0]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = ev.target.value;

    // Validar que el valor ingresado es un número o está vacío
    setPrice(inputValue);
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setPriceError(false);
    } else {
      // Puedes manejar la lógica de error aquí, como mostrar un mensaje al usuario.
      setPriceError(true);
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  // Manejar cambios en la selección
  const handleSelectChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handleButton = () => {
    type === 'create' &&
      dispatch(
        createProduct({
          image,
          title,
          price,
          description,
          categoryId: category
        })
      );
  };

  return (
    <>
      {creating && (
        <div className={styles.loading}>
          <Loader color='#fff' />
        </div>
      )}
      {productLoading && categoriesLoading ? (
        <SkeletonDetail />
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
              placeholder='Title'
              onChange={(ev) => {
                handleTitleChange(ev);
              }}
            />
            <div className={styles.price}>
              $
              <input
                type='text'
                value={price}
                placeholder='0.00'
                onChange={(ev) => {
                  handlePriceChange(ev);
                }}
              />
              {priceError && (
                <p style={{ color: 'red', fontSize: '20px' }}>
                  Enter a valid numerical value
                </p>
              )}
            </div>
            <div className={styles.category}>
              <h4>Category: </h4>
              <select
                value={category}
                onChange={(ev) => {
                  handleSelectChange(ev);
                }}
              >
                {categories?.map((e: category) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              className={styles.description}
              value={description}
              placeholder='Description'
              onChange={(ev) => {
                handleDescriptionChange(ev);
              }}
            />
            <div className={styles.editProduct}>
              <button onClick={handleButton}>
                {type === 'edit' ? 'Edit product' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;
