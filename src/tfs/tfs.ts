import * as nodeApi from "azure-devops-node-api";
import * as GitApi from "azure-devops-node-api/GitApi";

import { TFS_URL, SaxoTrader_Project_TFS_REPO_ID } from "../constant";

export default class TFS {
  tfsConnectObj: GitApi.IGitApi | undefined;
  private token: string = "";

  constructor(token: string) {
    this.token = token;
  }

  async createConnection() {
    try {
      const authHandler = nodeApi.getPersonalAccessTokenHandler(this.token);
      const tfsConnection = new nodeApi.WebApi(TFS_URL, authHandler);
      this.tfsConnectObj = await tfsConnection.getGitApi();
    } catch (error) {
      console.log("Error Orrcued in TF connection: ", error);
    }
  }

  async getPr(branchName: string) {
    if (this.tfsConnectObj) {
      const prDetails = await this.tfsConnectObj.getPullRequests(
        SaxoTrader_Project_TFS_REPO_ID,
        {
          sourceRefName: `refs/heads/${branchName}`
        }
      );

      return prDetails;
    }
    return [];
  }

  async getPullRequestData(branchName: string) {
    if (!branchName) {
      console.log("Brnach name is Must");
      return;
    }

    if (!this.tfsConnectObj) {
      await this.createConnection();
    }
    const prDetails = await this.getPr(branchName);

    if (prDetails.length) {
      //  returning object for Esiting PR with details and edit link
      return {
        type: "EXISTING",
        data: prDetails[0],
        link: `${TFS_URL}/_git/SaxoTrader/pullrequest/${prDetails[0]?.pullRequestId}?_a=overview`
      };
    }

    //  returning object for New PR with create link
    return {
      type: "NEW",
      links: `${TFS_URL}/_git/SaxoTrader/pullrequestcreate?sourceRef=${branchName}&targetRef=master&sourceRepositoryId=${SaxoTrader_Project_TFS_REPO_ID}&targetRepositoryId=${SaxoTrader_Project_TFS_REPO_ID}`
    };
  }
}
