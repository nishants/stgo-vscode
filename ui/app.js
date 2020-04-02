import React from "react";

import SelectBranch from "./select-branch";
import TabButtons from "./tabs-buttons";
import BranchOverView from './components/branchOverview/branchOverview';
import ScreenshotDiffsTab from "./screenshot-diffs-tab";

const TABS = {
  overview: 'overview',
  cypressCi: 'cypress-ci',
  screenshotDiffs: 'screenshot-comparison',
  ciLogs: 'ci-logs',
};

const vscode = acquireVsCodeApi();

const sendMessage = (message) => {
  vscode.postMessage(message);
};

class App extends React.Component {

  state = { 
    showTab: TABS.overview,
    currentBranchName: 'xyz-branch',
    screenshotDiffs: {files: [], unapproved: 0}
  };

  setMessage(message) {
    this.setState({ message })
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
        case 'set-branch-info':
          this.setBranch(message.data.branchInfo.branchName);
          break;
        case 'set-screenshot-diffs':
          this.setScreenshotDiffs(message.data);
          break;
      }
    });
    // TODO : Just to test, remove this
    sendMessage({messageId: 'get-current-branch-info'});
    // todo remove sendMessage({messageId: 'get-pull-request', data: {branchName: this.state.currentBranchName}});
    sendMessage({messageId: 'get-cypress-builds', data: {branchName: this.state.currentBranchName}});
    //sendMessage({messageId: 'get-screenshot-diffs', data: {branchName: "xyz-branch"}});
  }

  componentWillUnmount() {
    window.removeEventListener(this.messageListener);
  }

  setBranch(branchName) {
    this.setState({ currentBranchName: branchName });
    //todo handled by the component
    // sendMessage({messageId: 'get-pull-request', data: {branchName: this.state.currentBranchName}});
    sendMessage({messageId: 'get-cypress-builds', data: {branchName: this.state.currentBranchName}});
  }

  selectTab(tabName) {
    this.setState({ showTab: tabName });
  }

  getScreenshotDiffs(branchName){
    sendMessage({messageId: 'get-screenshot-diffs', data: {branchName}});
  }

  openUrl(url){
    sendMessage({messageId: 'open-url', data: {url}});
  }
  getBranchDetails(branchName) {
    sendMessage({messageId: 'get-pull-request', data: {branchName}});
  }

  setScreenshotDiffs(screenshotDiffs){
    this.setState({screenshotDiffs});
  }

  render() {
    const {showTab, currentBranchName, screenshotDiffs} = this.state;

    const callbacks = {
      selectBranch: (event) => this.setBranch(event.target.value),
      selectTab: (tabname) => this.selectTab(tabname),
      getScreenshotDiffs: (branchName) => this.getScreenshotDiffs(branchName),
      getBranchDetails: (branchName) => this.getBranchDetails(branchName),
      openUrl: (url) => this.openUrl(url),
    };

    const getTab = () => {
      switch (showTab) {
        case TABS.overview:
          return <BranchOverView 
            selectedBranch={ this.state.currentBranchName } 
            getBranchDetails={callbacks.getBranchDetails}
            />;

        case TABS.cypressCi:
          return <div>Cypress CI</div>;

        case TABS.screenshotDiffs:
          return <ScreenshotDiffsTab
            branchName={currentBranchName}
            screenshotDiffs={screenshotDiffs}
            getScreenshotDiffs={callbacks.getScreenshotDiffs}
            openUrl={callbacks.openUrl}
          />;

        case TABS.ciLogs:
          return <div>Integration helper logs</div>;
      }
    };

    return (
      <div>
        <SelectBranch selectBranch={callbacks.selectBranch} />
        <TabButtons selectTab={callbacks.selectTab} />
        {getTab()}
      </div>
    );
  }
}

export default App;

