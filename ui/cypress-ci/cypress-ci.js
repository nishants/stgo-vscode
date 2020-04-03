import React from "react";
import Status from './status';
import WithBranchChange  from '../withBranchChange';

class CypressCi extends React.Component{

  render() {
    const {data, callBack} = this.props;
    return (
      <div className='cypressCi'>
        <button  onClick={callBack}>Run Cypress Tests</button>
        {data.map(item => <Status commitId={item.sourceVersion} result={item.result} status={item.status} commitBuildHref={item._links.web.href}/>)}
      </div>
    );
  }
}
  
export default WithBranchChange(CypressCi);

