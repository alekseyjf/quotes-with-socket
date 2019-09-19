import React from "react";
import useCurrency from "../../context/useCurrency";


const QuotesList = ({list}) => {
  const {getInfoCurrency} = useCurrency()
  if(list.length === 0) {
    return <div>Not found elements</div>
  }
  return (
    <ul className="list-group list-group-flush">
      {
        list.map(({symbol})=>{
          return (
            <li onClick={()=>{getInfoCurrency(symbol)}} className="list-group-item" key={symbol}>{symbol}</li>
          )
        })
      }
    </ul>
  )
}

export default QuotesList;