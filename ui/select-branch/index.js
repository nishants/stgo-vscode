import React from "react";

export default (props) => (
  <div id='branch-selector'>
    <select id="branch" onChange={props.setBranch} value={props.currentBranch}>
      {props.list.map(branch => {
        return <option value={branch.name}>{branch.name}</option>
      })}
    </select>

    <button type="button" className="refresh">Refresh</button>

    <label>
      <input
        name="isGoing"
        type="checkbox"
        checked={props.shouldFilterBranchesWithPr}
        onChange={props.setShouldFilterBranchesWithPr}/>
      Branches with active pull request only
    </label>
  </div>
);

