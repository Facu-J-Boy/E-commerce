import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import { AppDispatch } from '../../redux/store';
import { clearProductState } from '../../redux/actions/clearProductState';

const ProductDetail: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { product, loading } = useSelector((state: any) => state.product);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
    return () => {
      dispatch(clearProductState());
    };
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <>Loading...</>
      ) : (
        <div>
          <img src={product.image} alt={product.title} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
