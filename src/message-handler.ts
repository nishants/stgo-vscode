import data from "./data";
import * as vscode from "vscode";
import * as config from "./config";
import  tfsHandler from "./tfs";
import  gitHandler from "./git";
import  azureHandler from "./azure";
import  integreationHelperHandler from "./integration-helper";

export default async (panel: vscode.WebviewPanel) => {
    const workspaceConfig = await config.getConfig();
    const tfs = tfsHandler(panel, workspaceConfig);
    const git = gitHandler(panel, workspaceConfig);
    const azure = azureHandler(panel, workspaceConfig);
    const integrationHelper = integreationHelperHandler(panel, workspaceConfig);

    return (message: { messageId: string;  data: object}) => {
        switch (message.messageId) {
            case 'load-ui':
                // @ts-ignore
                panel.webview.postMessage({messageId: 'set-data', data});
                return;

            case 'get-current-branch-info':
                return git.getCheckedOutBranchInfo();

            case 'get-pull-request':
                return tfs.getPullRequest(message.data);

            case 'get-cypress-builds':
                return azure.getCypressBuilds(message.data);

            case 'get-screenshot-diffs':
                // @ts-ignore
                return integrationHelper.getScreenshotDiffs(message.data);

            case 'quit':
                vscode.window.showWarningMessage("Closed by clicking on quit.");
                panel?.dispose();
                return;
        }
    }
}