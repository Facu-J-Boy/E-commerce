import React, { useEffect, useState } from 'react';
import styles from './Buy.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getSingleProduct } from '../../redux/actions/getSingleProduct';
import ProductItem from '../../components/NavBar/ProductItem/ProductItem';
import { product } from '../../interfaces/product';
import { FaArrowLeftLong } from 'react-icons/fa6';
import SkeletonBuy from '../../components/SkeletonBuy/SkeletonBuy';
import { clearProduct } from '../../redux/reducers/singleProductReducer';

const Buy: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
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
    document.title = `Buy ${items.length} ${
      items.length === 1 ? 'item' : 'items'
    }`;
    return () => {
      document.title = 'E-commerce'; // Al desmontar el componente el titulo vuelve a la normalidad
    };
  }, [items.length]);

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
      dispatch(clearProduct());
    };
  }, [dispatch, id, cartProducts]);

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <>
      {productLoading ? (
        <SkeletonBuy />
      ) : (
        <div className={styles.container}>
          <div className={styles.leftZone}>
            <div className={styles.title}>
              <h2>Shopping Cart</h2>
              <h2>{`${items.length} ${
                items.length === 1 ? 'item' : 'items'
              }`}</h2>
            </div>
            <ul className={styles.productList}>
              {items.map((element: any) => (
                <ol key={element.id}>
                  <ProductItem
                    key={element._id}
                    _id={element._id}
                    title={element.title}
                    price={element.price}
                    image={element.image}
                  />
                </ol>
              ))}
            </ul>
            <button onClick={handleRedirect}>
              <FaArrowLeftLong style={{ marginRight: '10px' }} />
              Continue Shopping
            </button>
          </div>
          <div className={styles.rightZone}>
            <h4>Order Summary</h4>
            <div className={styles.form}>
              <div>
                <h4>SHIPPING</h4>
                <input type='text' />
              </div>
              <div>
                <h4>PROMO CODE</h4>
                <input type='text' />
              </div>
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
