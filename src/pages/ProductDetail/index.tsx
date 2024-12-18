import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import { AppDispatch, storeInterface } from '../../redux/store';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import SkeletonDetail from '../../components/SkeletonDetail/SkeletonDetail';
import CommentsColumn from '../../components/CommentsColumn/CommentsColumn';
import styles from './Detail.module.css';
import { getInCategory } from '../../redux/actions/getInCategory';
import CarrouselProducts from '../../components/CarrouselProducts/CarrouselProducts';
import { addToHistory } from '../../redux/actions/addToHistory';
import { clearProduct } from '../../redux/reducers/singleProductReducer';
import { product } from '../../interfaces/product';

const ProductDetail: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { product, productLoading } = useSelector(
    (state: storeInterface) => state.product
  );

  const { productsByCategory, productsByCategoryLoading } = useSelector(
    (state: storeInterface) => state.productsByCategory
  );

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    document.title = `${product ? product.title : document.title}`; // Cambia el titulo de la web por el titulo del producto

    return () => {
      document.title = 'E-commerce'; // Al desmontar el componente el titulo vuelve a la normalidad
    };
  }, [product]);

  useEffect(() => {
    product && addToHistory(product);
  }, [product]);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    product && dispatch(getInCategory(product?.category?._id));
  }, [dispatch, product]);

  return (
    <div className={styles.container}>
      {productLoading || !product ? (
        <>
          <SkeletonDetail />
        </>
      ) : (
        <>
          <SingleProduct
            _id={product?._id}
            image={product?.image}
            title={product?.title}
            price={product?.price}
            rating={product?.rating}
            description={product?.description}
          />
        </>
      )}
      <CommentsColumn />
      {productsByCategory.length === 0 ? null : (
        <h1 style={{ color: '#333', marginLeft: '10px' }}>Similar products</h1>
      )}
      <CarrouselProducts
        products={productsByCategory.filter((p: product) => p._id !== id)}
        loading={productsByCategoryLoading}
      />
    </div>
  );
};

export default ProductDetail;
