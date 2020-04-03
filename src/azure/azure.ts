import * as nodeApi from "azure-devops-node-api";
import * as BuildApi from "azure-devops-node-api/BuildApi";

import {
  AZURE_URL,
  AZURE_PROJECT,
  AZURE_INTEGRATION_BUILDID
} from "../constant";

export default class AZURE {
  azureConnectObj: BuildApi.IBuildApi | undefined;
  private token: string = "";

  constructor(token: string) {
    this.token = token;
  }

  async createConnection() {
    try {
      const authHandler = nodeApi.getPersonalAccessTokenHandler(this.token);
      const azureConnection = new nodeApi.WebApi(AZURE_URL, authHandler);
      this.azureConnectObj = await azureConnection.getBuildApi();
    } catch (error) {
      console.log("Error Orrcued in TF connection: ", error);
    }
  }

  async getBuildData(branchName: string) {
    if (this.azureConnectObj) {
      const buildData = await this.azureConnectObj.getBuilds(
        AZURE_PROJECT,
        [AZURE_INTEGRATION_BUILDID],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        47,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        `refs/heads/${branchName}`,
        undefined
      );

      return buildData;
    }
    return [];
  }

  private async triggerBuild(branchName: string) {
    if (this.azureConnectObj) {
      const body = {
        definition: {
          id: AZURE_INTEGRATION_BUILDID,
          sourceBranch: `refs/heads/${branchName}`
        }
      };
      const buildResp = await this.azureConnectObj.queueBuild(
        body,
        AZURE_PROJECT
      );

      return buildResp;
    }
    return {};
  }

  async getAllBuildData(branchName: string) {
    if (!branchName) {
      console.log("Brnach name is Must");
      return;
    }

    if (!this.azureConnectObj) {
      await this.createConnection();
    }
    const buildData = await this.getBuildData(branchName);

    if (buildData.length) {
      //  returning object for Esiting PR with details and edit link
      return {
        type: "COMPLETED",
        data: buildData
      };
    }

    return {
      type: "COMPLETED",
      data: []
    };
  }

  async getTriggerBuild(branchName: string) {
    if (!this.azureConnectObj) {
      await this.createConnection();
    }

    const buildResp = await this.triggerBuild(branchName);

    if (buildResp._links) {
      return {
        type: "NEW",
        WebUrl: buildResp._links.web.href,
        data: buildResp
      };
    }

    return {
      type: "NEW",
      status: 404
    };
  }
}
