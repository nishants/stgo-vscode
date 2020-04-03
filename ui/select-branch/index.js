import React from "react";

export default (props) => (
  <div id='branch-selector'>
    <select id="branch" onChange={props.selectBranch} value={props.currentBranch}>
      {props.list.map(branch => {
        return <option value={branch.name}>{branch.name}</option>
      })}
    </select>

    <button type="button" class="refresh">Refresh</button>
    {/*<button type="button" class="push">Push (2 commits)</button>*/}
    {/*<button type="button" class="sync">Sync with master (5 commits)</button>*/}
  </div>
);

