import React, {useEffect, useState} from "react";
import Service from "../services";

const api = new Service();

const CurrencyContext = React.createContext([{}, ()=>{}])

const CurrencyProvider = (props) => {
  const [state, setState] = useState({
    listSymbol: [],
    listFullSymbol: [],
    loading: true,
    index: null,
    infoCurrency: null
  });

  useEffect(() => {
    if (state.listSymbol.length === 0 && state.listFullSymbol.length === 0) {
      api.getOnlySymbol()
      .then(({data: {quotesList}}) => {
        setState(state => ({ ...state, listSymbol: quotesList, loading: false }))
      });
      api.getQuotesList()
      .then(({data: {quotesList}}) => {
        setState(state => ({ ...state, listFullSymbol: quotesList, loading: false }))
      })

    }
  }, [state.listSymbol, state.listFullSymbol]);

  return (
    <CurrencyContext.Provider value={[state, setState]}>
      {props.children}
    </CurrencyContext.Provider>
  );
}

export {CurrencyContext, CurrencyProvider}