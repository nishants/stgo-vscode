

export default {
    message: 'Welcome to react in webview.',
    selectedCommit: null,
    currentBranchName: 'branch-current',
    branches: ['branch-one', 'branch-two', 'branch-three'],
    commits: [
        {
            timeStamp: '12: 45 PM - 01 October',
            hash: '81fa3e',
            link: 'https://nishants.site',
            fullHash: '81fa3e2654da786c07b3218bb840abbee55fe165',
            message: 'A pull requet to remove all files from the backend and add to frontent. This requiires the files to be moved from path….\n' +
                '- file-one.js\n' +
                '- file-two-js\n' +
                '\n' +
                'And some other changes that are hard to explaing so i will let the code do the talkding.'

        },
        {
            timeStamp: '12: 45 PM - 02 October',
            link: 'https://nishants.site',
            hash: '81fa3e',
            fullHash: '81fa3e2654da786c07b3218bb840abbee55fe165',
            message: 'third commit'

        },
        {
            timeStamp: '12: 45 PM - 03 October',
            link: 'https://nishants.site',
            hash: '81fa3e',
            fullHash: '81fa3e2654da786c07b3218bb840abbee55fe165',
            message: 'second commit'
        },
        {
            timeStamp: '12: 45 PM - 04 October',
            link: 'https://nishants.site',
            hash: '81fa3e',
            fullHash: '81fa3e2654da786c07b3218bb840abbee55fe165',
            message: 'first commit'
        }
    ],
    commitLogs: [
        {
            id: 'branch-policy',
            label: 'Branch Policy Succeeded',
            status: 'success',
            link: 'https://google.com',
            action: {id: 'run-branch-policy', label: 'Rerun branch policy'}
        },
        {id: 'update-hook', label: 'Update Hook Succeeded', status: 'success', link: 'https://google.com'},
        {
            id: 'cypress-ci',
            label: 'Integration Tests Failed',
            status: 'failed',
            link: 'https://google.com',
            action: {id: 'run-integration-tests', label: 'Retry integration tests'}
        },
    ]
};