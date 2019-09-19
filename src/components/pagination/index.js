import React from "react";

const Pagination = ({currentPage, paginateArrow, totalItems}) => {

  if(totalItems === 0) {
    return null
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