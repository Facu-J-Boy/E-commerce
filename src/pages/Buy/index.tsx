import React, { useEffect, useState } from 'react';
import styles from './Buy.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import ProductItem from '../../components/NavBar/ProductItem/ProductItem';
import { product } from '../../interfaces/product';
import { clearProductState } from '../../redux/actions/clearProductState';
import { FaArrowLeftLong } from 'react-icons/fa6';

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

  console.log('items: ', items);

  useEffect(() => {
    id !== 'cart' && setItems([product]);
  }, [product, id]);

  useEffect(() => {
    if (id === 'cart') {
      setItems(cartProducts);
    } else {
      dispatch(getSingleProduct(id));
    }
    return () => {
      dispatch(clearProductState());
    };
  }, [dispatch, id, cartProducts]);

  return (
    <>
      {productLoading ? (
        <p>loading...</p>
      ) : (
        <div className={styles.container}>
          <div className={styles.leftZone}>
            <div className={styles.title}>
              <h1>Shopping Cart</h1>
              <h1>{`${items.length} items`}</h1>
            </div>
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
            <button>
              <FaArrowLeftLong style={{ marginRight: '10px' }} />
              Continue Shopping
            </button>
          </div>
          <div className={styles.rightZone}>
            <h4>Order Summary</h4>
            <div className={styles.form}>
              <h4>SHIPPING</h4>
              <input type='text' />
              <h4>PROMO CODE</h4>
              <input type='text' />
              <button>APPLY</button>
            </div>
            <div className={styles.total}>
              <h3>Total: </h3>
              <h3>{`$${id === 'cart' ? total : product.price}`}</h3>
            </div>
            <button>CHECKOUT</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Buy;
