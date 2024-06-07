import React from 'react';
import { MdNavigateBefore } from 'react-icons/md';
import { MdNavigateNext } from 'react-icons/md';
import styles from './Pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterface } from '../../../redux/store';
import { changePage } from '../../../redux/reducers/productsReducer';

const Pages: React.FC = (): JSX.Element => {
  const { currentPage, totalPages, products } = useSelector(
    (state: storeInterface) => state.products
  );

  const dispatch = useDispatch<AppDispatch>();

  const total_pages = totalPages ?? 0;

  const pages = Array.from({ length: total_pages }, (_, index) => index + 1);

  const clickPage = (number: number) => {
    dispatch(changePage(number));
  };

  return (
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
          clickPage(currentPage ?? 0 - 1);
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
          clickPage(currentPage ?? 0 + 1);
        }}
      >
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default Pages;
