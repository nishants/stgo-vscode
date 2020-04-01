// @ts-nocheck

const tfs = require('azure-devops-node-api');
// @ts-ignore
const {project, azureDevopsToken, integrationTestsBuildId} = {
        "azureDevopsUrl": "https://dev.azure.com/saxobank",
        "azureDevopsToken": "hgnnecwmo34vdrg4biuvsabgvusbm5s5jayola5hn35tucrdetuq",
        "project": "Platforms",
        "integrationTestsBuildId": 22,
        "azureSyncInterval": 2000,
        "azureSyncTimeout": 30000
    }
;

const azureAuthHandler = tfs.getPersonalAccessTokenHandler('hgnnecwmo34vdrg4biuvsabgvusbm5s5jayola5hn35tucrdetuq');
const azureConnection = new tfs.WebApi('https://dev.azure.com/saxobank', azureAuthHandler);
// @ts-ignore
const getBuild = async (sourceBranch, buildFinder, searchDescription, buildResult, status = 'completed') => {
    const buildApi = await azureConnection.getBuildApi();
    const buildsForBranch = await buildApi.getBuilds(project, [integrationTestsBuildId]
        , undefined
        , undefined
        , undefined
        , undefined
        , undefined
        , undefined
        , status
        , buildResult
        , undefined
        , undefined
        , undefined
        , undefined
        , undefined
        , undefined
        , undefined
        , sourceBranch
        , undefined
    );
    // @ts-ignore
    const unique = (a) => {
        return Array.from(new Set(a));
    };
    return buildFinder(buildsForBranch);
};

export const getBuildInfo = () => {
    const commitId = 'fdf52551f611d5bf1b76faf5c48afaca86341b6e';
    const branchName = 'refs/heads/ci-1170325-margin-monitor';

    // @ts-ignore
    const filterByCommitId = (buildArray) => {
        // @ts-ignore
        const buildsForCommit = buildArray
            .filter((b) => b.sourceVersion === commitId);
        return buildsForCommit[0];
    };

    // @ts-ignore
    const buildInfo = getBuild(
        branchName,
        filterByCommitId,
        `searching for commit: ${commitId}`,
        // BuildResult.Succeeded | BuildResult.PartiallySucceeded| BuildResult.Failed | BuildResult.Canceled
    );

    console.log('buildinf: ', buildInfo);
    return buildInfo;
};

/*** TFS API **/
const { tfsToken, tfsUrl, repository: tfsReposiory, project:tfsProject } = {
    "repository": "SaxoTrader",
    "project": "SaxoTrader",

    "tfsUrl": "http://tfs.sys.dom:8080/tfs/DefaultCollection",
    "tfsToken": "2jeuwk35cpb7hj63qkj2xt3ikgs6zhrrmngzxpbmvz5uhf2sjnjq"
};

const tfsAuthHandler = tfs.getPersonalAccessTokenHandler(tfsToken);
const tfsConnection = new tfs.WebApi(tfsUrl, tfsAuthHandler);
export const getPullRequest = async () => {
    const gitApi = await tfsConnection.getGitApi();
    return gitApi.getPullRequests(tfsReposiory, {"sourceRefName": "refs/heads/ci-1170325-margin-monitor"}, tfsProject, 10, 0, 10);
};
