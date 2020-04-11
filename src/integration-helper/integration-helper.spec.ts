jest.mock('vscode');
jest.mock('../utils');

import * as vscode from "vscode";
import * as utils from "../utils";
import panel from "../__mocks__/fakePanel";

import handler from "./index";

describe('src/integration-helper', () => {
    test('should fetch screenshot diffs for branches', async () => {
        const workspaceConfig = {};
        // @ts-ignore
        utils.getJsonOverHttp = () => new Promise((resolve) => {
            resolve([{branchName: 'dabba'}])
        })

        console.log({vscode});

        await handler(panel, workspaceConfig).getAllBranches();
        // @ts-ignore
        expect(panel.webview.postMessage.mock.calls).toEqual([[
            {"data": [{"name": "dabba"}], "messageId": "set-branch-list"}
        ]]);

    });
});