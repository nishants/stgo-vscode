import data from "./data";
import * as vscode from "vscode";
import * as axios from "axios";

import * as config from "./config";
import tfsHandler from "./tfs";
import gitHandler from "./git";
import azureHandler from "./azure";
import integreationHelperHandler from "./integration-helper";
import fileHelperHandler from "./fileHelper";

export default async (panel: vscode.WebviewPanel) => {
    const workspaceConfig = await config.getConfig();
    const tfs = tfsHandler(panel, workspaceConfig);
    const git = gitHandler(panel, workspaceConfig);
    const azure = azureHandler(panel, workspaceConfig);
    const integrationHelper = integreationHelperHandler(panel, workspaceConfig);
    const fileHelper = fileHelperHandler(panel, workspaceConfig);

    return (message: { messageId: string; data: object }) => {
        switch (message.messageId) {
            case 'load-ui':
                // @ts-ignore
                return panel.webview.postMessage({ messageId: 'set-data', data });

            case 'open-url':
                // @ts-ignore
                return vscode.env.openExternal(message.data.url);

            case 'open-file':
                // @ts-ignore
                return fileHelper.openFile(message.data);

            case 'get-current-branch-info':
                return git.getCheckedOutBranchInfo();

            case 'get-pull-request':
                return tfs.getPullRequest(message.data);

            case "get-cypress-builds":
                return azure.getCypressBuilds(message.data);
            
            case "get-trigger-cypress-build":
                return azure.triggerCypressBuild(message.data);

            case 'get-screenshot-diffs':
                // @ts-ignore
                return integrationHelper.getScreenshotDiffs(message.data);

            case 'send-http-post-request':
                // @ts-ignore
                return axios.post(data.url, data.body).then((response) => {
                    // @ts-ignore
                    panel.webview.postMessage({messageId: 'send-http-request-finished', requiresId: message.data.requestId, data: response});
                });

            case 'quit':
                vscode.window.showWarningMessage("Closed by clicking on quit.");
                panel?.dispose();
                return;
        }
    }
  };
};
