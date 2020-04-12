/*
AZURE API CONSTANT :

BuildStatus (pr.status) :
    None = 0,
    InProgress = 1,
    Completed = 2,
    Cancelling = 4,
    Postponed = 8,
    NotStarted = 32,
    All = 47,

BuildResult (pr.result)
    None = 0,
    Succeeded = 2,
    PartiallySucceeded = 4,
    Failed = 8,
    Canceled = 32,
 */

const BUILD_STATUS_IN_PROGRESS = 1;

export const isBuildInProgress = build => build.status  === BUILD_STATUS_IN_PROGRESS;