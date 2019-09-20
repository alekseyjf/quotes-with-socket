import React, {useContext, useEffect, useState} from "react";

import io from 'socket.io-client'
import {CurrencyContext} from "../../context";
import Service from "../../services";

const client = io('https://qrtm1.ifxid.com:8443');

const api = new Service();

const AliveQuotesCurrency = () => {
  const [state, setState] = useContext(CurrencyContext);
  console.log(state);
  const {visibleAliveListWithInfo} = state;
  const [connection, setConnection] = useState(false);

  const values = visibleAliveListWithInfo.reduce((accum, item) => {
    accum.push(item.symbol);
    return accum
  }, []);

  useEffect(() => {
    if (visibleAliveListWithInfo.length === 0) {
      api.getCurrencyInfo().then(({data}) => {
        setState(state => ({...state, visibleAliveListWithInfo: data}))
      })
    }
  }, [visibleAliveListWithInfo]);

  useEffect(() => {
    setConnection(true)
    return () => setConnection(false)
  }, []);

  useEffect(() => {
    if (connection) {
      client.emit('subscribe', values);
    }
    return () => {
      if (connection) {
        client.emit('unsubscribe', values);
      }
    }
  });

  useEffect(() => {
    client.on('quotes', ({msg}) => {
      if(visibleAliveListWithInfo.length > 0) {
        // console.log(visibleAliveListWithInfo);
        replaceArr(visibleAliveListWithInfo, msg)
        // setState(state=>({
        //   ...state,
        //   visibleAliveListWithInfo: replaceArr(visibleAliveListWithInfo, msg)
        // }));
      }
    })
  }, [visibleAliveListWithInfo])

  const replaceArr = (arr, data) => {
    const idx = arr.findIndex(el => el.symbol === data.symbol);
    if (idx >= 0) {
      return [
        ...arr.slice(0, idx),
        {data, changed: true},
        ...arr.slice(idx + 1)
      ];
    }
    return arr
  }

  return (
    <table>
      <tbody>
      { visibleAliveListWithInfo.map((item) => {
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
        }) }
      </tbody>
    </table>
  )
}

export default AliveQuotesCurrency;