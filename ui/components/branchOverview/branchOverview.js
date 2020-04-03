import React from 'react';
import './branchOverview.scss';

class BranchOverview extends React.Component {
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
    const { selectedBranch } = this.props;
    const { branchData } = this.state;

    if (!branchData || !branchData.type) {
      return null;
    }
    const existing = branchData.type === "EXISTING";
    var sourceRefName = existing && branchData.data.sourceRefName.split('/')[2];
    var targetRefName = existing && branchData.data.targetRefName.split('/')[2];

    return (
      <div className="branch-details">
        <div className='row'>
            <span className="label">Selected Branch :</span> 
            <span className="value">{selectedBranch}</span>
        </div>
        {existing ?
          (<div>
              <div className='row'>
                <span className="label">Pull Request:</span> 
                <span className="value">
                    <a href={branchData.link}>#{branchData.data.pullRequestId}</a>
                </span>
              </div>
              <div className='row'>
                <span className="label">Title:</span> 
                <span className="value">{branchData.data.title}</span>
              </div>
              <div className='row'>
                <span className="label">Description:</span> 
                <span className="value">{branchData.data.description}</span>
              </div>
              <div className='row'>
                <span className="label">Source:</span> 
                <span className="value">{sourceRefName}</span>
              </div>
              <div className='row'> 
                <span className="label"> Target:</span> 
                <span className="value">{targetRefName}</span>
              </div>
              <div className='row'>
                <a className='pr-btn' href={branchData.link}>Edit Pull Request</a>
              </div>
          </div>) :
          (<div className='row'>
            <a href={branchData.links} className='pr-btn'>Create Pull Request</a>
          </div>)
        }
        <div className='row'>
          <div><a href={`https://stestr1-nl2.tst2.dom/${selectedBranch}`}>Open branch on DTE</a></div>
          <div><a href={`https://ba.orange.saxobank.com/${selectedBranch}`}>Open branch on Tst56</a></div>
        </div>
      </div >);
  }

}

export default BranchOverview;