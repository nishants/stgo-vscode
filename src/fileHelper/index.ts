// @ts-nocheck
import * as vscode from "vscode";
const cherow = require("cherow");
const estraverse = require('estraverse');

//TODO Cleanup this file to abstract traversing logic to a single method
function findScreenshotName(AST, fileName) {
    let charPos = 0;
    estraverse.traverse(AST, {
        enter: function (node, parent) {
            if (node.type == 'Literal') {
                if (node.value === fileName) {
                    charPos = node.start;
                    return estraverse.VisitorOption.Break;
                }
            }
        }
    });
    return charPos;
}

function findScreenshotPos(AST, count) {
    let charPos = 0;
    estraverse.traverse(AST, {
        enter: function (node, parent) {
            if (node.type === 'Identifier' && node.name === "screenshot") {
                if (count === 0) {
                    charPos = node.start;
                    return estraverse.VisitorOption.Break;
                }
                count--;
            }
        }
    });
    return charPos;
}

function findScreenshotNode(documentAST, descriptonArr, count) {

    if (descriptonArr.length === 1) {
        return findScreenshotName(documentAST, descriptonArr[0]);
    }
    let index = 1;
    let parentNode = documentAST;
    traverseToNode(parentNode, descriptonArr[index]);
    return findScreenshotPos(parentNode, count);

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

function getScreenshotIndex(str) {
    // Ref : https://stackoverflow.com/questions/432493/how-do-you-access-the-matched-groups-in-a-javascript-regular-expression
    var myRegexp = /^.*?\([^\d]*(\d+)[^\d]*\).png$/g;
    var match = myRegexp.exec(str);
    return match ? match[1] : 0;
}

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {

    const workspaceFolder = [...vscode.workspace.workspaceFolders].pop();
    const workspaceFolderPath = workspaceFolder?.uri.fsPath;

    const openFile = async ({ path, name }) => {
        const filePath = path.replace("\\drop\\cypress\\screenshots", `${workspaceFolderPath}\\src\\frontend`);

        const screenshotIndex = getScreenshotIndex(name);

        // we need to cater for the screenshots with name
        if (screenshotIndex > 0) {
            name = name.replace(`(${screenshotIndex}).png`, '').trim()
        } else {
            name = name.replace(`.png`, "").trim();
        }

        // array to find the screenshot in
        const descriptonArr = name.split('--').map(val => val.trim());

        // read the document
        const doc = await vscode.workspace.openTextDocument(filePath);

        // create an AST of the document so that we are able to find the screenshot command
        const documentAST = cherow.parseModule(doc.getText(), { ranges: true });

        const startChar = await findScreenshotNode(documentAST, descriptonArr, screenshotIndex);

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
