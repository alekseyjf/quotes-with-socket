import {useContext} from "react";
import {CurrencyContext} from "./index";
import Service from "../services";

const api = new Service();

const useCurrency = () => {
  const [state, setState] = useContext(CurrencyContext);

  const getInfoCurrency = (symbol) => {
    api.getCurrencyInfo(symbol)
    .then( ({data}) => {
      const [infoCurrency] = data;
      setState(state => ({ ...state, infoCurrency}))
    })
  };

  return {
    getInfoCurrency
  }

};

export default useCurrency;