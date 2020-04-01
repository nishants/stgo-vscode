import BranchLogs from './branch-log';

const logTypes = {
    "PULL REQUEST HANDLER - CREATED --> Created db entry from existing pull request.": (log: object) => {
        return {
            type: 'update-hook',
            commit: {
                fullHash: '43ec5cb503fbd596d9103548d95678969827c77d',
                message: 'Merge pull request 61016 from test-1170325-pause-date into master',
            },
            log
        };
    }
};

const matchesLogType = (typeRegex: string, log: object) => {
    // @ts-ignore
    const logId = `${log.context} --> ${log.message}`;
    return new RegExp(typeRegex).test(logId);
};

export default {
    parse: (logs: Array<object>) => {
        const branchLogs = BranchLogs();

        logs.forEach(log => {
            const type = Object.keys(logTypes).filter(key => matchesLogType(key, log));
            if (type.length > 1) {
                console.error(`Mutliple matches found for log`, {log, logTypes: type})
            }
            if (type.length > 0) {
                // @ts-ignore
                const parsed = logTypes[type[0]](log);
                if (parsed.commit) {
                    branchLogs.addCommit(parsed.commit);
                }
            }
        });

        return branchLogs;
    }
};