// @ts-nocheck
import * as config from "../config";
import * as vscode from "vscode";
import {SaxoTrader_Project_TFS_REPO_ID, TFS_PROJECT, TFS_REPO, TFS_URL} from "../constant";
const tfs = require('azure-devops-node-api');

const PR_MOCK_FILE = "pull-request-mock.json";

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {
    let tfsConnection;

    const initializeTFSConnection = () => {
        const tfsAuthHandler = tfs.getPersonalAccessTokenHandler(workspaceConfig.tfsToken);
        tfsConnection = new tfs.WebApi(TFS_URL, tfsAuthHandler);
    };

    const getPullRequestFromTFS = async (branchName) => {
        if(!tfsConnection){
            initializeTFSConnection();
        }

        const gitApi = await tfsConnection.getGitApi();
        return gitApi.getPullRequests(
            TFS_REPO,
            {"sourceRefName": `refs/heads/${branchName}`},
            TFS_PROJECT,
            10,
            0,
            10);
    };

    const getPullRequest = async ({branchName}: object) => {
        if (workspaceConfig.enableMocks) {
            return config.getData(PR_MOCK_FILE).then(mockPullRequest => {
                vscode.window.showInformationMessage(
                    `Returning mock data for ${branchName}`
                );
                panel.webview.postMessage({
                    messageId: "set-pull-request",
                    data: mockPullRequest
                });
            });
        }

        const prDetails = await getPullRequestFromTFS(branchName);

        panel.webview.postMessage({
            messageId: "set-pull-request",
            data: {
                pullRequest: prDetails[0],
                createPullRequestUrl: `http://tfs:8080/tfs/DefaultCollection/_git/SaxoTrader/pullrequestcreate?sourceRef=<source-branch-name>&targetRef=master&sourceRepositoryId=${SaxoTrader_Project_TFS_REPO_ID}&targetRepositoryId=${SaxoTrader_Project_TFS_REPO_ID}`
            }
        });
    };

    return {
        getPullRequest
    };
};
