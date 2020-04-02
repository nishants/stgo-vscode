import React from "react";
import BranchLogs from "./branch-logs";

const vscode = acquireVsCodeApi();

const sendMessage = (message) => {
  vscode.postMessage(message);
};

class App extends React.Component {
  state = {
    message: null,
    selectedCommit: null,
    currentBranchName: null,
    branches: [],
    commits: [],
    commitLogs: []
  };

  setMessage(message) {
    this.setState({message})
  }

  closePanel() {
    vscode.postMessage({
      messageId: 'quit',
      text: 'Lets close the extension as user asked so.'
    });
  }

  componentDidMount() {
    this.messageListener = window.addEventListener('message', event => {
      const message = event.data;
      console.log("Received data from shell : ", message);
      switch (message.messageId) {
        case 'set-data':
          this.setState(message.data);
          break;
        case 'retried':
          this.setMessage('Cant run more than one window. !');
          break;
      }
    });

    sendMessage({messageId: 'load-ui'});
    sendMessage({messageId: 'get-pull-request', data: {branchName: "xyz-branch"}});
  }

  componentWillUnmount() {
    window.removeEventListener(this.messageListener);
  }

  setBranch(branchName) {
    this.setState({currentBranchName: branchName})
  }

  setCommit(commit) {
    this.setState({selectedCommit: commit})
  }

  openCommitLog(commitLog) {
    sendMessage({
      messageId: 'view-commit-log',
      commitLog
    });
  }

  openCommit(commit) {
    sendMessage({
      messageId: 'view-commit',
      commit
    });
  }

  handleCommitLogAction(commit, action) {
    sendMessage({
      messageId: 'handle-commit-log-action',
      commit,
      action
    });
  }

  render() {
    const {currentBranchName, selectedCommit, branches, commits, commitLogs} = this.state;

    const callbacks = {
      selectBranch: (event) => this.setBranch(event.target.value),
      selectCommit: (commit) => this.setCommit(commit),
      openCommitLog: (commitLog) => this.openCommitLog(commitLog),
      openCommit: (commit) => this.openCommit(commit),
      handleCommitLogAction: (action) => this.handleCommitLogAction(selectedCommit, action)
    };

    return <BranchLogs
      currentBranchName={currentBranchName}
      branches={branches}
      commits={commits}
      commitLogs={commitLogs}
      selectedCommit={selectedCommit}
      {...callbacks}
    />;
  }
}

export default App;

