import { TFS_PROJECT, TFS_REPO, TFS_URL } from "../constant";
const tfs = require("azure-devops-node-api");

let tfsConnection: any;

const createConnection = (tfsToken: string) => {
  const tfsAuthHandler = tfs.getPersonalAccessTokenHandler(tfsToken);
  tfsConnection = new tfs.WebApi(TFS_URL, tfsAuthHandler);
  return tfsConnection;
};

export const getPullRequest = async (branchName: string, tfsToken: string) => {
  const gitApi = await (
    tfsConnection || createConnection(tfsToken)
  ).getGitApi();

  return gitApi.getPullRequests(
    TFS_REPO,
    { sourceRefName: `refs/heads/${branchName}` },
    TFS_PROJECT,
    10,
    0,
    10
  );
};
