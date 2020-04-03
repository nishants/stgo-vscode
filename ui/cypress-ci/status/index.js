import React from "react";

function Index({ commitId, result, status }) {
  const success = [2, 4].indexOf(result) !== -1 ? true : false;
  const failure = [8].indexOf(result) !== -1 ? true : false;
  const cancelled = [32].indexOf(result) !== -1 ? true : false;
  return (
    <div className="build-status">
      <p>Commit</p>
      <p>{commitId}</p>
      {success && <button className="btn btn--success">Success</button>}
      {failure && <button className="btn btn--fail">Failed</button>}
      {cancelled && <button className="btn btn--warn">cancelled</button>}
    </div>
  );
}

export default Index;
