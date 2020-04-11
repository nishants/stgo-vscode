jest.mock('vscode');
jest.mock('../utils');
jest.mock('../config');

import * as vscode from "vscode";
import * as utils from "../utils";
import * as config from "../config";

import panel from "../__mocks__/fakePanel";

import handler from "./index";

describe('src/integration-helper', () => {
    beforeEach( () => jest.resetAllMocks());

    test('should fetch screenshot diffs for branches', async () => {
        const workspaceConfig = {};
        // @ts-ignore
        utils.getJsonOverHttp = () => new Promise((resolve) => {
            resolve([{branchName: 'dabba'}])
        });

        console.log({vscode});

        await handler(panel, workspaceConfig).getAllBranches();

        // @ts-ignore
        expect(panel.webview.postMessage.mock.calls).toEqual([[
            {"data": [{"name": "dabba"}], "messageId": "set-branch-list"}
        ]]);
    });

    test('should return mock with', async () => {
        const workspaceConfig = { enableMocks: true};

        // @ts-ignore
        utils.getJsonOverHttp = () => new Promise((resolve) => {
            resolve([{branchName: 'dabba'}])
        });

        // @ts-ignore
        config.getData = (file) => ({'branch-list-mock.json': new Promise((resolve) => {
                resolve([{branchName: 'dabba'}])
            })}[file]) ;

        console.log({vscode});

        await handler(panel, workspaceConfig).getAllBranches();

        // @ts-ignore
        expect(panel.webview.postMessage.mock.calls).toEqual([[
            {"data": [{"name": "dabba"}], "messageId": "set-branch-list"}
        ]]);
    });
});