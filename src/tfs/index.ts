// @ts-nocheck
import * as config from "../config";
import * as vscode from "vscode";
import TFS from "./tfs";
const PR_MOCK_FILE = "pull-request-mock.json";

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {
  const getPullRequest = async ({ branchName }: object) => {
    if (workspaceConfig.enableMocks) {
      return config.getData(PR_MOCK_FILE).then(mockPullRequest => {
        vscode.window.showInformationMessage(
          `Returning mock data for ${branchName}`
        );
        panel.webview.postMessage({
          messageId: "set-pull-request",
          data: mockPullRequest
        });
      });
    }

    const tfsObj = new TFS(workspaceConfig.tfsToken);

    const prDetails = await tfsObj.getPullRequestData(branchName);

    panel.webview.postMessage({
      messageId: "set-pull-request",
      data: prDetails
    });
  };

  const getBranchesWithPullRequests = async () => {
    if (workspaceConfig.enableMocks) {
      vscode.window.showInformationMessage(
          `Returning mock data for branches with pull requests`
      );

      return panel.webview.postMessage({
        messageId: "set-branch-with-pull-requests",
        data: [{name: 'branch-with-pr-one'}, {name: 'branch-with-pr-two'}]
      });
    }

      const tfsObj = new TFS(workspaceConfig.tfsToken);

      const pullRequests = await tfsObj.getActivePullRequests();

      return panel.webview.postMessage({
          messageId: "set-branch-with-pull-requests",
          data: pullRequests.map(pr => ({name: pr.sourceRefName}))
      });
  };

  return {
    getPullRequest,
    getBranchesWithPullRequests,
  };
};
