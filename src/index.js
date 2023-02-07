import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import AppProvider from './context/AppContext';
import store from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter forceRefresh>
      <AppProvider>
        <Provider store={store}>
          <ToastContainer
            position='bottom-left'
            autoClose={3000}
            closeOnClick
            theme='dark'
            pauseOnHover={false}
          />
          <App />
        </Provider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
