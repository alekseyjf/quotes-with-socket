import React from "react";

const InfoCurrency = (props) => {
  const {infoCurrency} = props;
  return (
    <div className="col-4">
      <div className="card">
        <ul className="list-group">
          {
            Object.entries(infoCurrency).map(([key, val]) => {
              return (
                <li key={key} className="list-group-item">
                  {key} : {val}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default InfoCurrency;