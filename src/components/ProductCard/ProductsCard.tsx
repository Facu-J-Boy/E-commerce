import React from 'react'
import styles from './ProductCard.module.css'

interface ProductCardProps {
    image: string,
    title: string,
    price: number
}

const ProductsCard: React.FC<ProductCardProps> = ({image, title, price}) => {
  return (
    <div className={styles.product} >
                <div className={styles.imageContainer}>
                  <img
                    src={image}
                    alt={title}
                  />
                </div>
                <h1>{`$${price}`}</h1>
                <span>{title}</span>
              </div>
  )
}

export default ProductsCard