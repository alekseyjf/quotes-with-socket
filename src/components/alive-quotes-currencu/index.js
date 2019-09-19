import React, {useEffect, useState} from "react";

import io from 'socket.io-client'

const AliveQuotesCurrency = () => {

  const [list, setList] = useState([])
  // const client =  io('https://qrtm1.ifxid.com:8443');
  // const client = io('wss://data-fix.smt-data.com/lmax');

  // client.on('connect', (data) => {
  //   console.log('Tick data', data)
  // });

  // client.emit('subscribe', )

  // client.on('quotes', (data) => {
  //   console.log('Tick data', data); }
  // );

  useEffect(()=>{
    console.log(213123)
    const client = io('https://qrtm1.ifxid.com:8443');
    // client
    // client.on('quotes', (data) => {
    //   console.log('Tick data', data); }
    // );
    // client.on('quotesssssssssssssss', (data) => {
    //   console.log('Tick data', data); }
    // );
  })

  return (
    <div>
      asd
    </div>
  )
}

export default AliveQuotesCurrency;