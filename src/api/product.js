import axios from 'axios';

const apiProducts = async (fn) => {
  try {
    const { data } = await axios('https://fakestoreapi.com/products');
    return fn(data);
  } catch (err) {
    throw new Error(err);
  }
};

export default apiProducts;
