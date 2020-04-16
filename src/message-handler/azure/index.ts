// @ts-nocheck
import * as vscode from "vscode";
import * as config from "../../config";
import AZURE from "./azure";
const CPYRESS_BUILDS_MOCK_DATA = "cypress-mock-data.json";

const setBuildTime = data => data.map(build => ({
        ...build,
        buildTime : new Date(build.queueTime).toString().split("GMT")[0]
    }
));

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {
  const getCypressBuilds = async ({ branchName }: object) => {
    if (workspaceConfig.enableMocks) {
      return config.getData(CPYRESS_BUILDS_MOCK_DATA).then(mockData => {
        vscode.window.showInformationMessage(
          `Returning mock data for cyrpess build ${branchName}`
        );
        panel.webview.postMessage({
          messageId: "set-cypress-builds",
          data: {
            type: "COMPLETED",
            data: setBuildTime(mockData)
          }
        });
      });
    }
    const azureObj = new AZURE(workspaceConfig.azureToken);

    const buildData = await azureObj.getAllBuildData(branchName);

    panel.webview.postMessage({
      messageId: "set-cypress-builds",
      data: setBuildTime(buildData)
    });

    return;
  };

  const triggerCypressBuild = async ({ branchName }: object) => {
    const azureObj = new AZURE(workspaceConfig.azureToken);

    const triggerBuildObj = await azureObj.getTriggerBuild(branchName);

    vscode.env.openExternal(triggerBuildObj.WebUrl);
    await getCypressBuilds({ branchName });
  };

  return {
    getCypressBuilds,
    triggerCypressBuild
  };
};
