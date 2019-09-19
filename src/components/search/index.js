import React from "react";

const Search = ({onSearchItems}) => {

  const onSearch = (e) => {
    onSearchItems(e.target.value)
  }

  return (
    <form>
      <input onChange={onSearch} className="form-control" type="text" placeholder="Search"/>
    </form>
  )
}

export default Search;