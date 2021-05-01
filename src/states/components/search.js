import React from "react";

export const Search = ({searchTerm, setSearchTerm}) => {
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

  return (
    <input
      key='searchBar'  
      type="text"
      className="search"
      placeholder="Search for states.."
      title="search"
      value={searchTerm}
      onChange={handleChange}
    ></input>
  );
};
