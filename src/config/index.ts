import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
const CONFIG_DIR_NAME = ".stgo-vscode";
const CONFIG_FILE_NAME = "config.json";

const getWorkspaceConfigFile = (fileName: string) => {
  try {
    // @ts-ignore
    const workspaceFolder = [...vscode.workspace.workspaceFolders].pop();
    if (!workspaceFolder) {
      return Promise.reject("Workspace not found.");
    }
    // @ts-ignore
    const configPath = path.join(
      workspaceFolder.uri.fsPath,
      CONFIG_DIR_NAME,
      fileName
    );

    const configJson = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(configJson);
  } catch (error) {
    const message = "Failed to read configuration file";
    vscode.window.showErrorMessage(message);
    return {};
  }
};

export const getData = async (file: string) => {
  return getWorkspaceConfigFile(file);
};

export const getConfig = async () => {
  const config = await getWorkspaceConfigFile(CONFIG_FILE_NAME);
  if (config.enableMocks) {
    vscode.window.showWarningMessage("Running stgoci against mocks.");
  }

  return config;
};
