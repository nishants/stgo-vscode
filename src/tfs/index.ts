// @ts-nocheck
import * as config from "../config";
import * as vscode from "vscode";
import { TFS_PROJECT, TFS_REPO, TFS_URL, getCreatePullRequestUrl} from "../constant";
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
                    data:{
                        pullRequest: mockPullRequest,
                        createPullRequestUrl: getCreatePullRequestUrl(branchName)
                    }
                });
            });
        }

        const prDetails = await getPullRequestFromTFS(branchName);

        panel.webview.postMessage({
            messageId: "set-pull-request",
            data: {
                pullRequest: prDetails[0],
                createPullRequestUrl: getCreatePullRequestUrl(branchName)
            }
        });
    };

    return {
        getPullRequest
    };
};
