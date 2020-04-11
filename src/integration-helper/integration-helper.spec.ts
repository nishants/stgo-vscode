import * as vscode from "vscode";

jest.mock('vscode');
jest.mock('../utils');

import * as utils from "../utils";

import handler from "./index";

describe('src/integration-helper', () => {
    test('should fetch screenshot diffs for branches', async () => {
        const panel = {
            webview: {postMessage: jest.fn()}
        };
        const workspaceConfig = {};
        // @ts-ignore
        utils.getJsonOverHttp = () => new Promise((resolve) => {
            resolve([{branchName: 'dabba'}])
        })

        // const diffs = await helper(null, null);
        console.log({vscode});
        // @ts-ignore
        await handler(panel, workspaceConfig).getAllBranches();
        expect(panel.webview.postMessage.mock.calls).toEqual([[
            {"data": [{"name": "dabba"}], "messageId": "set-branch-list"}
        ]]);

    });
});