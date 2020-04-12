export const TFS_REPO = 'SaxoTrader';
export const TFS_PROJECT = 'SaxoTrader';
export const TFS_URL = "http://tfs.sys.dom:8080/tfs/DefaultCollection";

export const TFS_REPO_ID =
  "de3a9280-eeb1-4d1f-b391-956cb5eee690";

export const AZURE_URL = "https://dev.azure.com/saxobank";
export const AZURE_PROJECT = "Platforms";
export const AZURE_INTEGRATION_BUILDID = 22;

export const CREATE_PR_URL = `http://tfs:8080/tfs/DefaultCollection/_git/SaxoTrader/pullrequestcreate?sourceRef=<source-branch-name>&targetRef=master&sourceRepositoryId=${TFS_REPO_ID}&targetRepositoryId=${TFS_REPO_ID}`;
export const getCreatePullRequestUrl = (branchName: string) => CREATE_PR_URL.replace('<source-branch-name>', encodeURIComponent(branchName));

const OPEN_PR_URL = `http://tfs:8080/tfs/DefaultCollection/_git/SaxoTrader/pullrequest/<pull-request-id>`;
export const getPullRequestUrl = (pullRequestId: string) => OPEN_PR_URL.replace('<pull-request-id>', pullRequestId);