import React from "react";
export function SearchUsers(props) {
  return (
    <div id="search-users" className="col-xs-6 text-right">
      <input type="text" name="Search User" onChange={props.onTextSearch} value={props.searchText} placeholder="Search by Campaign Name"/>
      <input type="button" onClick={props.updateHandler} value="Search" className="btn-info" />
    </div>
  );
}