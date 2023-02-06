const reducer = (state, action) => {
  if (action.type === 'SET_PRODUCTS') {
    return { ...state, products: action.products };
  }
  if (action.type === 'SET_PRODUCTS_RECOMENDATION') {
    return { ...state, productsRecomendation: action.products };
  }

  if (action.type === 'START_LOADING') {
    return { ...state, isloading: true };
  }
  if (action.type === 'STOP_LOADING') {
    return { ...state, isloading: false };
  }
  if (action.type === 'START_LOADING_RECO') {
    return { ...state, isloadingReco: true };
  }
  if (action.type === 'STOP_LOADING_RECO') {
    return { ...state, isloadingReco: false };
  }
  if (action.type === 'OPEN_NAV') {
    return { ...state, openNav: !state.openNav };
  }

  if (action.type === 'SET_ALERT') {
    return { ...state, alertType: action.payload.variant, alertMessage: action.payload.message };
  }

  if (action.type === 'CLEAR_ALERT') {
    return { ...state, alertType: '', alertMessage: '' };
  }
};

export default reducer;
