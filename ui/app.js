import React from "react";

import SelectBranch from "./select-branch";
import TabButtons from "./tabs-buttons";
import BranchOverView from './branch-overview';
import CypressCi from "./cypress-ci";

import ScreenshotDiffsTab from "./screenshot-diffs-tab";
import { TABS } from "./constants";

const vscode = acquireVsCodeApi();

const sendMessage = message => {
  vscode.postMessage(message);
};

class App extends React.Component {
  state = { 
    showTab: TABS.overview,
    currentBranchName: 'xyz-branch',
    screenshotDiffs: {files: [], unapproved: 0},
    branchList : [{ name: 'branch1'}, { name: 'branch2'}],
    cypressData: []
  };

  setMessage(message) {
    this.setState({ message });
  }
  setCypressBuild(data) {
    this.setState({ cypressData: data });
  }

  closePanel() {
    vscode.postMessage({
      messageId: "quit",
      text: "Lets close the extension as user asked so."
    });
  }

  componentDidMount() {
    this.messageListener = window.addEventListener("message", event => {
      const message = event.data;
      const { data } = event.data;
      console.log("Received data from shell : ", message);
      switch (message.messageId) {
        case "retried":
          this.setMessage("Cant run more than one window. !");
          break;
        case "set-cypress-builds":
          this.setCypressBuild(data);
          break;
        case 'set-branch-info':
          this.pupulateBranch(message.data.branchInfo.branchName);
          break;
        case 'set-screenshot-diffs':
          this.setScreenshotDiffs(message.data);
          break;
      }
    });
    // TODO : Just to test, remove this
    sendMessage({messageId: 'get-current-branch-info'});
    sendMessage({messageId: 'get-cypress-builds', data: {branchName: this.state.currentBranchName}});
    //sendMessage({messageId: 'get-screenshot-diffs', data: {branchName: "xyz-branch"}});
  }

  componentWillUnmount() {
    window.removeEventListener(this.messageListener);
  }

  sendHttpRequest({url, body}) {
    sendMessage({messageId: 'send-http-post-request', data: {url, body, requestId: Math.random()}});
  }

  pupulateBranch(branch){
    // if  not present in branchList
    this.setState({
      branchList: [...this.state.branchList, {
        'name': branch
      }]
    });
    this.setBranch(branch);
  }

  setBranch(branchName) {
    this.setState({ currentBranchName: branchName });
    //todo handled by the component
    sendMessage({
      messageId: "get-cypress-builds",
      data: { branchName: this.state.currentBranchName }
    });
  }

  selectTab(tabName) {
    this.setState({ showTab: tabName });
  }

  getScreenshotDiffs(branchName) {
    sendMessage({ messageId: 'get-screenshot-diffs', data: { branchName } });
  }

  openUrl(url) {
    sendMessage({ messageId: 'open-url', data: { url } });
  }
  getBranchDetails(branchName) {
    sendMessage({messageId: 'get-pull-request', data: {branchName}});
  }

  openFile(data){
    sendMessage({messageId: 'open-file', data});
  }

  setScreenshotDiffs(screenshotDiffs){
    this.setState({screenshotDiffs});
  }

  setScreenshotDiffs(screenshotDiffs) {
    this.setState({ screenshotDiffs });
  }

  render() {
    const { showTab, currentBranchName, screenshotDiffs, branchList } = this.state;
    const callbacks = {
      selectBranch: (event) => this.setBranch(event.target.value),
      selectTab: (tabname) => this.selectTab(tabname),
      getBranchDetails: (branchName) => this.getBranchDetails(branchName),
      getScreenshotDiffs: () => this.getScreenshotDiffs(currentBranchName),
      openUrl: (url) => this.openUrl(url),
      sendHttpRequest: ({url, body}) => this.sendHttpRequest({url, body}),
      openFile: (url) => this.openFile(url),
    };

    const getTab = () => {
      switch (showTab) {
        case TABS.overview:
          return <BranchOverView
            openUrl={callbacks.openUrl}
            selectedBranch={ currentBranchName } 
            getBranchDetails={callbacks.getBranchDetails}
            />;

        case TABS.cypressCi:
          return   <CypressCi
            data={this.state.cypressData}
          />;

        case TABS.screenshotDiffs:
          return <ScreenshotDiffsTab
            branchName={currentBranchName}
            screenshotDiffs={screenshotDiffs}
            getScreenshotDiffs={callbacks.getScreenshotDiffs}
            openUrl={callbacks.openUrl}
            sendHttpRequest={callbacks.sendHttpRequest}
            openFile={callbacks.openFile}
          />;

        case TABS.ciLogs:
          return <div>Integration helper logs</div>;
      }
    };

    return (
      <div id='app'>
        <SelectBranch selectBranch={callbacks.selectBranch} currentBranch={currentBranchName}list={branchList}/>
        <TabButtons selectTab={callbacks.selectTab} selectedTab={showTab}/>
        <div className='selected-tab-container'>{getTab()}</div>
      </div>
    );
  }

}

export default App;
