const reducer = (state, action) => {
  if (action.type === 'SET_PRODUCTS') {
    return { ...state, products: action.products };
  }
  if (action.type === 'START_LOADING') {
    return { ...state, isloading: true };
  }
  if (action.type === 'STOP_LOADING') {
    return { ...state, isloading: false };
  }
  if (action.type === 'OPEN_NAV') {
    return { ...state, openNav: !state.openNav };
  }
};

export default reducer;
