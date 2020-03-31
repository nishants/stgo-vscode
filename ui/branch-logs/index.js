import React from "react";

class BranchLogs extends React.Component {
  render() {
    const {
      currentBranchName,
      branches,
      commits,
      commitLogs,
      selectBranch,
      selectCommit,
      selectedCommit,
      openCommitLog,
      openCommit,
      handleCommitLogAction
    } = this.props;

    return <React.Fragment>
      <div id='branch-logs'>
        <div className='left-control-pane'>

          <div id="branch-selector">
            <label className='column-label'>Branch:</label>
            <select className='column-label' onChange={selectBranch}>
              <option selected>{currentBranchName}</option>
              {branches.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>

          <label className='column-label'>Commits:</label>
          {

            <ul id='branch-commits'>

              {commits.map(commit => (
                <li
                  key={commit.timeStamp}
                  onClick={() => selectCommit(commit)}
                  className={`${commit.timeStamp === selectedCommit?.timeStamp ? 'selected-commit' : ''}`}
                >{commit.timeStamp}
                </li>
              ))}

            </ul>
          }

        </div>

        <div className='right-control-pane'>
          {
            selectedCommit && <div id='selected-commit-info'>
              <div className='commit-field'>
                <label>Hash</label>
                <div className='commit-field-value'>

                  <a href="javascript:void(0)" onClick={()=> openCommit(selectedCommit)}>
                      {selectedCommit.hash}
                      <br/>
                      {selectedCommit.fullHash}
                  </a>

                </div>
              </div>
              <div className='commit-field'>
                <label>Message</label>
                <div className='commit-field-value'>{selectedCommit.message}</div>
              </div>
            </div>
          }

          <ul id='commit-logs'>

            {commitLogs.map(commitLog => (
              <li
                key={commitLog.id}
                className={`commit-log status-${commitLog.status}`}
              >
                <a
                  className='open-commit-log-link'
                  href="javascript:void(0)" onClick={()=> openCommitLog(commitLog)}>
                  {commitLog.label}
                </a>

                {commitLog.action && <a
                  className='commit-log-action-handler'
                  href="javascript:void(0)" onClick={()=> handleCommitLogAction(commitLog.action)}>
                {commitLog.action.label}</a>}
              </li>
            ))}

          </ul>

        </div>
      </div>
    </React.Fragment>;
  }
}

export default BranchLogs;

