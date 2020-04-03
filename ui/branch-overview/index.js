import React from 'React';

class Index extends React.Component {
  state = {
    branchData: {}
  };

  componentDidMount() {
    window.addEventListener('message', event => {
      const message = event.data;
      if (message.messageId === 'set-pull-request') {
        this.setState({ branchData: message.data });
      }
    });
    this.props.getBranchDetails(this.props.selectedBranch);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedBranch !== this.props.selectedBranch) {
      this.props.getBranchDetails(this.props.selectedBranch);
    }
  }

  render() {
    const { selectedBranch,selectTab } = this.props;
    const { branchData } = this.state;

    if (!branchData || !branchData.type) {
      return null;
    }
    const existing = branchData.type === "EXISTING";
    var sourceRefName = existing && branchData.data.sourceRefName.split('/')[2];
    var targetRefName = existing && branchData.data.targetRefName.split('/')[2];
    var screenShotComparisonStatus = (branchData.screenShotComparisonStatus = "NOT_SCHEDULED"); // APPROVED or PENDING_APPROVAL or NOT_SCHEDULED

    return (
      <div className="branch-details">
        <div className='row'>
            <span className="label">Selected Branch :</span> 
            <span className="value">{selectedBranch}</span>
        </div>
        {existing &&
          (<React.Fragment>
              <div className='row'>
                <span className="label">Pull Request :</span>
                <span className="value">
                    <span>#{branchData.data.pullRequestId}</span>
                </span>
              </div>
              <div className='row'>
                <span className="label">Title :</span>
                <span className="value">{branchData.data.title}</span>
              </div>
              <div className='row'>
                <span className="label">Description :</span>
                <span className="value">{branchData.data.description}</span>
              </div>
              <div className='row'>
                <span className="label">Source :</span>
                <span className="value">{sourceRefName}</span>
              </div>
              <div className='row'> 
                <span className="label"> Target :</span>
                <span className="value">{targetRefName}</span>
              </div>
          </React.Fragment>)
        }
        <div className='row no-label'>
          <div><a href={`https://stestr1-nl2.tst2.dom/${selectedBranch}`}>Open branch on DTE</a></div>
          <div><a href={`https://ba.orange.saxobank.com/${selectedBranch}`}>Open branch on Tst56</a></div>
        </div>

        {existing && (
          <div className="row no-label">
            <div>
              <a
                href={`http://st-integration.sys.dom/branch/${selectedBranch}`}
              >
                {screenShotComparisonStatus == "NOT_SCHEDULED" && (
                  <span>Screenshot comparison not yet scheduled</span>
                )}
                {screenShotComparisonStatus == "APPROVED" && (
                  <span>All screenshot differences have been approved</span>
                )}
              </a>
              {screenShotComparisonStatus == "PENDING_APPROVAL" && (
                <a onClick={() => selectTab("screenshotDiffs")}>
                  There are screenshot differences pending approval
                </a>
              )}
            </div>
          </div>
        )}
        {existing ?
          (            <div className='row no-label'>
              <button className='button' onClick={() => this.props.openUrl(branchData.link)}>Open Pull Request</button>
            </div>
          ) :
          (<div className='row no-label'>
            <button onClick={() => this.props.openUrl(branchData.link)} className='button'>Create Pull Request</button>
          </div>)
        }

      </div >);
  }

}

export default Index;