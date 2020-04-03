import React from "react";

import SelectBranch from "./select-branch";
import TabButtons from "./tabs-buttons";
import CypressCi from "./cypress-ci";
import ScreenshotDiffsTab from "./screenshot-diffs-tab";
import { TABS } from "./constants";

const vscode = acquireVsCodeApi();

const sendMessage = message => {
  vscode.postMessage(message);
};

class App extends React.Component {
  state = {  cypressData: [], showTab: TABS.overview, screenshotDiffs: {files: [], unapproved: 0, currentBranchName: ''}, branchList : [{ name: 'branch1'}, { name: 'branch2'}]};

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
      const {data} = event.data;
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
    sendMessage({messageId: 'get-pull-request', data: {branchName: "xyz-branch"}});
    sendMessage({messageId: 'get-cypress-builds', data: {branchName: "xyz-branch"}});
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
    this.setState({ branchList: [...this.state.branchList,{
      'name' : branch
    }] });
    this.setBranch(branch);
  }

  setBranch(branchName) {
    this.setState({ currentBranchName: branchName });
    sendMessage({
      messageId: "get-pull-request",
      data: { branchName: this.state.currentBranchName }
    });
    sendMessage({
      messageId: "get-cypress-builds",
      data: { branchName: this.state.currentBranchName }
    });
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

  setScreenshotDiffs(screenshotDiffs){
    this.setState({screenshotDiffs});
  }

  render() {
    const {showTab, currentBranchName, screenshotDiffs,branchList} = this.state;

    const callbacks = {
      selectBranch: (event) => this.setBranch(event.target.value),
      selectTab: (tabname) => this.selectTab(tabname),
      getScreenshotDiffs: () => this.getScreenshotDiffs(this.state.currentBranchName),
      openUrl: (url) => this.openUrl(url),
      sendHttpRequest: ({url, body}) => this.sendHttpRequest({url, body}),
    };

    const getTab = () => {
      switch (showTab) {
        case TABS.overview:
          return <div>Overview</div>;

        case TABS.cypressCi:
          return (
            <div>
              <CypressCi data={this.state.cypressData} />
            </div>
          );

        case TABS.screenshotDiffs:
          return <ScreenshotDiffsTab
            branchName={currentBranchName}
            screenshotDiffs={screenshotDiffs}
            getScreenshotDiffs={callbacks.getScreenshotDiffs}
            openUrl={callbacks.openUrl}
            sendHttpRequest={callbacks.sendHttpRequest}
          />;

        case TABS.ciLogs:
          return <div>Integration helper logs</div>;
      }
    };

    return (
      <div>
                <SelectBranch selectBranch={callbacks.selectBranch} currentBranch={currentBranchName}list={branchList}/>

        <TabButtons selectTab={callbacks.selectTab} selectedTab={showTab}/>
        {getTab()}
      </div>
    );
  }
}

export default App;
