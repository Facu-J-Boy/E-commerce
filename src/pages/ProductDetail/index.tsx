import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import { AppDispatch } from '../../redux/store';
import { clearProductState } from '../../redux/actions/clearProductState';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import SkeletonDetail from '../../components/SkeletonDetail/SkeletonDetail';
import { getComments } from '../../redux/actions/getComments';

const ProductDetail: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { product, productLoading } = useSelector(
    (state: any) => state.product
  );

  const { comments, commentsLoading } = useSelector(
    (state: any) => state.comments
  );

  const { id } = useParams();

  useEffect(() => {
    document.title = `${product.title ? product.title : document.title}`; // Cambia el titulo de la web por el titulo del producto

    return () => {
      document.title = 'E-commerce'; // Al desmontar el componente el titulo vuelve a la normalidad
    };
  }, [product]);

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getComments(id));
    return () => {
      dispatch(clearProductState());
    };
  }, [dispatch, id]);

  return (
    <div>
      {productLoading ? (
        <>
          <SkeletonDetail />
        </>
      ) : (
        <div>
          <SingleProduct
            image={product.image}
            title={product.title}
            id={product.id}
            price={product.price}
            description={product.description}
            category={''}
            rating={{
              rate: product.rating?.rate,
              count: product.rating?.count
            }}
          />
        </div>
      )}
      {commentsLoading ? <>loading...</> : <>comments</>}
    </div>
  );
};

export default ProductDetail;
