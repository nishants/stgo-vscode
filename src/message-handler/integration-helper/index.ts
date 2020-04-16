// @ts-nocheck
import * as config from "../../config";
import * as vscode from "vscode";

const SCREENSHOT_DIFFS_MOCK_FILE = 'screenshot-diffs-mock.json';
const SCREENSHOT_API_URL = 'http://st-integration.sys.dom/publicApi/differences/<branch-name>';

const BRANCH_LIST__MOCK_FILE = 'branch-list-mock.json';
const BRANCH_LIST_API_URL = 'http://st-integration.sys.dom/publicApi/branches';

import {getJsonOverHttp} from "../../utils";

// Groups screenshot diffs
const groupByPath = (data) => {
    let unapproved = 0;
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

const setName = branches => branches.map(({branchName}) => ({name: branchName}));

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {

    const getScreenshotDiffs = async ({branchName}) => {
        if (workspaceConfig.enableMocks) {
            return config.getData(SCREENSHOT_DIFFS_MOCK_FILE).then(data => {
                vscode.window.showInformationMessage(`Returning screenshot diffs mock data for ${branchName}`)
                panel.webview.postMessage({messageId: 'set-screenshot-diffs', data: groupByPath(data)});
            });
        }
        const branchURL = SCREENSHOT_API_URL.replace('<branch-name>', branchName);
        try{
            const response =  await getJsonOverHttp({url: branchURL});
            panel.webview.postMessage({messageId: 'set-screenshot-diffs', data: groupByPath(response)});
        }catch(error){
            console.error(error);
            vscode.window.showErrorMessage(`Error fetching screenshot diffs from integration helper - ${branchURL}`);
            panel.webview.postMessage({messageId: 'set-screenshot-diffs', data: {files: [], unapproved: 0}});
        }
    };

    const getAllBranches = async () => {
        if (workspaceConfig.enableMocks) {
            return config.getData(BRANCH_LIST__MOCK_FILE).then(data => {
                vscode.window.showInformationMessage(`Returning mock data for list of branches`)
                panel.webview.postMessage({messageId: 'set-branch-list', data: setName(data)});
            });
        }
        const url = BRANCH_LIST_API_URL;
        try{
            const response =  await getJsonOverHttp({url});
            panel.webview.postMessage({messageId: 'set-branch-list', data: setName(response)});
        }catch(error){
            console.error(error);
            vscode.window.showErrorMessage(`Error fetching screenshot diffs from integration helper - ${url}`);
            panel.webview.postMessage({messageId: 'set-branch-list', data: []});
        }
    };

    return {
        getScreenshotDiffs,
        getAllBranches
    };
};
