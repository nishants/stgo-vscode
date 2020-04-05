// @ts-nocheck
import * as config from '../config'
import * as vscode from 'vscode'
import TFS from './tfs'
const PR_MOCK_FILE = 'pull-request-mock.json'

export default (panel: vscode.WebviewPanel, workspaceConfig: object) => {
    const getPullRequest = async ({ branchName }: object) => {
        if (workspaceConfig.enableMocks) {
            return config.getData(PR_MOCK_FILE).then((mockPullRequest) => {
                vscode.window.showInformationMessage(
                    `Returning mock data for ${branchName}`
                )
                panel.webview.postMessage({
                    messageId: 'set-pull-request',
                    data: mockPullRequest,
                })
            })
        }

        const tfsObj = new TFS(workspaceConfig.tfsToken)

        const prDetails = await tfsObj.getPullRequestData(branchName)

        panel.webview.postMessage({
            messageId: 'set-pull-request',
            data: prDetails,
        })
    }

    return {
        getPullRequest,
    }
}
