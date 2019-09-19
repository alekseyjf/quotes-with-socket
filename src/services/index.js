import axios from "axios";

export default class Service {

  _apiBase = 'https://quotes.instaforex.com/api/';

  async getRes(url) {
    const res = await axios.get(`${this._apiBase}${url}`);
    if (!res.statusText) {
      throw new Error(`error by url ${url}, received ${res.statusText}`)
    }

    return res;
  }
  getQuotesList = async (url='') => {
    const res = this.getRes(`quotesList${url}`);
    return res
  }
  getOnlySymbol = async () => {
    const res = this.getQuotesList('?f=f');
    return res
  }
  getCurrencyInfo = async (url) => {
    const res = this.getRes(`quotesTick`);
    return res
  }
  getCurrencySymbol = async () => {
    const res = this.getRes(`quotesTick?f=f`);
    return res
  }
}
//https://quotes.instaforex.com/api/quotesTick?f=f
//quotesTick?q=EURGBP

