import * as vscode from "vscode";

const fakePanel : vscode.WebviewPanel = {
    viewType: "string",
    // @ts-ignore
    webview: {
        options: {},
        postMessage: jest.fn()
    }
};

export default fakePanel;