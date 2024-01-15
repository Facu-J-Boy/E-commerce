import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductItem from '../ProductItem/ProductItem';
import { product } from '../../../interfaces/product';
import styles from './Cart.module.css';
import { GrCart } from 'react-icons/gr';
// import { AppDispatch } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
// import { Buy } from '../../../redux/actions/buy';

const Cart: React.FC = (): JSX.Element => {
  const { cartProducts, total } = useSelector(
    (state: any) => state.cartProducts
  );

  const [productList, setProductsList] = useState(false);

  const toggleProducts = useCallback(() => {
    setProductsList(!productList);
  }, [productList]);

  // const dispatch = useDispatch<AppDispatch>();

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
    // dispatch(Buy(cartProducts));
    navigate('/buy/cart');
  };

  return (
    <div className={styles.cart}>
      <GrCart size={30} onClick={toggleProducts} />
      {productList && (
        <div className={styles.product_list_container}>
          {!cartProducts.length ? (
            <ul className={styles.products}>
              <h4
                style={{
                  display: 'flex',
                  color: '#333',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Your cart is empty
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
                <ol>
                  <ProductItem
                    id={p.id}
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
        {cartProducts.length >= 10
          ? '9+'
          : !cartProducts.length
          ? null
          : cartProducts?.length}
      </span>
    </div>
  );
};

export default Cart;
