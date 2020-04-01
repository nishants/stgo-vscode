import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export const showSnippet = () => {

    if (!vscode.workspace.workspaceFolders?.length) {
        vscode.window.showErrorMessage("Please create a workspace first !");
        return;
    }

    const newFileName = 'hello-world.ps1';
    const fileContent = '<# You first \n script #>';

    const worlspaceFolder = [...vscode.workspace.workspaceFolders].pop();
    const filePath = path.join(worlspaceFolder?.uri.fsPath || '.', newFileName);

    if (fs.existsSync(filePath)) {
        vscode.window.showWarningMessage("File already exits. Not overwritting !");
    }

    fs.writeFileSync(filePath, fileContent, 'utf8');

    vscode.workspace.openTextDocument(filePath).then(doc => {
        vscode.window.showTextDocument(doc);
    });
};