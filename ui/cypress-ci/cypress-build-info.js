import React from "react";

function CypressBuildInfo({ commitId, result, status , commitBuildHref, buildTime}) {
  const success = [2, 4].indexOf(result) !== -1 ? true : false;
  const failure = [8].indexOf(result) !== -1 ? true : false;
  const cancelled = [32].indexOf(result) !== -1 ? true : false;
  return (
    <div className="build-status" key={commitId}>
      Commit
      <div>{commitId}</div>
      <div>{buildTime}</div>
      {success && <span className="status-flag success"><a href={commitBuildHref}>Success</a></span>}
      {failure && <span className="status-flag error"><a href={commitBuildHref}>Failed</a></span>}
      {cancelled && <span className="status-flag warning"><a href={commitBuildHref}>Cancelled</a></span>}
    </div>
  );
}

export default CypressBuildInfo;
