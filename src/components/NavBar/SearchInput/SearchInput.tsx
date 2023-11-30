import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../../../redux/actions/getSearch';
import { getAllProducts } from '../../../redux/actions/getAllproducts';
import { searchProducts } from '../../../redux/actions/searchProducts';
import { AppDispatch } from '../../../redux/store';
import { GrHistory } from 'react-icons/gr';
import styles from './SearchInput.module.css';

const SearchInput: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState(false);

  const { allProducts } = useSelector((state: any) => state.products);
  const { allSearchs } = useSelector((state: any) => state.searchs);

  const handleInputChange = (ev: any) => {
    setSearch(ev.target.value);
  };

  const searchProduct = (ev: any) => {
    ev.preventDefault();
    searchList && setSearchList(false); // Si la lista de busqueda está abierta desaparece al ejecutar la busqueda
    if (!search) {
      dispatch(getAllProducts()); // Si no hay parametro de busqueda se setea el estado global de los productos a su totalidad
    } else {
      dispatch(searchProducts(search, allProducts)); // Caso contrario ejecutamos la acción de busqueda
      dispatch(getSearch());
    }
  };

  const deleteSearchList = useCallback(() => {
    setSearchList(!searchList);
  }, [searchList]);

  useEffect(() => {
    if (searchList === true) {
      document.body.addEventListener('click', deleteSearchList);
    }
    return () => {
      document.body.removeEventListener('click', deleteSearchList);
    };
  }, [deleteSearchList, searchList]);

  const handleSetSearchList = () => {
    !searchList && setSearchList(true);
  };

  const handleClick = (item: string) => {
    setSearch(item);
  };

  return (
    <div className={styles.inputContainer}>
      <form onSubmit={searchProduct}>
        <input
          className={styles.searchInput}
          type='text'
          placeholder='Search'
          value={search}
          onChange={handleInputChange}
          onClick={handleSetSearchList}
        />
      </form>
      {!allSearchs.length ? null : (
        <div
          style={{ display: !searchList ? 'none' : 'flex' }}
          className={styles.searchList}
        >
          <ul className={styles.searchs}>
            {allSearchs.map((item: string, index: number) => (
              <li key={index} onClick={() => handleClick(item)}>
                <div>
                  <GrHistory style={{ margin: '0px 10px' }} />
                  {item}
                </div>
                <button>x</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
