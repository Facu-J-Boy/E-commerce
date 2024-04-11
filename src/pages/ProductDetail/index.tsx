import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import { AppDispatch } from '../../redux/store';
import { clearProductState } from '../../redux/actions/clearProductState';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import SkeletonDetail from '../../components/SkeletonDetail/SkeletonDetail';
import CommentsColumn from '../../components/CommentsColumn/CommentsColumn';
import styles from './Detail.module.css';
// import { getInCategory } from '../../redux/actions/getInCategory';
// import CarrouselProducts from '../../components/CarrouselProducts/CarrouselProducts';
import { addToHistory } from '../../redux/actions/addToHistory';

const ProductDetail: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { product, productLoading } = useSelector(
    (state: any) => state.product
  );

  // const { productsByCategory, productsByCategoryLoading } = useSelector(
  //   (state: any) => state.productsByCategory
  // );

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = `${product.title ? product.title : document.title}`; // Cambia el titulo de la web por el titulo del producto

    return () => {
      document.title = 'E-commerce'; // Al desmontar el componente el titulo vuelve a la normalidad
    };
  }, [product]);

  useEffect(() => {
    product && addToHistory(product);
  }, [product]);

  useEffect(() => {
    dispatch(getSingleProduct(id));
    return () => {
      dispatch(clearProductState());
    };
  }, [dispatch, id]);

  // useEffect(() => {
  //   product && dispatch(getInCategory({ category: product.category, id: id }));
  // }, [dispatch, product, id]);

  return (
    <div className={styles.container}>
      {productLoading ? (
        <>
          <SkeletonDetail />
        </>
      ) : (
        <>
          <SingleProduct
            image={product.image}
            title={product.title}
            _id={product._id}
            price={product.price}
            description={product.description}
            category={''}
            rating={product.rating}
          />
        </>
      )}
      <CommentsColumn />
      {/* <h1>Similar products</h1>
      <CarrouselProducts
        products={productsByCategory}
        loading={productsByCategoryLoading}
      /> */}
    </div>
  );
};

export default ProductDetail;
