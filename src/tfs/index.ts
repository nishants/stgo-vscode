import * as vscode from "vscode";

import {getPullRequest} from "./tfs-connection";
import {getMockPullRequest} from "./mock-data";
import {getCreatePullRequestUrl} from "../constant";

type WorkspaceConfig = { enableMocks: boolean, tfsToken: string };

export default (panel: vscode.WebviewPanel, workspaceConfig: WorkspaceConfig) => {
    const getMockOrPullRequest = async (branchName: string) => {

        const pullRequests = workspaceConfig.enableMocks
            ? await getMockPullRequest(branchName)
            : await getPullRequest(branchName, workspaceConfig.tfsToken);

        panel.webview.postMessage({
            messageId: "set-pull-request",
            data: {
                pullRequest: pullRequests[0],
                createPullRequestUrl: getCreatePullRequestUrl(branchName)
            }
        });
    };

    return {
        getPullRequest: getMockOrPullRequest
    };
};
