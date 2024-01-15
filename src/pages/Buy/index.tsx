import React, { useEffect, useState } from 'react';
import styles from './Buy.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import ProductItem from '../../components/NavBar/ProductItem/ProductItem';
import { product } from '../../interfaces/product';

const Buy: React.FC = (): JSX.Element => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { cartProducts, total } = useSelector(
    (state: any) => state.cartProducts
  );

  const { product, productLoading } = useSelector(
    (state: any) => state.product
  );

  const [items, setItems] = useState<product[]>([]);

  useEffect(() => {
    if (id === 'cart') {
      product && setItems(cartProducts);
    } else {
      dispatch(getSingleProduct(id));
      product && setItems([product]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, cartProducts]);

  return (
    <div className={styles.container}>
      {productLoading ? (
        <p>loading...</p>
      ) : (
        <ul className={styles.productList}>
          {items.map((element: any) => (
            <ol>
              <ProductItem
                id={element.id}
                title={element.title}
                price={element.price}
                image={element.image}
              />
            </ol>
          ))}
        </ul>
      )}
      <div className={styles.form}>
        <h1>{`${items.length} items`}</h1>
      </div>
    </div>
  );
};

export default Buy;
