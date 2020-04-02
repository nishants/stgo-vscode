import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import data from './data';
import * as config from "./config";

const REACT_APP_NAME = 'reat-app';
const REACT_APP_TITLE = 'React App';

//  allow only one instance of webview at a time
let panel: vscode.WebviewPanel | undefined = undefined;

export const render = async (context: vscode.ExtensionContext) => {
    if (panel) {
        panel.reveal(vscode.ViewColumn.Beside);
        panel.webview.postMessage({ messageId: 'retried' });
        return;
    }

    const workspaceConfig = await config.getConfig();

    panel = vscode.window.createWebviewPanel(
        REACT_APP_NAME,
        REACT_APP_TITLE,
        vscode.ViewColumn.Active,
        { enableScripts: true, enableCommandUris: true, }
    );

    const html = fs.readFileSync(path.join(context.extensionPath, 'out', 'ui', 'index.html'), 'utf-8');
    // And set its HTML content
    panel.webview.html = html;

    panel.onDidDispose(
        () => {
            panel = undefined;
            vscode.window.showInformationMessage("You closed the webview !");
        },
        null,
        context.subscriptions
    );
    // Handle messages from the webview
    panel.webview.onDidReceiveMessage(
        message => {
            switch (message.messageId) {
                case 'load-ui':
                    // @ts-ignore
                    panel.webview.postMessage({ messageId: 'set-data', data });
                    return;
                case 'quit':
                    vscode.window.showWarningMessage("Closed by clicking on quit.");
                    panel?.dispose();
                    return;
                case 'view-commit-log':
                    vscode.env.openExternal(message.commitLog.link);
                    return;
                case 'view-commit':
                    vscode.env.openExternal(message.commit.link);
                    return;
                case 'handle-commit-log-action':
                    vscode.window.showInformationMessage(
                        `${message.action.id} -> ${message.commit.message}`
                    );
                    return;
            }
        },
        undefined,
        context.subscriptions
    );
};
