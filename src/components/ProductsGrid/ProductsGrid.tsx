import React, { useEffect, useState } from 'react';
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

const ProductsGrid: React.FC = (): JSX.Element => {
  const pendingProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const dispatch = useDispatch<AppDispatch>();

  const { products, productsLoading, totalPages, currentPage, productsError } =
    useSelector((state: any) => state.products);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProducts({ page, title: '' }));
  }, [dispatch, page]);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const clickPage = (number: number) => {
    setPage(number);
  };

  return (
    <>
      {currentPage && (
        <div className={styles.pages}>
          <button
            style={
              currentPage === pages[0]
                ? {
                    visibility: 'hidden'
                  }
                : {}
            }
            onClick={() => {
              clickPage(page - 1);
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
              currentPage === pages[pages.length - 1]
                ? {
                    visibility: 'hidden'
                  }
                : {}
            }
            onClick={() => {
              clickPage(page + 1);
            }}
          >
            <MdNavigateNext />
          </button>
        </div>
      )}
      {productsError && (
        <ErrorMessage type={productsError.type} message={productsError.text} />
      )}
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
                key={p.id}
                id={p.id}
                image={p.image}
                title={p.title}
                price={p.price}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default ProductsGrid;
