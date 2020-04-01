import * as lib from './lib';

lib.getBuildInfo().then(buildInfo => {
    const message =`Build info : ${buildInfo._links.web.href}`;
    console.log(message);
});

// @ts-ignore
lib.getPullRequest().then(pullRequest => {
    const message =`pullrequest description : ${pullRequest[0].title}`;
    console.log(message);
});
