import React, {useContext, useState} from "react";
import Search from "../search";
import QuotesList from "../quotes-list";
import Pagination from "../pagination";
import {CurrencyContext} from "../../context";

import './index.css'
import InfoCurrency from "../info-currency";
import AliveQuotesCurrency from "../alive-quotes-currencu";

const App = () => {
  const [currencyState] = useContext(CurrencyContext)

  const {listSymbol, loading, infoCurrency} = currencyState;
  const [bufferSerch, setBufferSerch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [listPerPage] = useState(10);

  // searching
  const onSearchItems = (val) => {
    setBufferSerch(val)
    setCurrentPage(1)
  };

  const visibleItems = (list, temp) => {
    if (temp === 0) return list;

    return list.filter(item => {
      return item.symbol.toLowerCase().indexOf(temp.toLowerCase()) > -1;
    })
  };

  const visibleList = visibleItems(listSymbol, bufferSerch)


  // get current page
  const indexOfLastItem = currentPage * listPerPage;
  const indexOfFirstItem = indexOfLastItem - listPerPage;
  const totalItemsPagination = Math.ceil(visibleList.length / listPerPage)

  const currentList = visibleList.slice(indexOfFirstItem, indexOfLastItem)


  // change page
  const paginateArrow = (curPage, operator) => {
    if (operator === "+") {
      if (curPage !== totalItemsPagination) {
        setCurrentPage(++curPage)
      }
    } else if (operator === "-") {
      if (curPage !== 1) {
        setCurrentPage(--curPage)
      }
    }
  }

  if (loading) {
    return <h2>LOADING</h2>
  }

  const openInfoCurrency = infoCurrency ? <InfoCurrency infoCurrency={infoCurrency}/> : null
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <Search onSearchItems={onSearchItems}/>
            <div className="card-body">
              <QuotesList list={currentList}/>
            </div>
            <Pagination
              totalItems={totalItemsPagination}
              currentPage={currentPage}
              paginateArrow={paginateArrow}
            />
          </div>
        </div>
        {openInfoCurrency}
      </div>
      <div className="row">
        <AliveQuotesCurrency />
      </div>
    </div>
  )
}

export default App;