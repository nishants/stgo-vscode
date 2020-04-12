import React from "react";

function CypressBuildInfo({ commitId, result, status , commitBuildHref}) {
  const success = [2, 4].indexOf(result) !== -1 ? true : false;
  const failure = [8].indexOf(result) !== -1 ? true : false;
  const cancelled = [32].indexOf(result) !== -1 ? true : false;
  return (
    <div className="build-status" key={commitId}>
      Commit
      <div>{commitId}</div>
      {success && <button className="btn btn--success"><a href={commitBuildHref}>Success</a></button>}
      {failure && <button className="btn btn--fail"><a href={commitBuildHref}>Failed</a></button>}
      {cancelled && <button className="btn btn--warn"><a href={commitBuildHref}>Cancelled</a></button>}
    </div>
  );
}

export default CypressBuildInfo;
