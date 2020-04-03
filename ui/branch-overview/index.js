import React from 'React';
import WithBranchChange  from '../withBranchChange';

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

export default WithBranchChange(Index);