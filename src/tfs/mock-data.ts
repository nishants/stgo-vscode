import * as config from "../config";

const PR_MOCK_FILE = "pull-request-mock.json";

export const getMockPullRequest = async (branchName: string) =>
  config.getData(PR_MOCK_FILE);
