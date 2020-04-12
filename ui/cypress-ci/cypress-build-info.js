import React from "react";

function CypressBuildInfo({commitId, result, commitBuildHref, buildTime}) {
  const success = [2, 4].indexOf(result) !== -1 ? true : false;
  const failure = [8].indexOf(result) !== -1 ? true : false;
  const cancelled = [32].indexOf(result) !== -1 ? true : false;
  const statusClass = success ? 'success' : failure ? 'error' : 'warning';
  const label = success ? 'Success' : failure ? 'Failed' : cancelled ? 'Cancelled' : 'Unknown';

  return (
    <div className="build-status" key={commitId}>
      Commit
      <div>{commitId}</div>
      <div>{buildTime}</div>
      <span
        className={`status-flag ${statusClass}`}>
        <a
          href={commitBuildHref}>{label}</a>
      </span>
    </div>
  );
}

export default CypressBuildInfo;
