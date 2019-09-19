import React, {useContext, useEffect, useState} from "react";

import io from 'socket.io-client'
import {CurrencyContext} from "../../context";
import Service from "../../services";

const client = io('https://qrtm1.ifxid.com:8443');

const api = new Service();

const AliveQuotesCurrency = () => {
  const [state, setState] = useContext(CurrencyContext);
  const {visibleAliveList, visibleAliveListWithInfo} = state;

  const values = visibleAliveList.reduce((accum, item) => {
    accum.push(...Object.values(item));
    return accum
  }, [])

  useEffect(() => {
    if (values.length === 0) {
      api.getCurrencyInfo(values.join())
      .then(({data}) => {
        setState(state => ({...state, visibleAliveListWithInfo: data}))
      })

    }
  }, [values]);

  useEffect(() => {

    client.emit('subscribe', values);
    return () => {
      client.emit('unsubscribe', values);
    }
  });

  useEffect(() => {
    client.on('quotes', ({msg}) => {
        if (visibleAliveListWithInfo.length !== 0) {
          console.log(visibleAliveListWithInfo.length);
          // setState(state => ({
          //   ...state,
          //   visibleAliveListWithInfo: replaceArr(visibleAliveListWithInfo, msg)
          // }))
          replaceArr(visibleAliveListWithInfo, msg)

        }
      }
    );
  }, [visibleAliveListWithInfo])

  const replaceArr = (arr, data) => {
    // console.log(data);
    const idx = arr.findIndex(el => el.symbol === data.symbol);
    if (idx >= 0) {
      const ar = [
        ...arr.slice(0, idx),
        data,
        ...arr.slice(idx + 1)
      ]
      console.log(ar);
      // return [
      //   ...arr.slice(0, idx),
      //   data,
      //   ...arr.slice(idx + 1)
      // ];

      // setState(state => ({ ...state, visibleAliveListWithInfo: ar }) )

    }
  }

  return (
    <table>
      {
        visibleAliveListWithInfo.map((item) => {
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