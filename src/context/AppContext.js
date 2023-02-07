import { createContext, useContext, useReducer } from 'react';
import apiProducts from '../api/product';
import reducer from './reducer';
// import MyAlert from '../utils/displayNotif';

const appContext = createContext();

const initialState = {
  products: [],
  isloading: false,
  openNav: false,
  productsRecomendation: [],
  isloadingReco: false,
  alertMessage: '',
  alertType: '',
  user: null,
  token: '',
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const dispatchRedux = useDispatch();

  const alertSuccess = (message) => {
    dispatch({ type: 'SET_ALERT', payload: { variant: 'success', message } });
  };
  const alertError = (message) => {
    dispatch({ type: 'SET_ALERT', payload: { variant: 'danger', message } });
  };
  const clearAlert = () => {
    dispatch({ type: 'CLEAR_ALERT' });
  };

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

  class Store {
    setLocal(user) {
      user = JSON.stringify(user);

      localStorage.setItem('user', user);
    }

    setCookies(user) {
      let token = user.token;
      let expired = new Date();
      expired.setTime(expired.getTime() + 1000 * 60 * 60);
      document.cookie = `token=${token} expires=${expired.toUTCString()} path='/'`;
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('token=')) {
          token = token.substring('token='.length + cookie.length);
          break;
        }
      }
    }
    removeLocal() {
      localStorage.removeItem('user');
      document.cookie = 'cookiename=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
  const store = new Store();

  return (
    <appContext.Provider value={{ ...state, alertSuccess, clearAlert, alertError, getProducts, toggelNav, getProductById, getProductRecomedation, startLoading, stopLoading, store }}>
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => useContext(appContext);

export default AppProvider;
