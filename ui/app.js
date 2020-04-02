import React from "react";

import SelectBranch from "./select-branch";
import TabButtons from "./tabs-buttons";
import CypressCi from "./cypress-ci";


const TABS = {
  overview: 'overview',
  cypressCi: 'cypress-ci',
  screenshotDiffs: 'screenshot-comparison',
  ciLogs: 'ci-logs',
}

const vscode = acquireVsCodeApi();

const sendMessage = (message) => {
  vscode.postMessage(message);
};

class App extends React.Component {
  state = {showTab: TABS.overview};

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
        case 'retried':
          this.setMessage('Cant run more than one window. !');
          break;
      }
    });
    // TODO : Just to test, remove this
    sendMessage({messageId: 'get-current-branch-info'});
    sendMessage({messageId: 'get-pull-request', data: {branchName: "xyz-branch"}});
    sendMessage({messageId: 'get-cypress-builds', data: {branchName: "xyz-branch"}});
  }

  componentWillUnmount() {
    window.removeEventListener(this.messageListener);
  }

  setBranch(branchName) {
    this.setState({currentBranchName: branchName})
  }

  selectTab (tabName){
    this.setState({showTab: tabName});

  }

  render() {
    const {showTab} = this.state;

    const callbacks = {
      selectBranch: (event) => this.setBranch(event.target.value),
      selectTab: (tabname) => this.selectTab(tabname),
    };

    const getTab = () => {
      switch(showTab){
        case TABS.overview:
          return <div>Overview</div>;

        case TABS.cypressCi:
          return <div><CypressCi/></div>;

        case TABS.screenshotDiffs:
          return <div>Screenshot Diffs</div>;

        case TABS.ciLogs:
          return <div>Integration helper logs</div>;
      }
    };

    return (
      <div>
        <SelectBranch selectBranch={callbacks.selectBranch}/>
        <TabButtons selectTab={callbacks.selectTab}/>
        {getTab()}
      </div>
    );
  }
}

export default App;

