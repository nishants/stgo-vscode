jest.mock('vscode');

import * as vscode from "vscode";

import panel from "../__mocks__/fakePanel";
import "../__mocks__/helper";
import handler from "./index";

describe('src/integration-helper', () => {
    beforeEach( () => jest.resetAllMocks());

    test('should fetch screenshot diffs for branches', async () => {
        const workspaceConfig = {};
        await handler(panel, workspaceConfig).getAllBranches();

        // @ts-ignore
        expect(panel.webview.postMessage.mock.calls).toEqual([[
            {"data": [{"name": "dabba"}], "messageId": "set-branch-list"}
        ]]);
    });

    test('should return mock with', async () => {
        const workspaceConfig = { enableMocks: true};

        await handler(panel, workspaceConfig).getAllBranches();

        // @ts-ignore
        expect(panel.webview.postMessage.mock.calls).toEqual([[
            {"data": [{"name": "dabba"}], "messageId": "set-branch-list"}
        ]]);
    });
});