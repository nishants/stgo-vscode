// @ts-nocheck
import * as vscode from "vscode";

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {
  const getCheckedOutBranchInfo = async () => {
    try {
      const gitExtension = vscode.extensions.getExtension("vscode.git").exports;
      const api = gitExtension.getAPI(1);

      // Choose the repo (their could be multiple here !!)
      const repo = api.repositories[0];
      const head = repo.state.HEAD;

      // Get the branch and head
      const { commit, name: branch } = head;

      const data = {
        status: "Success",
        branchInfo: {
          branchName: branch,
          commit,
        },
      };

      return panel.webview.postMessage({ messageId: "set-branch-info", data });
    } catch (e) {
      vscode.window.showErrorMessage(
        "Git repo not found in workspace. Cannot continue.",
        "Okay, its not a valid git repo."
      );
      return panel.webview.postMessage({
        messageId: "set-branch-info",
        data: { status: "Error" },
      });
    }
  };

  return {
    getCheckedOutBranchInfo,
  };
};
