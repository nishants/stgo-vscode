// @ts-nocheck
import * as vscode from "vscode";
import { platform } from 'os';
const execa = require('execa');

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {

    const getCheckedOutBranchInfo = async () => {
        let data;
        // get Branch name
        try {
            console.log(process.cwd());
            let folderPath = vscode.workspace.rootPath;
            let cmd;
            if (platform() === 'win32') {
                cmd = `pushd ${folderPath} & git branch | findstr \\*`;
            } else {
                cmd = `(cd ${folderPath} ; git branch | grep \\*)`;
            }

            const {stdout} = await execa(cmd,{ shell: true });
            const branchName = stdout.slice(2, stdout.length);

            data = {
                status: 'Success',
                branchInfo: {
                    branchName
                }
            };
        } catch (e) {
            data = {
                status: 'Error',
                error: e,
            }
        }

        return panel.webview.postMessage({ messageId: 'set-branch-info', data });
    };

    return {
        getCheckedOutBranchInfo
    };
};
