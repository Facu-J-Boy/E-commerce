import React from 'react';
import { useSelector } from 'react-redux';

const Buy: React.FC = (): JSX.Element => {
  const { productsToBuy } = useSelector((state: any) => state.buy);
  return (
    <div>
      {productsToBuy.map((element: any) => (
        <h1>{element.title}</h1>
      ))}
    </div>
  );
};

export default Buy;
