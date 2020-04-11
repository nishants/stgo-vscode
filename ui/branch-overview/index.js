import React from 'React';

class Index extends React.Component {

  componentDidMount() {
    if(this.props.selectedBranch){
      this.props.getBranchDetails(this.props.selectedBranch);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedBranch !== this.props.selectedBranch) {
      this.props.getBranchDetails(this.props.selectedBranch);
    }
  }

  render() {
    const { selectedBranch, pullRequestUrl, branchPullRequest } = this.props;

    // TODO breakdown : two components : one when pr is created, one when no PR is created

    const existing = Boolean(branchPullRequest);
    var sourceRefName = existing && branchPullRequest.sourceRefName.split('/')[2];
    var targetRefName = existing && branchPullRequest.targetRefName.split('/')[2];

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
                    <span>#{branchPullRequest.pullRequestId}</span>
                </span>
              </div>
              <div className='row'>
                <span className="label">Title :</span>
                <span className="value">{branchPullRequest.title}</span>
              </div>
              <div className='row'>
                <span className="label">Description :</span>
                <span className="value">{branchPullRequest.description}</span>
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

        <div className='row no-label'>
          <button className='button' onClick={() => this.props.openUrl(pullRequestUrl)}>
            {existing ? "Open Pull Request" : "Create Pull Request"}
          </button>
        </div>

      </div >);
  }

}

export default Index;