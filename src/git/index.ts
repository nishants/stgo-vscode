// @ts-nocheck
import * as vscode from "vscode";

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {

    const getCheckedOutBranchInfo =  async () => {
        let fakeInfo = {
            branchName: "test-vscode-fake-branch",
            uncommittedFiles: 3,
            commitsNoPushed: 3
        };
        return panel.webview.postMessage({messageId: 'set-branch-info', data: fakeInfo});
    };

    return {
        getCheckedOutBranchInfo
    };
};
