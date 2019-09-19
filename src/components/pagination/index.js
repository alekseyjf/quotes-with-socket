import React, {useContext} from "react";
import {CurrencyContext} from "../../context";

const Pagination = ({totalItems}) => {

  const [state, setState] = useContext(CurrencyContext)
  const {currentPage} = state
  if(totalItems === 0) {
    return null
  }

  // change page
  const paginateArrow = (curPage, operator) => {
    if (operator === "+") {
      if (curPage !== totalItems) {
        setState(state=>({...state, currentPage: ++curPage}))

      }
    } else if (operator === "-") {
      if (curPage !== 1) {
        setState(state=>({...state, currentPage: --curPage}))
      }
    }
  }

  return (
    <div className="row ">
      <div className="col-12 col_space-between">
        <button onClick={()=>{paginateArrow(currentPage, '-')}} className="fas fa-arrow-left"></button>
        <span>{currentPage} of {totalItems}</span>
        <button onClick={()=>{paginateArrow(currentPage, '+')}} className="fas fa-arrow-right"></button>
      </div>
    </div>
  )
}

export default Pagination