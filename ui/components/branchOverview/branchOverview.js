import React from 'react';
import ReactDOM from 'react-dom';

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
      <div>
        <div> Selected Branch : {selectedBranch}</div>
        {existing ?
          <div>
            <div>
              Pull Request: <a href={this.state.branchData.data.link}>#{this.state.branchData.data.title}</a>
              <div>
                Description:
                  <div>{this.state.branchData.data.description}</div>
              </div>
              <div> Source:  {sourceRefName}  <br></br>Target:  {targetRefName} </div>
            </div>
            <button ><a href={this.state.branchData.link}>Edit Pull Request</a></button>
          </div> :
          <div>
            <br></br>
            <button   ><a href={this.state.branchData.links}>Create Pull Request</a></button>
          </div>
        }
        <br></br>
        <div>
          <div><a href={`https://stestr1-nl2.tst2.dom/${selectedBranch}`}>Open branch on DTE</a></div>
          <div><a href={`https://ba.orange.saxobank.com/${selectedBranch}`}>Open branch on Tst56</a></div>
        </div>
      </div >);
  }

}

export default BranchOverview;