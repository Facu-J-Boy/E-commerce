import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import { AppDispatch } from '../../redux/store';
import { clearProductState } from '../../redux/actions/clearProductState';
import SingleProduct from '../../components/SingleProduct/SingleProduct';

const ProductDetail: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { product, loading } = useSelector((state: any) => state.product);

  const { id } = useParams();

  useEffect(() => {
    document.title = `${product.title ? product.title : document.title}`; // Cambia el titulo de la web por el titulo del producto

    return () => {
      document.title = 'E-commerce'; // Al desmontar el componente el titulo vuelve a la normalidad
    };
  }, [product]);

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
          <SingleProduct
            image={product.image}
            title={product.title}
            id={0}
            price={0}
            description={''}
            category={''}
            rating={{
              rate: 0,
              count: 0
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
