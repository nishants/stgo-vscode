import * as vscode from "vscode";

jest.mock('vscode');
import chaloBeta from "./index";

// const ss = require("../../__mocks__/vscode");

describe('src/integration-helper', () => {
    test('should fetch screenshot diffs for branches', async () => {
        const panel = {};
        const workspaceConfig = {};

        // const diffs = await helper(null, null);
        console.log({vscode});
        // @ts-ignore
        chaloBeta(panel, workspaceConfig);
        expect(vscode.window.activeTextEditor).toEqual('dosa');
    });
});