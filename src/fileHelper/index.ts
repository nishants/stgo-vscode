// @ts-nocheck
import * as vscode from "vscode";
const cherow = require("cherow");
const estraverse = require('estraverse');


function findScreenshotPos(AST) {
    let charPos;
    estraverse.traverse(AST, {
        enter: function (node, parent) {
            if (node.type === 'Identifier' && node.name === "screenshot") {
                charPos = node.start;
                return estraverse.VisitorOption.Break;
            }
        }
    });
    return charPos;
}

function findScreenshotNode(documentAST, descriptonArr, index = 1) {

    let parentNode = documentAST;
    traverseToNode(parentNode, descriptonArr[index]);
    return findScreenshotPos(parentNode);

    function traverseToNode(AST, description) {
        let foundNode = false;
        estraverse.traverse(AST, {
            enter: function (node, parent) {
                if (node.type == 'Literal') {
                    if (node.value === description) {
                        foundNode = true;
                        parentNode = parent;
                        return estraverse.VisitorOption.Break;
                    }
                }
            }
        });
        if (foundNode && parentNode) {
            index++;
            if (index >= descriptonArr.length) {
                return;
            }
            traverseToNode(parentNode, descriptonArr[index])
        }
    }
}

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {

    const workspaceFolder = [...vscode.workspace.workspaceFolders].pop();
    const workspaceFolderPath = workspaceFolder?.uri.fsPath;

    const openFile = async ({ path, name }) => {
        const filePath = path.replace("\\drop\\cypress\\screenshots", `${workspaceFolderPath}\\src\\frontend`);
        
        //TODO - right now blindly removing extension name 
        // we need to cater for count before that as well as the screenshots with name
        name = name.replace(/\.[^/.]+$/, "");

        // array to find the screenshot in
        const descriptonArr = name.split('--').map(val => val.trim());

        // read the document
        const doc = await vscode.workspace.openTextDocument(filePath);

        // create an AST of the document so that we are able to find the screenshot command
        const documentAST = cherow.parseModule(doc.getText(), { ranges: true });

        const startChar = await findScreenshotNode(documentAST, descriptonArr);

        const lineNumber = doc.getText().substring(0, startChar).split('\n').length;

        // Show the text Document and this would become active window
        await vscode.window.showTextDocument(doc);

        // Highlight the exact line in the file
        let editor = vscode.window.activeTextEditor;
        let range = editor.document.lineAt(lineNumber - 1).range;
        editor.selection = new vscode.Selection(range.start, range.end);
        editor.revealRange(range);
    };

    return {
        openFile
    };
};
