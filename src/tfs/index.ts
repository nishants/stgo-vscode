// @ts-nocheck
import * as config from "../config";
import * as vscode from "vscode";
const PR_MOCK_FILE = 'pull-request-mock.json';

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {

    const getPullRequest =  async (data: object) => {
        if (workspaceConfig.enableMocks) {
            return config.getData(PR_MOCK_FILE).then(mockPullRequest => {
                vscode.window.showInformationMessage(`Returning mock data for ${data.branchName}`)
                panel.webview.postMessage({messageId: 'set-pull-request', data: mockPullRequest});
            });
        }
        // TODO : get pull request form TFS
        return;
    };

    return {
        getPullRequest
    };
};
