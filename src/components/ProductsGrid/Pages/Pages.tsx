import React from 'react';
import { MdNavigateBefore } from 'react-icons/md';
import { MdNavigateNext } from 'react-icons/md';
import styles from './Pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterface } from '../../../redux/store';
import { changePage } from '../../../redux/reducers/productsReducer';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const Pages: React.FC = (): JSX.Element => {
  const { currentPage, totalPages, products } = useSelector(
    (state: storeInterface) => state.products
  );

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const total_pages = totalPages ?? 0;

  const pages = Array.from({ length: total_pages }, (_, index) => index + 1);

  const [searchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';

  const clickPage = (number: number) => {
    location.pathname === '/admin'
      ? dispatch(changePage(number))
      : navigate(`/?search=${search}&page=${number}`);
  };

  return (
    <>
      {products.length !== 0 ? (
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
              clickPage((currentPage ?? 0) - 1);
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
              clickPage((currentPage ?? 0) + 1);
            }}
          >
            <MdNavigateNext />
          </button>
        </div>
      ) : (
        <div style={{ height: '38px' }}></div>
      )}
    </>
  );
};

export default Pages;
