// @ts-nocheck
import * as vscode from "vscode";
import * as config from "../config";
const CPYRESS_BUILDS_MOCK_DATA  = "cypress-mock-data.json";

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {

    const pointToCodeFn =  async (data) => {
      const filePath = data.diff.path;
      vscode.workspace.openTextDocument(filePath).then(document => vscode.window.showTextDocument(document));
        
    };

    return {
      pointToCodeFn
    };
};
