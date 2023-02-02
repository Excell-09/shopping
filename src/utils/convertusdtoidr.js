class convertusdtoidr {
  IDR = 15000;

  constructor(currency) {
    this.currency = currency;
    this.amount = this.IDR * this.currency;
    return this.amount;
  }

  formatString() {
    this.amount = this.amount.toLocaleString('id', {
      useGrouping: true,
      maximumFractionDigits: 3,
    });
    return this.amount;
  }
}

export default convertusdtoidr;
