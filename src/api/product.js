import axios from 'axios';

const apiProducts = async (fn) => {
  const {data} = await axios('https://dummyjson.com/products');
  return fn(data.products);
};

export default apiProducts;
