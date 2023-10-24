import React from 'react';
import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router-dom';
import { GrCart } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getCart } from '../../redux/actions/getCart';

export interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
}

const ProductsCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price
}) => {
  const product = {
    id: id,
    image: image,
    title: title,
    price: price
  };

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Evitar la propagación del evento de clic

    // Obtener el carrito actual desde el localStorage
    const cartString = localStorage.getItem('cart') || '[]';

    // Intentar parsear el carrito desde JSON
    let cart = [];

    try {
      cart = JSON.parse(cartString);
    } catch (error) {
      console.error('Error al parsear el carrito:', error);
    }

    // Asegurarnos de que cart sea un array
    if (!Array.isArray(cart)) {
      cart = [];
    }

    // Agregar el nuevo producto al carrito
    const updatedCart = [...cart, product];

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch(getCart());

    return false; // Evitar la propagación del evento de clic
  };
  return (
    <div className={styles.product} onClick={handleRedirect}>
      <div className={styles.imageContainer}>
        <button className={styles.cart_icon} onClick={handleAddToCart}>
          <GrCart size={25} />
        </button>
        <img src={image} alt={title} />
      </div>
      <h1>{`$${price}`}</h1>
      <span>{title}</span>
      <button className={styles.button}>Buy Now</button>
    </div>
  );
};

export default ProductsCard;
