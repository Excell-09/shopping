import React from 'react';
import ProductCard from './ProductCard';

const ProductsList = ({ products }) => {
  return (
    <>
      {products.map((item, i) => {
        return (
          <ProductCard
            key={i}
            id={item.id}
            thumbnail={item.image}
            price={item.price}
            title={item.title}
            category={item.category}
          />
        );
      })}
    </>
  );
};

export default ProductsList;
