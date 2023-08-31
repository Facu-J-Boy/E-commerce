import React, {useEffect} from 'react';
import { getAllProducts } from '../../redux/actions/getAllproducts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { product } from '../../interfaces/product';

const Home: React.FC = (): JSX.Element => {

  const dispatch = useDispatch<AppDispatch> ();

  const {products, loading} = useSelector((state: any) => state.products);

  console.log('products: ', products);
  console.log('loading: ', loading);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])
  
  return (
    <div>
      {
        loading?
        <>
        loading...
        </>
        :
        products.map((e: product) => <div key={e.id}>{e.title}</div>)
      }
    </div>
  )
}

export default Home;