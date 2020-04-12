import React from "react";
import CypressBuildInfo from './cypress-build-info';

import {isBuildInProgress} from './buildStatus';

class CypressCi extends React.Component {

  loadBuildsForCurrentBranch() {
    this.props.getCypressBuilds();
  }

  componentDidMount() {
    this.loadBuildsForCurrentBranch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentBranchName !== this.props.currentBranchName) {
      this.loadBuildsForCurrentBranch();
    }
  }

  render() {
    const {data, callBack} = this.props;
    const buildInProgress = Boolean(data.find(isBuildInProgress));

    return (
      <div className='cypressCi'>
        <button onClick={callBack} disabled={buildInProgress}>Run Cypress Tests</button>
        {
          data.map(item => (
            <CypressBuildInfo
              key={item.sourceVersion}
              commitId={item.sourceVersion}
              result={item.result}
              status={item.status}
              commitBuildHref={item._links.web.href}
            />
          ))}
      </div>
    );
  }
}

export default CypressCi;

