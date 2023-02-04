import React from 'react';
import ProductCard from './ProductCard';

const ProductsList = ({ product }) => {
  return (
    <>
      {product.length === 0 && <h4 className='text-center'>Product Not Found</h4>}
      {product.map((item, i) => {
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
