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
import { useForm } from 'react-hook-form';

interface productForm {
  title: string;
  price: string;
  description: string;
  categoryId: string;
  image: File | undefined;
}

const ProductForm: React.FC<{ type: 'create' | 'edit' }> = ({
  type
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams<{ id: string }>(); // Asegúrate de que id sea de tipo string

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<productForm>();

  const [showImage, setShowImage] = useState<string>(imgDefault);
  const [image, setImage] = useState<File | undefined>();

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
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('categoryId', product.category?._id);
    }
  }, [product, setValue]);

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
    setImage(selectedFile);
  };

  const onSubmit = async (data: productForm) => {
    const { title, price, description, categoryId } = data;
    type === 'create' &&
      dispatch(
        createProduct({
          image,
          title,
          price,
          description,
          categoryId
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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.edit}>
          <div className={styles.image}>
            <img
              src={!Object.keys(product).length ? showImage : product.image}
              alt={product.title}
            />
            <div className={styles.editImage}>
              <button>
                <FiEdit size={25} />
              </button>
              <input
                type='file'
                accept='image/*'
                style={errors.image && { borderColor: 'red' }}
                {...register('image', {
                  required: {
                    value: true,
                    message: 'Image is required'
                  }
                })}
                onChange={(ev) => {
                  handleFileChange(ev);
                }}
              />
              {errors.image && (
                <span className={styles.errors}>{errors.image.message}</span>
              )}
            </div>
          </div>
          <div className={styles.info}>
            <div style={{ flexDirection: 'column' }}>
              <textarea
                className={styles.title}
                style={errors.title && { borderColor: 'red' }}
                placeholder='Title'
                {...register('title', {
                  required: {
                    value: true,
                    message: 'Title is required'
                  }
                })}
              />
              {errors.title && (
                <span className={styles.errors}>{errors.title.message}</span>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className={styles.price}>
                $
                <input
                  type='text'
                  style={errors.price && { borderColor: 'red' }}
                  placeholder='0.00'
                  {...register('price', {
                    required: {
                      value: true,
                      message: 'Price is required'
                    },
                    pattern: {
                      value: /^\d*\.?\d*$/,
                      message: 'Enter a valid numerical value'
                    }
                  })}
                />
              </div>
              {errors.price && (
                <span className={styles.errors}>{errors.price.message}</span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={styles.category}>
                <h4>Category: </h4>
                <select
                  {...register('categoryId', {
                    required: {
                      value: true,
                      message: 'Category is required'
                    }
                  })}
                >
                  <option value={''}>None</option>
                  {categories?.map((e: category) => (
                    <option key={e._id} value={e._id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.categoryId && (
                <span className={styles.errors}>
                  {errors.categoryId.message}
                </span>
              )}
            </div>
            <textarea
              className={styles.description}
              style={errors.description && { borderColor: 'red' }}
              placeholder='Description'
              {...register('description', {
                required: {
                  value: true,
                  message: 'Description is required'
                }
              })}
            />
            {errors.description && (
              <span className={styles.errors}>
                {errors.description.message}
              </span>
            )}
            <div className={styles.editProduct}>
              <button type='submit'>
                {type === 'edit' ? 'Edit product' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ProductForm;
