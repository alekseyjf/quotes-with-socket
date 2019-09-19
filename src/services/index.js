import axios from "axios";

export default class Service {

  _apiBase = 'https://quotes.instaforex.com/api/';

  async getRes(url) {
    const res = await axios.get(`${this._apiBase}${url}`);
    if (!res.statusText) {
      throw new Error(`error by url ${url}, received ${res.statusText}`)
    }

    return await res;
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
    const res = this.getRes(`quotesTick?q=${url}`);
    return res
  }
}

//quotesTick?q=EURGBP

