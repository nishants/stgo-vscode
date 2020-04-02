import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
const CONFIG_DIR_NAME = ".stgo-vscode";
const CONFIG_FILE_NAME = "config.json";

const getWorkspacePathForFile =  (fileName : string) => {
    // @ts-ignore
    const workspaceFolder = [...vscode.workspace.workspaceFolders].pop();
    if(!workspaceFolder){
        return Promise.reject("Workspace not found.")
    }
    // @ts-ignore
    return path.join(workspaceFolder.uri.fsPath, CONFIG_DIR_NAME, fileName);
};

export const getConfig =  async () => {
    const configPath = await getWorkspacePathForFile(CONFIG_FILE_NAME);
    try{
        const configJson = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(configJson);
    }catch(error){
        return Promise.reject(`Failed to read configuration file : ${configPath} ${error.getMessage()}`, )
    }
};

