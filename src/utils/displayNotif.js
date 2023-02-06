class MyAlert {
  constructor(state, dispatch) {
    this.initialState = state;
    this.dispatch = dispatch;
  }
  success(message) {
    this.dispatch({ type: 'SET_ALERT', typeAlert: 'success', alertMessage:message });
  }

  error(message) {
    this.dispatch({ type: 'SET_ALERT', typeAlert: 'danger', alertMessage:message });
  }

  clearAlert() {
    this.dispatch({ type: 'SET_CLEAR_ALERT' });
  }
}

export default MyAlert;
