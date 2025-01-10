import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import Carousel from '../../components/Carousel/Carousel';
// import CarrouselProducts from '../../components/CarrouselProducts/CarrouselProducts';
import { getHistory } from '../../redux/actions/getHistory';
import { getSearch } from '../../redux/actions/getSearch';
// import { clearProducts } from '../../redux/reducers/productsReducer';

const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  // const { historyProductsLoading, historyProducts } = useSelector(
  //   (state: any) => state.historyProducts
  // );

  useEffect(() => {
    dispatch(getHistory());
    dispatch(getSearch());
  }, [dispatch]);

  return (
    <div>
      <Carousel />
      <ProductsGrid />

      {/* {!historyProducts.length || !allProducts.length ? null : (
        <h1 className={styles.title}>History</h1>
      )}
      {!allProducts.length ? null : (
        <CarrouselProducts
          products={historyProducts}
          loading={historyProductsLoading}
        />
      )} */}
    </div>
  );
};

export default Home;
