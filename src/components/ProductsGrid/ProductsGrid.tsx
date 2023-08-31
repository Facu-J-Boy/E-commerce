import React from 'react'
import { productsState } from '../../redux/reducers/productsReducer';
import styles from './ProductsGrids.module.css'
import { product } from '../../interfaces/product';
import ProductsCard from '../ProductCard/ProductsCard';

const ProductsGrid:React.FC<productsState> = ({products, loading}):JSX.Element => {
  return (
    <>
    {
      loading?
      <>
      loading...
      </>
      :
      <div className={styles.container}>
        {
          products.map((p:product) => <ProductsCard 
          key={p.id}
          image={p.image}
          title={p.title}
          price={p.price}
          />)
        }  
      </div>
    }
    </>
  )
}

export default ProductsGrid