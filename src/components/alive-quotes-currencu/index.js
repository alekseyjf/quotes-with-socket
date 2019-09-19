import React, {useContext, useEffect, useState} from "react";

import io from 'socket.io-client'
import {CurrencyContext} from "../../context";
import Service from "../../services";

const client = io('https://qrtm1.ifxid.com:8443');

const api = new Service();

const AliveQuotesCurrency = () => {
  const [state, setState] = useContext(CurrencyContext);
  const {visibleAliveListWithInfo} = state;
  console.log(state);
  const [values, setValues] = useState([])
  console.log(values);
  const listSymbols = values.reduce((list, item) => {
    list.push(item.symbol);
    return list
  }, []);

  useEffect(() => {
    if (values.length === 0) {
      api.getCurrencyInfo(values.join())
      .then(({data}) => {
        setValues(data)
      })

    }
  }, [values]);

  useEffect(() => {

    client.emit('subscribe', listSymbols);
    return () => {
      client.emit('unsubscribe', listSymbols);
    }
  });

  useEffect(() => {
    client.on('quotes', ({msg}) => {
        if (values.length !== 0) {
          // setValues(replaceArr(values, msg))
          replaceArr(values, msg)
        }
      }
    );
  }, [values])

  const replaceArr = (arr, data) => {
    const idx = arr.findIndex(el => el.symbol === data.symbol);
    if (idx >= 0) {

      return [
        ...arr.slice(0, idx),
        data,
        ...arr.slice(idx + 1)
      ];
    }
    return arr
  }

  return (
    <table>
      {
        values.map((item) => {
          const {symbol, ask, bid, change} = item;

          return (
            <tr key={item.symbol}>
              <td>
                {symbol}
              </td>
              <td>
                {ask}
              </td>
              <td>
                {bid}
              </td>
              <td>
                {change}
              </td>
            </tr>
          )
        })
      }
    </table>
  )
}

export default AliveQuotesCurrency;