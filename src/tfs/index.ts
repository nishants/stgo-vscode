import * as vscode from "vscode";

import { getPullRequest } from "./tfs-connection";
import { getMockPullRequest } from "./mock-data";
import { getCreatePullRequestUrl, getPullRequestUrl } from "../constant";

type WorkspaceConfig = { enableMocks: boolean; tfsToken: string };

export default (
  panel: vscode.WebviewPanel,
  workspaceConfig: WorkspaceConfig
) => {
  const getMockOrPullRequest = async (branchName: string) => {
    const pullRequests = workspaceConfig.enableMocks
      ? await getMockPullRequest(branchName)
      : await getPullRequest(branchName, workspaceConfig.tfsToken);

    const pullRequest = pullRequests[0];

    panel.webview.postMessage({
      messageId: "set-pull-request",
      data: {
        pullRequest,
        link: pullRequest
          ? getPullRequestUrl(pullRequest.pullRequestId)
          : getCreatePullRequestUrl(branchName),
      },
    });
  };

  return {
    getPullRequest: getMockOrPullRequest,
  };
};
