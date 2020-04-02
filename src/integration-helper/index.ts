// @ts-nocheck
import * as config from "../config";
import * as vscode from "vscode";
const SCREENSHOT_DIFFS_MOCK_FILE = 'screenshot-diffs-mock.json';

// Groups screenshot diffs
const groupByPath = (data) => {
    const unapproved = 0;
    const groups = data.reduce((g, d) => {
        g[d.path] = g[d.path] || [];
        g[d.path].push(d);
        if(!d.approved){
            unapproved++;
        }
        return g;
    }, {});

    return {
        files: Object.keys(groups).map(g => ({
            path: g,
            screenshots: groups[g]
        })),
        unapproved
    };
};

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {

    const getScreenshotDiffs =  async ({branchName}) => {
        if (workspaceConfig.enableMocks) {
            return config.getData(SCREENSHOT_DIFFS_MOCK_FILE).then(data => {
                vscode.window.showInformationMessage(`Returning screenshot diffs mock data for ${branchName}`)
                panel.webview.postMessage({messageId: 'set-screenshot-diffs', data: groupByPath(data)});
            });
        }
        // TODO : get pull request form integration helper
        return;
    };

    return {
        getScreenshotDiffs
    };
};
