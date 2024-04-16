import React, { useEffect } from 'react';
import styles from './ProductsGrid.module.css';
import { product } from '../../interfaces/product';
import ProductsCard from '../ProductCard/ProductsCard';
import Skeleton from '../Skeleton/Skeleton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import { MdNavigateBefore } from 'react-icons/md';
import { MdNavigateNext } from 'react-icons/md';
import { changePage } from '../../redux/reducers/productsReducer';

const ProductsGrid: React.FC = (): JSX.Element => {
  const pendingProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const dispatch = useDispatch<AppDispatch>();

  const {
    title,
    products,
    productsLoading,
    totalPages,
    currentPage,
    message
    // productsError
  } = useSelector((state: any) => state.products);

  // const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage, title }));
  }, [dispatch, currentPage, title]);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const clickPage = (number: number) => {
    dispatch(changePage(number));
  };

  return (
    <>
      {currentPage && (
        <div className={styles.pages}>
          <button
            style={
              currentPage === pages[0] || !products.length
                ? {
                    visibility: 'hidden'
                  }
                : { backgroundColor: '#333', color: '#fff' }
            }
            onClick={() => {
              clickPage(currentPage - 1);
            }}
          >
            <MdNavigateBefore />
          </button>
          {pages?.map((page: number) => (
            <button
              style={
                currentPage === page
                  ? { backgroundColor: '#333', color: '#fff' }
                  : {}
              }
              onClick={() => {
                clickPage(page);
              }}
              key={page}
            >
              {page}
            </button>
          ))}
          <button
            style={
              currentPage === pages[pages.length - 1] || !products.length
                ? {
                    visibility: 'hidden'
                  }
                : { backgroundColor: '#333', color: '#fff' }
            }
            onClick={() => {
              clickPage(currentPage + 1);
            }}
          >
            <MdNavigateNext />
          </button>
        </div>
      )}
      {message && <ErrorMessage message={message} />}
      <div className={styles.container}>
        {productsLoading ? (
          <>
            {pendingProduct.map((e) => (
              <Skeleton key={e} />
            ))}
          </>
        ) : (
          <>
            {products?.map((p: product) => (
              <ProductsCard
                key={p._id}
                _id={p._id}
                image={p.image}
                title={p.title}
                price={p.price}
              />
            ))}
          </>
        )}
      </div>
      {currentPage && (
        <div className={styles.pages}>
          <button
            style={
              currentPage === pages[0] || !products.length
                ? {
                    visibility: 'hidden'
                  }
                : { backgroundColor: '#333', color: '#fff' }
            }
            onClick={() => {
              clickPage(currentPage - 1);
            }}
          >
            <MdNavigateBefore />
          </button>
          {pages?.map((page: number) => (
            <button
              style={
                currentPage === page
                  ? { backgroundColor: '#333', color: '#fff' }
                  : {}
              }
              onClick={() => {
                clickPage(page);
              }}
              key={page}
            >
              {page}
            </button>
          ))}
          <button
            style={
              currentPage === pages[pages.length - 1] || !products.length
                ? {
                    visibility: 'hidden'
                  }
                : { backgroundColor: '#333', color: '#fff' }
            }
            onClick={() => {
              clickPage(currentPage + 1);
            }}
          >
            <MdNavigateNext />
          </button>
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
