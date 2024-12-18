import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductItem from '../ProductItem/ProductItem';
import { product } from '../../../interfaces/product';
import styles from './Cart.module.css';
import { GrCart } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { storeInterface } from '../../../redux/store';

const Cart: React.FC = (): JSX.Element => {
  const { cartProducts, total, message } = useSelector(
    (state: storeInterface) => state.cartProducts
  );

  const { User } = useSelector((state: storeInterface) => state.user);

  const [productList, setProductsList] = useState(false);

  const toggleProducts = useCallback(() => {
    setProductsList(!productList);
  }, [productList]);

  const navigate = useNavigate();

  useEffect(() => {
    if (productList === true) {
      document.body.addEventListener('click', toggleProducts);
    }
    return () => {
      document.body.removeEventListener('click', toggleProducts);
    };
  }, [productList, toggleProducts]);

  const redirectToBuy = () => {
    navigate('/buy/cart');
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.cart}>
      <GrCart size={30} onClick={toggleProducts} />
      {productList && (
        <div className={styles.product_list_container}>
          {!User ? (
            <ul className={styles.products}>
              <div className={styles.login_message}>
                <h4>Log in to your account to have a cart</h4>
                <button onClick={redirectToLogin}>Log in</button>
              </div>
            </ul>
          ) : message ? (
            <ul className={styles.products}>
              <h4
                style={{
                  display: 'flex',
                  color: '#333',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {message}
              </h4>
            </ul>
          ) : (
            <ul className={styles.products}>
              <div className={styles.totalContainer}>
                <div className={styles.total}>
                  <h2>Total:</h2>
                  <h3>{`$${total}`}</h3>
                </div>
                <button style={{ cursor: 'pointer' }} onClick={redirectToBuy}>
                  Buy
                </button>
              </div>
              {cartProducts.map((p: product) => (
                <ol key={p._id}>
                  <ProductItem
                    key={p._id}
                    _id={p._id}
                    title={p.title}
                    price={p.price}
                    image={p.image}
                  />
                </ol>
              ))}
            </ul>
          )}
        </div>
      )}
      <span>
        {cartProducts.length && cartProducts.length >= 10
          ? '9+'
          : !cartProducts.length || !User
          ? null
          : cartProducts?.length}
      </span>
    </div>
  );
};

export default Cart;
