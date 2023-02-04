import axios from 'axios';

const apiProducts = async (url, fn) => {
  try {
    const { data } = await axios(url);
    return  fn(data);
  } catch (err) {
    throw new Error(err);
  }
};

export default apiProducts;
