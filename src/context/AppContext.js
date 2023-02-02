import { createContext, useContext, useReducer } from 'react';
import apiProducts from '../api/product';
import reducer from './reducer';

const appContext = createContext();

const initialState = {
  products: [],
  isloading: false,
  openNav: false,
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

  const getProducts = () => {
    startLoading();
    apiProducts((res) => {
      dispatch({ type: 'SET_PRODUCTS', products: res });
      stopLoading();
    });
  };

  return <appContext.Provider value={{ ...state, getProducts, toggelNav }}>{children}</appContext.Provider>;
};

export const useAppContext = () => useContext(appContext);

export default AppProvider;
