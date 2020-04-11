jest.mock("vscode");

import * as vscode from "vscode";

import panel from "../__mocks__/fakePanel";
import { setJsonOverHttp, setMockFile, resetMocks } from "../__mocks__/helper";

import handler from "./index";

describe("src/integration-helper", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    resetMocks();
  });

  test("should fetch screenshot diffs for branches", async () => {
    const workspaceConfig = {};
    setJsonOverHttp("http://st-integration.sys.dom/publicApi/branches", [
      { branchName: "dabba" },
    ]);

    await handler(panel, workspaceConfig).getAllBranches();

    // @ts-ignore
    expect(panel.webview.postMessage.mock.calls).toEqual([
      [{ data: [{ name: "dabba" }], messageId: "set-branch-list" }],
    ]);
  });

  test("should return mock with", async () => {
    const workspaceConfig = { enableMocks: true };

    setMockFile("branch-list-mock.json", [{ branchName: "dabba" }]);

    await handler(panel, workspaceConfig).getAllBranches();

    // @ts-ignore
    expect(panel.webview.postMessage.mock.calls).toEqual([
      [{ data: [{ name: "dabba" }], messageId: "set-branch-list" }],
    ]);
  });
});
