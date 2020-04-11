import React from "react";

export default (props) => (
  <div id="branch-selector">
    <select
      id="branch"
      onChange={props.selectBranch}
      value={props.currentBranch}
    >
      {props.list.map((branch) => {
        return <option value={branch.name}>{branch.name}</option>;
      })}
    </select>

    <button type="button" className="refresh">
      Refresh
    </button>
  </div>
);
