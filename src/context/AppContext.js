import { createContext, useContext, useReducer } from 'react';
import apiProducts from '../api/product';
import reducer from './reducer';

const appContext = createContext();

const initialState = {
  products: [],
  isloading: false,
  openNav: false,
  productsRecomendation: [],
  isloadingReco: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggelNav = () => {
    dispatch({ type: 'OPEN_NAV' });
  };

  const startLoading = () => {
    dispatch({ type: 'START_LOADING' });
  };
  const stopLoading = () => {
    dispatch({ type: 'STOP_LOADING' });
  };
  const startLoadingRecomen = () => {
    dispatch({ type: 'START_LOADING_RECO' });
  };
  const stopLoadingRecomen = () => {
    dispatch({ type: 'STOP_LOADING_RECO' });
  };

  const getProducts = async (props = {}) => {
    startLoading();

    let url = `https://fakestoreapi.com/products`;
    if (props?.categories) {
      url = url + `/category/${props.categories}`;
    }

    if (props?.sorte) {
      url = url + `?sort=${props.sorte}`;
    }

    if (props.search) {
      const searchValue = props.search.toLowerCase();
      const filterProducts = state.products.filter((item) => item.title.toLowerCase().includes(searchValue));
      dispatch({ type: 'SET_PRODUCTS', products: filterProducts });

      stopLoading();
      return;
    }

    await apiProducts(url, (res) => {
      dispatch({ type: 'SET_PRODUCTS', products: res });
      stopLoading();
      return;
    });
  };

  const getProductById = async (id) => {
    startLoading();
    let url = `https://fakestoreapi.com/products/${id}`;

    await apiProducts(url, (res) => {
      dispatch({ type: 'SET_PRODUCTS', products: res });
      stopLoading();
      return;
    });
    stopLoading();
  };

  const getProductRecomedation = async () => {
    startLoadingRecomen();
    const CATEGORIESRANDOM = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

    let randomMath = Math.round(Math.random() * 3);

    let count = 0;
    while (count < 1) {
      let url = `https://fakestoreapi.com/products/category/${CATEGORIESRANDOM[randomMath]}?limit=4`;
      await apiProducts(url, (res) => {
        dispatch({ type: 'SET_PRODUCTS_RECOMENDATION', products: res });
      });
      count++;
    }

    stopLoadingRecomen();
    return;
  };

  return <appContext.Provider value={{ ...state, getProducts, toggelNav, getProductById, getProductRecomedation, startLoading, stopLoading }}>{children}</appContext.Provider>;
};

export const useAppContext = () => useContext(appContext);

export default AppProvider;
