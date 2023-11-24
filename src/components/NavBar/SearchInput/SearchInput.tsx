import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToSearch } from '../../../redux/actions/addToSearch';
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
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const { allProducts } = useSelector((state: any) => state.products);

  const handleInputChange = (ev: any) => {
    setSearch(ev.target.value);
  };

  const searchProduct = (ev: any) => {
    ev.preventDefault();
    if (search) {
      addToSearch(search);
      dispatch(getSearch());
    }
    !search
      ? dispatch(getAllProducts()) // Si no hay parametro de busqueda se setea el estado global de los productos a su totalidad
      : dispatch(searchProducts(search, allProducts)); // Caso contrario ejecutamos la acción de busqueda
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

  const { allSearchs } = useSelector((state: any) => state.searchs);

  // const searchs = useMemo(
  //   () => [
  //     'hola',
  //     'mundo',
  //     'que',
  //     'tal',
  //     'dasdsad',
  //     'dscdsadcda',
  //     'dsadasdasd',
  //     'fdacdsfas',
  //     'fvdsavds',
  //     'fdsfdsfdafa',
  //     'fdsfasfdf',
  //     'fdsavafa',
  //     'dsafsadas',
  //     'fsadfdfasdfafds',
  //     'dvcsadfas',
  //     'vvfdfvff',
  //     'vfvfvfv',
  //     'vfvfvfvf',
  //     'vfvfvfvfvf',
  //     'hola',
  //     'mundo',
  //     'que',
  //     'tal',
  //     'dasdsad',
  //     'dscdsadcda',
  //     'dsadasdasd',
  //     'fdacdsfas',
  //     'fvdsavds',
  //     'fdsfdsfdafa',
  //     'fdsfasfdf',
  //     'fdsavafa',
  //     'dsafsadas',
  //     'fsadfdfasdfafds',
  //     'dvcsadfas',
  //     'vvfdfvff',
  //     'vfvfvfv',
  //     'vfvfvfvf',
  //     'vfvfvfvfvf',
  //     'hola',
  //     'mundo',
  //     'que',
  //     'tal',
  //     'dasdsad',
  //     'dscdsadcda',
  //     'dsadasdasd',
  //     'fdacdsfas',
  //     'fvdsavds',
  //     'fdsfdsfdafa',
  //     'fdsfasfdf',
  //     'fdsavafa',
  //     'dsafsadas',
  //     'fsadfdfasdfafds',
  //     'dvcsadfas',
  //     'vvfdfvff',
  //     'vfvfvfv',
  //     'vfvfvfvf',
  //     'vfvfvfvfvf',
  //     'hola',
  //     'mundo',
  //     'que',
  //     'tal',
  //     'dasdsad',
  //     'dscdsadcda',
  //     'dsadasdasd',
  //     'fdacdsfas',
  //     'fvdsavds',
  //     'fdsfdsfdafa',
  //     'fdsfasfdf',
  //     'fdsavafa',
  //     'dsafsadas',
  //     'fsadfdfasdfafds',
  //     'dvcsadfas',
  //     'vvfdfvff',
  //     'vfvfvfv',
  //     'vfvfvfvf',
  //     'vfvfvfvfvf'
  //   ],
  //   []
  // );
  // Lista de búsqueda

  const handleKeyDown = useCallback(
    (e: any) => {
      // Si se presiona la flecha hacia abajo (código de tecla 40) o hacia arriba (código de tecla 38)
      if (e.keyCode === 40 || e.keyCode === 38) {
        e.preventDefault(); // Evita el desplazamiento por defecto del navegador

        // Calcula el nuevo índice basado en la dirección de la flecha
        const direction = e.keyCode === 40 ? 1 : -1;
        const newIndex =
          (selectedItem === null
            ? 0
            : selectedItem + direction + allSearchs.length) % allSearchs.length;
        setSelectedItem(newIndex);
        setSearch(allSearchs[newIndex]);
      }
    },
    [selectedItem, allSearchs]
  );

  useEffect(() => {
    // Agrega un event listener para el evento keydown al montar el componente
    document.addEventListener('keydown', handleKeyDown);

    // Limpia el event listener al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, handleKeyDown]); // Vuelve a agregar el event listener si el ítem seleccionado cambia

  const handleMouseEnter = (index: number) => {
    setSelectedItem(index);
  };

  const handleClick = (item: string) => {
    setSearch(item);
  };

  return (
    <>
      <form onSubmit={searchProduct}>
        <input
          className={styles.searchInput}
          type='text'
          placeholder='Search'
          value={search}
          onChange={handleInputChange}
          onClick={handleSetSearchList}
        />
        <div
          style={{ display: !searchList ? 'none' : 'flex' }}
          className={styles.searchList}
        >
          <ul className={styles.searchs}>
            {allSearchs?.map((item: string, index: number) => (
              <li
                key={index}
                style={
                  index === selectedItem
                    ? { backgroundColor: 'rgb(206, 204, 204)' }
                    : undefined
                }
                onMouseEnter={() => handleMouseEnter(index)} // Agregando el manejador onMouseEnter
                onClick={() => handleClick(item)}
              >
                <div>
                  <GrHistory style={{ margin: '0px 10px' }} />
                  {item}
                </div>
                <button>x</button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </>
  );
};

export default SearchInput;
