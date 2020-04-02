import data from "./data";
import * as vscode from "vscode";
import * as config from "./config";
import  tfsHandler from "./tfs";

export default async (panel: vscode.WebviewPanel) => {
    const workspaceConfig = await config.getConfig();
    const tfs = tfsHandler(panel, workspaceConfig);

    return (message: { messageId: string;  data: object}) => {
        switch (message.messageId) {
            case 'load-ui':
                // @ts-ignore
                panel.webview.postMessage({messageId: 'set-data', data});
                return;

            case 'get-pull-request':
                return tfs.getPullRequest(message.data);

            case 'quit':
                vscode.window.showWarningMessage("Closed by clicking on quit.");
                panel?.dispose();
                return;
        }
    }
}