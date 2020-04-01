import parser from './index';

import {
    PULL_REQUEST_CREATED,
    PULL_REQUEST_UPDATED
} from './branch-log-test-helper';

describe('log-parser', () => {
    describe('should find all commits', () => {
        it('should not find commit in pull request created', () => {
            const logs = [PULL_REQUEST_CREATED];
            const branchLogs = parser.parse(logs);
            const commits = branchLogs.getCommits();
            expect(commits).toEqual([]);
        });

        it('should detect commit in pull request updated log', () => {
            const logs = [PULL_REQUEST_UPDATED];
            const branchLogs = parser.parse(logs);
            const commits = branchLogs.getCommits();
            const commit = [{
                "fullHash": "43ec5cb503fbd596d9103548d95678969827c77d",
                "message": "Merge pull request 61016 from test-1170325-pause-date into master"
            }];

            expect(commits).toEqual(commit);
        });

    });
});