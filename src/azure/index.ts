// @ts-nocheck
import * as vscode from "vscode";
import * as config from "../config";
const CPYRESS_BUILDS_MOCK_DATA  = "cypress-mock-data.json";

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {

    const getCypressBuilds =  async (data) => {
        if (workspaceConfig.enableMocks) {
            return config.getData(CPYRESS_BUILDS_MOCK_DATA).then(mockData => {
                vscode.window.showInformationMessage(`Returning mock data for cyrpess build ${data.branchName}`)
                panel.webview.postMessage({messageId: 'set-cypress-builds', data: mockData});
            });
        }
        // TODO : get pull request form TFS
        return;
    };

    return {
        getCypressBuilds
    };
};
